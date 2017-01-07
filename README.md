# statman-stopwatch [![Build Status](https://travis-ci.org/jasonray/statman-stopwatch.svg?branch=master)](https://travis-ci.org/jasonray/statman-stopwatch) [![on npm](http://img.shields.io/npm/v/statman-stopwatch.svg?style=flat)](https://www.npmjs.org/package/statman-stopwatch)

Simple high res stopwatch for node.js.  Stopwatch is useful for determining the amount of time it takes to perform an activity.


Use it!
=======

Basic usage
-----------
Create a new stopwatch, `start()` it, and later `read()` it
```
    var Stopwatch = require('statman-stopwatch');
    var sw = new Stopwatch();
    sw.start();

    // do some activity

    var delta = sw.read();
 ```

Autostart
---------
`start()` is too hard.  Create a new stopwatch with autostart=true, and later `read()` it
```
    var Stopwatch = require('statman-stopwatch');
    var sw = new Stopwatch(true);

    // do some activity

    var delta = sw.read();
 ```

Stop
----
Create a new stopwatch, `stop()` it, and later `read()` it
```
    var Stopwatch = require('statman-stopwatch');
    var sw = new Stopwatch(true);

    // do some activity

    sw.stop();

    // do some more activity

    //returns time associated with when stop() occurred
    var delta = sw.read();
 ```
