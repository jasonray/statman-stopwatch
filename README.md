statman-stopwatch
=================

Simple high res stopwatch for node.js.  Stopwatch is useful for determining the amount of time it takes to perform an activity.


Use it!
=======

Basic usage
-----------
Create a new stopwatch, `start()` it, and later `read()` it
```
    var metrics = require('statman');
    var stopwatch = new metrics.Stopwatch();
    stopwatch.start();

    // do some activity

    var delta = stopwatch.read();
 ```

Autostart
---------
`start()` is too hard.  Create a new stopwatch with autostart=true, and later `read()` it
```
    var metrics = require('statman');
    var stopwatch = new metrics.Stopwatch(true);

    // do some activity

    var delta = stopwatch.read();
 ```

Stop
----
Create a new stopwatch, `stop()` it, and later `read()` it
```
    var metrics = require('statman');
    var stopwatch = new metrics.Stopwatch(true);

    // do some activity

    stopwatch.stop();

    // do some more activity

    var delta = stopwatch.read();  //returns time associated with when stop() occurred
 ```
