# statman-stopwatch 
[![Build Status](https://travis-ci.org/jasonray/statman-stopwatch.svg?branch=master)](https://travis-ci.org/jasonray/statman-stopwatch) [![on npm](http://img.shields.io/npm/v/statman-stopwatch.svg?style=flat)](https://www.npmjs.org/package/statman-stopwatch) 
[![Greenkeeper](https://badges.greenkeeper.io/jasonray/statman-stopwatch.svg)](https://greenkeeper.io/) [![Dependency badge](https://david-dm.org/jasonray/statman-stopwatch.svg)](https://david-dm.org/jasonray/statman-stopwatch) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/0a3043b7fa3c4f97b2c63f63f30df40e)](https://app.codacy.com/app/jasonray/statman-stopwatch?utm_source=github.com&utm_medium=referral&utm_content=jasonray/statman-stopwatch&utm_campaign=Badge_Grade_Dashboard)

`statman-stopwatch` is one of the metrics from the [`statman`](https://github.com/jasonray/statman) library.  It is a simple high res stopwatch for node.js.  Stopwatch is useful for determining the amount of time it takes to perform an activity.

For example, you may want to determine how long certain potentially expensive activities take in your code (such as calling to an external web services or fetching a dataset from a database).  Few lines of code will let you capture that info.  There are much more elegant solutions - this is a simple roll-your-own approach.

## Install it!
### Option 1: access directly
Install using npm:
``` bash
npm install statman-stopwatch
```

Reference in your app:
``` javascript
const Stopwatch = require('statman-stopwatch');
const stopwatch = new Stopwatch();
```

### Option 2: access from `statman`
Install using npm:
``` bash
npm install statman
```

Reference in your app:
``` javascript
const statman = require('statman');
const stopwatch = new statman.Stopwatch();
```

## Use it!
### Constructor
-   `Stopwatch()` => create instance of a stopwatch
-   `Stopwatch(true)` => create instance of stopwatch, and have it autostart
-   `Stopwatch(name, autostart, delta) => create instance of stopwatch, with name, specify if to autostart, and supply an automatic delta (see setStartTimeDelta)

### start
-   `start()` => starts the stopwatch, let the timing begin!

### read
-   `read(precision)` => reads the stopwatch to determine how much time has elapsed.  Note that the stopwatch continues to run.  Returns the time elapsed in milliseconds.  If `precision` is provided, `read()` will round to the numbe of decimals places based on precision.
-   `time(precision)` => alias for `read()`

### stop
-   `stop()` => stops the stopwatch, and returns the time elapsed in milliseconds

### split
-   `split()` => temp stops the stopwatch, allow read() to return time based on when split occurs.  Use `unsplit()` to resume the stopwatch

### unsplit
-   `unsplit()` => use follow a `split()` to resume the stopwatch

### splitTime
-   `splitTime` => while the stopwatch is split, returns the time as of the split

### reset
-   `reset()` => restores the stopwatch back to init state and clears start and stop times

### setStartTimeDelta
-   `setStartTimeDelta(number)` => provide an elapsed time (in milliseconds) at which to start the stopwatch

### Example

There are some examples in `example/example.js`

#### Basic usage
Create a new stopwatch, `start()` it, and later `read()` it
``` javascript
    const Stopwatch = require('statman-stopwatch');
    const sw = new Stopwatch();
    sw.start();

    // do some activity

    const delta = sw.read();
 ```

#### Autostart
`start()` is too hard.  Create a new stopwatch with autostart=true, and later `read()` it
``` javascript
    const Stopwatch = require('statman-stopwatch');
    const sw = new Stopwatch(true);

    // do some activity

    const delta = sw.read();
 ```

#### Stop
Create a new stopwatch, `stop()` it, and later `read()` it
``` javascript
    const Stopwatch = require('statman-stopwatch');
    const sw = new Stopwatch(true);

    // do some activity

    sw.stop();

    // do some more activity

    //returns time associated with when stop() occurred
    const delta = sw.read();
 ```

#### Delta
Create a new stopwatch, `start()` it, and later `read()` it
``` javascript
    const Stopwatch = require('statman-stopwatch');
    const sw = new Stopwatch();
    sw.setStartTimeDelta(5000);
    sw.start();

    // do some activity which takes 500

    const delta = sw.read();
    // delta will be 5500 (the initial 5000ms set in setStartTimeDelta plus the elapsed 500ms)
 ```
 
## Build it!
-   Make sure that you have `node` and `npm` installed
-   Clone source code to you local machine
-   Setup dependencies: `npm install`
-   run tests: `npm test`
