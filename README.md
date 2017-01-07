# statman-stopwatch [![Build Status](https://travis-ci.org/jasonray/statman-stopwatch.svg?branch=master)](https://travis-ci.org/jasonray/statman-stopwatch) [![on npm](http://img.shields.io/npm/v/statman-stopwatch.svg?style=flat)](https://www.npmjs.org/package/statman-stopwatch)

`statman-stopwatch` is one of the metrics from the [`statman`](https://github.com/jasonray/statman) library.  It is a simple high res stopwatch for node.js.  Stopwatch is useful for determining the amount of time it takes to perform an activity.

# Install it!
## Option 1: access directly
Install using npm:
```
npm install statman-gauge
```

Reference in your app:
```
var Gauge = require('statman-gauge');
var gauge = Gauge('gauge-name');
```

## Option 2: access from `statman`
Install using npm:
```
npm install statman
```

Reference in your app:
```
var statman = require('statman');
var gauge = statman.Gauge('gauge-name');
```

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
