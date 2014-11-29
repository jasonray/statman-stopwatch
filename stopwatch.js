var uuid = require('node-uuid');
var now = require("performance-now")

function Stopwatch(name, autostart) {
    var self = this;
    if (!name) name = uuid.v4();
    self.name = name;
    if (autostart) self.start();
}

Stopwatch.prototype.start = function() {
    var self = this;
    self.startTime = now();
    // console.log('starting stopwatch %s at %s ', self.name, self.startTime);
}

Stopwatch.prototype.stop = function() {
    var self = this;
    self.stopTime = now();
}

Stopwatch.prototype.read = function() {
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

    // console.log('reading stopwatch %s at %s for delta reading of %s ', self.name, nowTime, delta);
    return delta;

    function calculateDelta(start, end) {
        return end - start;
    }
}

module.exports = Stopwatch;