var now = require("performance-now");
var _ = require('underscore');
const uuid = require('uuid/v4');

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

    if (autostart) this.start();
}

Stopwatch.prototype.name = function () {
    var self = this;
    return self._name;
};

Stopwatch.prototype.start = function () {
    this.startTime = now();
};

Stopwatch.prototype.start = function () {
    this.startTime = now();
};

Stopwatch.prototype.stop = function () {
    this.stopTime = now();
    return this.read();
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

module.exports = Stopwatch;