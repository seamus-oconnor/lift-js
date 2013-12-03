Lift JS
=======

Lift JS aims to raise old browers up to the same level as modern browsers. It is
a collection of AMD modules loaded on-demand to shim missing JS features.

Load LiftJS with your favorite AMD loader.

Examples
========

Here are some code examples to show how to use lift JS with various AMD loaders.

RequireJS
---------

```javascript
require.config({
  deps: ['liftjs'],
  packages: [
    {
      name: 'liftjs',
      location: 'lib/liftjs/',
      main: 'lift'
    }
  ]
});
// All LiftJS dependencies loaded before main is executed.
require(['main'], callback);
```

-----

```javascript
require({ paths: { lib: 'lib/' } }, ['lib/liftjs/lift'], function() {
  // lift.js and all dependencies are loaded.
  require(['main', 'other'], callback);
});
```

CurlJS
------

```javascript
curl.config({
  preloads: ['liftjs'],
  packages: [
    {
      name: 'liftjs',
      path: 'lib/liftjs/',
      main: 'lift'
    }
  ]
});
curl(['main', 'other', 'another' /* etc */]).then(callback, errorback);
```

-----

```javascript
// lift.js and all dependencies are loaded before the .next() call
curl({ paths: { lib: 'lib/' } }, ['lib/liftjs/lift']).next(['main'], callback);
```
