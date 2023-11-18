# statman-stopwatch 

[![Node.js CI](https://github.com/jasonray/statman-stopwatch/actions/workflows/node.js.yml/badge.svg)](https://github.com/jasonray/statman-stopwatch/actions/workflows/node.js.yml) [![on npm](http://img.shields.io/npm/v/statman-stopwatch.svg?style=flat)](https://www.npmjs.org/package/statman-stopwatch) [![Known Vulnerabilities](https://snyk.io/test/github/jasonray/statman-stopwatch/badge.svg)](https://snyk.io/test/github/jasonray/statman-stopwatch) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/1afa7995fa5c4f7ba94d06d2a8fb3086)](https://app.codacy.com/gh/jasonray/statman-stopwatch/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

`statman-stopwatch` is one of the metrics from the [`statman`](https://github.com/jasonray/statman) library.  It is a simple high res stopwatch for node.js.  Stopwatch is useful for determining the amount of time it takes to perform an activity.

For example, you may want to determine how long certain potentially expensive activities take in your code (such as calling to an external web services or fetching a dataset from a database).  Few lines of code will let you capture that info.  There are much more elegant solutions - this is a simple roll-your-own approach.

## Install it!
### Option 1: access directly (recommended)
Install using npm:
``` bash
npm install statman-stopwatch
```

Reference in your app:
``` javascript
const Stopwatch = require('statman-stopwatch');
const stopwatch = new Stopwatch();
```

### Option 2: access from `statman` (deprecated)
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
-   `Stopwatch(name, autostart, delta)` => create instance of stopwatch, with name, specify if to autostart, and supply an automatic delta (see setStartTimeDelta)

### start
-   `start()` => starts the stopwatch, let the timing begin!

### read
-   `read(precision, units)` => reads the stopwatch to determine how much time has elapsed.  Note that the stopwatch continues to run.  Returns the time elapsed in milliseconds.
  - If `precision` is provided, `read()` will round to the number of decimals places based on precision.
  - By default, `read` returns in `ms`.  If `units` is specified to `s`, will return values in seconds.
-   `time(precision)` => alias for `read()`

### stop, suspend
-   `stop()` => stops the stopwatch, and returns the time elapsed in milliseconds

### restart
-   `restart()` => performs a stop() and start()

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

### resume
-   `resume` => used in conjunction with `suspend` to pause/restart the stopwatch

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
There may be scenarios in which you need to add multiple timings together.  To help with this, you can initialize the stopwatch with a value that will be added to the readings.
Note that most scenarios could also be achieved by suspending/resuming the stopwatch.
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

#### Suspend/Resume
There are times where you may want to exclude certain events from the stopwatch, so you can `suspend` (pause) the stopwatch, then `resume` after the excluded event is complete.
Create a new stopwatch, `start()` it, and later `read()` it
``` javascript
    const Stopwatch = require('statman-stopwatch');
    const sw = new Stopwatch();
    sw.start();

    // do some activity


    sw.suspend();
    //do some activity that should not be included in the timings
    sw.resume();

    let delta = sw.stop();
 ```
 
## Build it!
-   Make sure that you have `node` and `npm` installed
-   Clone source code to you local machine
-   Setup dependencies: `npm install`
-   run tests: `npm test`
