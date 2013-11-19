#!/usr/bin/env python2

import os
import sys
import getopt
import shutil
import re
import logging

from collections import OrderedDict

try:
  import json
except ImportError:
  try:
    import simplejson as json
  except:
    print "No JSON module found. Install simplejson: `pip install simplejson==2.1.0`"
    sys.exit(1)


logger = logging.getLogger(__name__)
logger.addHandler(logging.StreamHandler(sys.stdout))
logger.setLevel(logging.INFO)


infinity = float('inf')
DEFINE_RE = re.compile(r"\s*define\s*\((.+)")


def main():
  # TODO: Add flag for what browsers to build bundles for -b [-/+]ie -b [-/+]ff
  # TODO: Add minimum supported browser versions flag? -m ie:9 -m ff:3.6
  try:
    opts, args = getopt.getopt(sys.argv[1:], "hvo:", ["help", "verbose", "builddir="])
  except getopt.GetoptError, e:
    # print help information and exit:
    if e.opt:
      logger.info("Unknown parameter: -%s", e.opt)
    usage()
    return 2

  if not args:
    logger.error("Feature list required. Example: `build.py es5:date:now es6:*`")
    usage()
    return 2

  builddir = None

  for o, a in opts:
    if o in ("-v", "--verbose"):
      logger.setLevel(logging.DEBUG)
    elif o in ("-h", "--help"):
      usage()
      return 2
    elif o in ("-o", "--builddir"):
      builddir = os.path.abspath(a)
      if not os.path.exists(builddir):
        logger.error("Invalid build directory: %s", builddir)
        return 1

  os.chdir(os.path.dirname(__file__))

  if builddir is None:
    builddir = os.path.abspath("build")

  shutil.rmtree(builddir)
  os.mkdir(builddir)

  bundles = {}

  srcdir = os.path.abspath("src")
  browsersdir = os.path.join(srcdir, "browsers")

  reqs = buildFeatureTree(args)

  if reqs:
    logger.debug("Selected features:\n%s", prettykeys(reqs, 1))

  for filename in os.listdir(browsersdir):
    (browser, ext) = os.path.splitext(filename)
    fp = open(os.path.join(browsersdir, filename), "r");
    try:
      bundles[browser] = buildBundles(fp, reqs)
    finally:
      fp.close()

  bundledir = os.path.join(builddir, "bundles")
  os.mkdir(bundledir)

  # Create browser bundles of AMD modules
  logger.debug("\nSupported In Version\t\tFeature\n%s", "-" * 39)
  for browser in bundles:
    bundle = bundles[browser]

    if bundle:
      logger.debug("%s:", browser.upper())

    prev_version = ""
    for v in bundle:
      still_unsupported = v.all
      version = str(v)

      logger.debug("  %s", "*" if still_unsupported else version)

      filename = browser + (prev_version + "+" if still_unsupported else prev_version + "-" + version) + ".js"
      bundlefp = open(os.path.join(bundledir, filename), "w")

      try:
        sourcefp = None
        for module in bundle[v]:
          path = module.split(":")

          logger.debug("%s%s", "\t" * 4, module)

          moduleid = "/".join(path)
          path[-1] += ".js"
          sourcefp = open(os.path.join(srcdir, "modules", *path), "r")
          for line in sourcefp:
            matches = DEFINE_RE.match(line)
            if matches:
              line = "define('liftjs/modules/%s', [], %s\n" % (moduleid, matches.group(1))
            bundlefp.write(line)
          bundlefp.write("\n")
      finally:
        if sourcefp:
          sourcefp.close()
        bundlefp.close()

      prev_version = version

  logger.debug("\n")

  copyAllAMDModules(srcdir, builddir)

  # Parse lift.js and output reqs and browser_ranges as JSON.
  infp = open(os.path.join(srcdir, "lift.js"), "r")
  outfp = open(os.path.join(builddir, "lift.js"), "w")

  browser_ranges = OrderedDict((browser, [str(v) for v in bundles[browser]]) for browser in bundles)
  customizeLiftJS(reqs, browser_ranges, infp, outfp)

  logger.info("-- Build Complete --")

  return 0


def usage():
  logger.info("usage: python build.py -h -v -o [build dir] feature feature ...")


def buildFeatureTree(args):
  reqs = {}

  for arg in args:
    if arg == "*": return {}

    tree = branch = reqs
    parts = arg.strip().split(":")
    for i, part in enumerate(parts):
      val = {} if i < len(parts) - 1 else True
      if i > 0 and part == "*":
        branch[parts[i - 1]] = "*"
        break
      else:
        if part in tree and tree[part] == "*":
          break
        branch = tree
        tree = tree.setdefault(part, val)
  return reqs


def buildBundles(fp, reqs):
  # logger.debug("buildBundles()")
  features = []
  versions = []

  for i, line in enumerate(fp, 1):
    line = line.strip()

    if not line: continue
    if line.startswith("#"): continue

    try:
      (version, feature) = line.split()
    except ValueError:
      raise IOError("Syntax error: '%s' on line: %d" % (line, i))
    feature = feature.strip()
    version = Version(version)

    # logger.debug("version %s - %s", version, feature)
    if isFeatureInReq(feature, reqs):
      # logger.debug(version)
      versions.append(version)
      features.append((version, feature))

  versions = list(set(versions))
  versions.sort()
  # logger.debug("Versions: %s", versions)

  bundles = OrderedDict()
  for ver in versions:
    bundles[ver] = bundle = []

    for fver, feature in features:
      # logger.debug("%s -- %s >= %s is %s", feature, repr(fver), repr(ver), fver >= ver)
      if fver >= ver:
        bundle.append(feature)

  return bundles


def customizeLiftJS(reqs, browser_ranges, infp, outfp):
  try:
    for line in infp:
      if line.strip() == "// -- BUILD REQUIREMENTS --":
        pad = " " * (len(line) - len(line.lstrip()))
        outfp.write(pad + "reqs = ")
        json.dump(reqs, outfp)
        outfp.write("\n" + pad + "bundle_versions = ")
        json.dump(browser_ranges, outfp)
        outfp.write("\n")
      else:
        outfp.write(line)
  finally:
    infp.close()
    outfp.close()


def copyAllAMDModules(srcdir, destdir):
  dirs = ["es5", "es6", "dom"]

  for name in dirs:
    path = os.path.join(srcdir, "modules", name)
    for root, subdirs, files in os.walk(path):
      nest = os.path.relpath(root, path)
      # logger.debug(nest)
      outputpath = os.path.join(destdir, "modules", name, nest)

      for file in files:
        if file.endswith(".js"):
          makedirs(outputpath)
          shutil.copyfile(os.path.join(root, file), os.path.join(outputpath, file))

  files = ["console.js"]
  for name in files:
    outputpath = os.path.join(srcdir, "modules")
    makedirs(outputpath)
    shutil.copyfile(os.path.join(outputpath, name), os.path.join(destdir, "modules", name))


def makedirs(path):
  try:
    os.makedirs(path)
  except OSError as exc:
    if exc.errno != 17 or not os.path.isdir(path):
      raise


def isFeatureInReq(feature, reqs):
  if reqs == {}:
    return True
  feature_parts = feature.strip().split(":")
  tree = reqs
  # logger.debug(feature_parts)
  for part in feature_parts:
    # logger.debug("part %s. part in tree? %s", part, part in tree)
    if part in tree:
      tree = tree[part]
      if tree in (True, "*"):
        return True
  return False


class Version(object):
  def __init__(self, ver):
    if ver == "*" or ver == infinity:
      self.all = True
      self.major = infinity
      self.minor = infinity
    else:
      self.all = False

      if "." in ver:
        self.major, self.minor = ver.split(".")
        self.major = int(self.major)
        self.minor = int(self.minor)
      else:
        self.major = int(ver)
        self.minor = 0

  def __cmp__(self, other):
    # logger.debug('__cmp__(%s, %s)', self, other)
    if isinstance(other, self.__class__):
      pass
    elif isinstance(other, basestring):
      other = Version(other)
    else:
      raise Exception("Versions can only be compared to other Version objects")

    if self.all == True and other.all == True: # * == *
      return 0
    elif self.major == other.major and self.minor == other.minor: # 1.0 == 1.0
      return 0
    elif self.all: # * > 1.0
      return 1
    elif self.major > other.major: # 2.0 > 1.0
      return 1
    elif self.major == other.major and self.minor > other.minor: # 2.1 > 2.0
      return 1
    return -1

  def __hash__(self):
    return hash((self.all, self.major, self.minor))

  def __str__(self):
    return "*" if self.all else "%s.%s" % (self.major, self.minor)

  def __repr__(self):
    return "Version('%s')" % str(self)


def prettykeys(d, indent=0):
  output = []
  for key, value in d.iteritems():
    output.append('  ' * indent + str(key) + (":*" if value == "*" else ""))
    if isinstance(value, dict):
      output.append(prettykeys(value, indent+1))
  return "\n".join(output)


if __name__ == "__main__":
  sys.exit(main())
