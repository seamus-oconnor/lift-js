#!/usr/bin/env python2

import os
import sys
import unittest
from StringIO import StringIO

# add ../ to sys.path to find the py module
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from build import Version as V, buildBundles, buildFeatureTree


class TestFeatureArgParsing(unittest.TestCase):
  def testSimple(self):
    features = buildFeatureTree(["a:b", "b:a"])
    self.assertEqual(features, {"a": {"b": True}, "b": {"a": True}})
    features = buildFeatureTree(["a:b", "b:a", "a:b", "b:a"])
    self.assertEqual(features, {"a": {"b": True}, "b": {"a": True}})
    features = buildFeatureTree(["a:b", "a:c"])
    self.assertEqual(features, {"a": {"b": True, "c": True}})

  def testWild(self):
    features = buildFeatureTree(["a:b", "a:*"])
    self.assertEqual(features, {"a": "*"})
    features = buildFeatureTree(["a:b", "a:*", "a:c"])
    self.assertEqual(features, {"a": "*"})
    features = buildFeatureTree(["*"]) # just a "*" means all supported features
    self.assertEqual(features, {})
    features = buildFeatureTree(["*", "a"]) # just a "*" means all supported features
    self.assertEqual(features, {})


class TestBrowserFile(unittest.TestCase):
  def testOk(self):
    f = StringIO("*  es5:date:now")
    bundle = buildBundles(f, { "es5": "*" })
    self.assertEqual(bundle, { V("*"): ["es5:date:now"] })

  def testComment(self):
    f = StringIO("# IGNORE ME\n*  es5:date:now")
    bundle = buildBundles(f, { "es5": "*" })
    self.assertEqual(bundle, { V("*"): ["es5:date:now"] })

  def testSpace(self):
    f = StringIO("       # IGNORE ME\n\n    \n\n   *    \t\t  es5:date:now\n\n\n")
    bundle = buildBundles(f, { "es5": "*" })
    self.assertEqual(bundle, { V("*"): ["es5:date:now"] })

  def testInvalid(self):
    f = StringIO("Testing")
    self.assertRaises(IOError, buildBundles, f, { "es5": "*" })

  def testVersions(self):
    f = StringIO("* foo\n9 bar\n8 baz\n* blork")
    bundle = buildBundles(f, { "*": "foo" })
    self.assertEqual(bundle, { V("*"): ["foo", "blork"] })


class TestVersions(unittest.TestCase):
  def testEq(self):
    self.assertEqual(V("2.0"), V("2.0"))
    self.assertEqual(V("*"), V("*"))
    self.assertEqual(V("*"), "*")
    self.assertEqual(V("  2.0  "), "2.0")
    self.assertEqual(V("  2.0  "), "  2.0   ")

  def testGt(self):
    self.assertGreater(V("2.1"), V("2.0"))
    self.assertGreater(V("10.0"), V("2.0"))
    self.assertGreaterEqual(V("2.0"), V("2.0"))

  def testLt(self):
    self.assertLess(V("2.0"), V("2.1"))
    self.assertLess(V("1.0"), V("2.0"))
    self.assertLessEqual(V("2.0"), V("2.0"))

  def testEveryGt(self):
    self.assertGreater(V("*"), V("2.0"))
    self.assertGreater(V("*"), V("20.0"))
    self.assertGreater(V("*"), V("200.0"))

  def testEveryLess(self):
    self.assertLess(V("2.0"), V("*"))
    self.assertLess(V("20.0"), V("*"))
    self.assertLess(V("200.0"), V("*"))

  def testSort(self):
    versions = [
      V("*"),
      V("9.0"),
      V("2.1"),
    ]
    versions.sort()
    self.assertEqual(versions, [
      V("2.1"),
      V("9.0"),
      V("*"),
    ])

  def testSet(self):
    versions = [
      V("9.0"),
      V("*"),
      V("9.0"),
      V("*"),
      V("2.1"),
      V("*"),
      V("2.1"),
    ]
    versions = set(versions)
    self.assertEqual(versions, set([
      V("9.0"),
      V("*"),
      V("2.1"),
    ]))


if __name__ == "__main__":
  unittest.main()
