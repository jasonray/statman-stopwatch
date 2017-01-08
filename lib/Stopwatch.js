var now = require("performance-now");
var _ = require('underscore');
const uuid = require('uuid/v4');
var format = require('string-template');

const STATE = {
    INIT: 'init',
    RUNNING: 'running',
    STOPPED: 'stopped',
};

function Stopwatch(name, autostart) {
    var self = this;

    if (_.isBoolean(name)) {
        autostart = name;
        name = null;
    }

    if (_.isEmpty(name)) {
        name = uuid();
    }

    self._name = name;

    self._state = STATE.INIT;

    if (autostart) this.start();
}

Stopwatch.prototype.name = function () {
    var self = this;
    return self._name;
};

Stopwatch.prototype.start = function () {
    var self = this;
    self._state = STATE.RUNNING;
    self.startTime = now();
};

Stopwatch.prototype.stop = function () {
    var self = this;
    self.stopTime = now();
    self._state = STATE.STOPPED;
    return this.read();
};

Stopwatch.prototype.state = function () {
    return this._state;
};

Stopwatch.prototype.read = function () {
    var self = this;
    var startTime = self.startTime;
    var nowTime;
    var delta;

    if (startTime) {
        if (self.stopTime) {
            nowTime = self.stopTime;
        } else {
            nowTime = now();
        }

        delta = calculateDelta(startTime, nowTime);
    } else {
        nowTime = undefined;
        delta = NaN;
    }

    return delta;

    function calculateDelta(start, end) {
        return end - start;
    }
};

Stopwatch.prototype.toString = function () {
    var self = this;
    var template;
    template = "[{name} => state:{state}; value:{value}]";
    return format(template, {name: self.name(), state: self.state(), value: self.read().toFixed(2)});
};

module.exports = Stopwatch;