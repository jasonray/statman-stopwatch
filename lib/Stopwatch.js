const now = require("performance-now");
const { v4: uuid } = require("uuid");

const isBoolean = (val) => "boolean" === typeof val;

const STATES = {
    INIT: "init",
    RUNNING: "running",
    STOPPED: "stopped",
    SPLIT: "split"
};


function Stopwatch(name, autostart, delta) {
    const self = this;

    if (isBoolean(name)) {
        autostart = name;
        name = null;
    }

    if (!name) {
        name = uuid();
    }

    self._name = name;

    self.reset();
    self.setStartTimeDelta(delta);

    if (autostart) {
        this.start();
    }
}

Stopwatch.prototype.STATES = STATES;

Stopwatch.prototype.name = function () {
    const self = this;
    return self._name;
};

Stopwatch.prototype._calculateDelta = function (start, end) {
    return end - start;
};

Stopwatch.prototype.start = function () {
    const self = this;

    self._verifyState([STATES.STOPPED, STATES.INIT], "Cannot start a stopwatch that is currently running");

    self._state = STATES.RUNNING;
    self.startTime = now();
};

Stopwatch.prototype.stop = function () {
    const self = this;
    self.stopTime = now();
    self._state = STATES.STOPPED;
    return this.read();
};

Stopwatch.prototype.suspend = function () {
    const self = this;
    self._verifyState([STATES.RUNNING], "Cannot suspend a stopwatch that is not running");
    return self.stop();
};

Stopwatch.prototype.resume = function () {
    const self = this;

    self._verifyState([STATES.STOPPED], "Cannot resume a stopwatch that is not running");

    pausedTime = self.read();
    self.setStartTimeDelta(pausedTime);
    self.start()
    
    //move this to .start()?
    self.stopTime=0;
};


Stopwatch.prototype.setStartTimeDelta = function (startTimeDelta) {
    const self = this;

    self._verifyState([STATES.STOPPED, STATES.INIT], "Cannot set an initial start time delta on a stopwatch that is currently running");

    self._StartTimeDelta = startTimeDelta;
};

Stopwatch.prototype.split = function () {
    const self = this;

    self._verifyState([STATES.RUNNING], "Cannot split time on a stopwatch that is not currently running");

    self.stopTime = now();
    self._state = STATES.SPLIT;
    return this.read();
};

Stopwatch.prototype.unsplit = function () {
    const self = this;

    self._verifyState([STATES.SPLIT], "Cannot unsplit time on a stopwatch that is not currently split");

    self.stopTime = null;
    self._state = STATES.RUNNING;
    return this.read();
};

Stopwatch.prototype.state = function () {
    return this._state;
};

Stopwatch.prototype.reset = function () {
    const self = this;
    self._state = STATES.INIT;
    self.startTime = null;
    self.stopTime = null;
};

Stopwatch.prototype.splitTime = function () {
    const self = this;

    self._verifyState([STATES.SPLIT], "Cannot get split time on a stopwatch that is not currently split");

    return self._calculateDelta(self.startTime, self.stopTime);
};

Stopwatch.prototype.read = Stopwatch.prototype.time = function (precision) {
    const self = this;
    const startTime = self.startTime;
    let delta;

    if (startTime) {
        let nowTime;
        if (self.stopTime) {
            nowTime = self.stopTime;
        } else {
            nowTime = now();
        }

        delta = self._calculateDelta(startTime, nowTime);

        if (self._StartTimeDelta) {
            delta = delta + self._StartTimeDelta;
        }

        if (precision || precision === 0) {
            delta = delta.toFixed(precision);
        }
    } else {
        delta = NaN;
    }

    return delta;
};

Stopwatch.prototype.toString = function () {
    const self = this;
    let name = self.name();
    let state = self.state();
    let value = self.read().toFixed(2);
    let output = `[${name} => state:${state}; value:${value}]`;
    return output;
};

Stopwatch.prototype.prettyPrint = function () {
    process.stdout.write(this.toString() + "\n");
};

Stopwatch.prototype._verifyState = function (allowedStates, failedMessage) {
    const self = this;

    let foundMatch = false;
    for (const allowedState of allowedStates) {
        if (self.state() === allowedState) {
            foundMatch = true;
        }
    }

    if (!foundMatch) {
        if (!failedMessage) {
            failedMessage = "Unexpected state"
        }
        throw new Error(failedMessage + " (" + self.state() + ")");
    }
};

module.exports = Stopwatch;