/*jslint node: true */
"use strict";

var Stopwatch = require('../Stopwatch');
var defaultPrecision = 5;

exports.initStopwatch = function(test) {
    var stopwatch = new Stopwatch('mystopwatchA');
    test.equal(stopwatch.name, 'mystopwatchA');
    test.done();
};

exports.initStopwatchWithoutName = function(test) {
    var stopwatch = new Stopwatch();
    test.ok(stopwatch.name !== undefined);
    test.done();
};

exports.startAndReadStopwatch1000 = function(test) {
    var stopwatch = new Stopwatch('mystopwatchB');
    stopwatch.start();
    setTimeout(function() {
        var delta = stopwatch.read();
        verifyDelta(test, 1000, delta, defaultPrecision);
        test.done();
    }, 1000);
};

exports.startAndReadStopwatch10 = function(test) {
    var stopwatch = new Stopwatch('mystopwatchC');
    stopwatch.start();
    setTimeout(function() {
        var delta = stopwatch.read();
        verifyDelta(test, 10, delta, defaultPrecision);
        test.done();
    }, 10);
};

exports.autostart = function(test) {
    var stopwatchA = new Stopwatch('autostartA', true);
    var stopwatchB = new Stopwatch('notautostartB', false);
    setTimeout(function() {
        var deltaA = stopwatchA.read();
        verifyDelta(test, 1000, deltaA, defaultPrecision);

        var deltaB = stopwatchB.read();
        test.ok(isNaN(deltaB));
        test.done();
    }, 1000);
};



exports.twoStopWatches = function(test) {
    var stopwatch1 = new Stopwatch('sw1');
    var stopwatch2 = new Stopwatch('sw2');

    stopwatch1.start();

    setTimeout(function() {
        var delta1 = stopwatch1.read();
        verifyDelta(test, 2000, delta1, defaultPrecision);
    }, 2000);

    setTimeout(function() {
        stopwatch2.start();
        setTimeout(function() {
            var delta2 = stopwatch2.read();
            verifyDelta(test, 3000, delta2, defaultPrecision);
            test.done();
        }, 3000);
    }, 500);
};


exports.utilizeStop = function(test) {
    var stopwatch = new Stopwatch('mystopwatchB');
    stopwatch.start();
    setTimeout(function() {
        stopwatch.stop();

        setTimeout(function() {
            var delta = stopwatch.read();
            verifyDelta(test, 1000, delta, defaultPrecision);
            test.done();

        }, 1000);

    }, 1000);
};

exports.stopWithoutStart = function(test) {
    var stopwatch = new Stopwatch('a');
    stopwatch.stop();
    test.ok(isNaN(stopwatch.read()));
    test.done();
};

exports.utilizeStopTwice = function(test) {
    var stopwatch = new Stopwatch('b');
    stopwatch.start();
    setTimeout(function() {
        stopwatch.stop();

        setTimeout(function() {
            stopwatch.stop();
            setTimeout(function() {
                var delta = stopwatch.read();
                verifyDelta(test, 2000, delta, defaultPrecision);
                test.done();

            }, 1000);

        }, 1000);

    }, 1000);
};

function verifyDelta(test, expected, actual, acceptedVariance) {
    var lowerThreshold = expected - acceptedVariance;
    var upperThreshold = expected + acceptedVariance;
    var message = "Expected " + expected + " ± " + acceptedVariance + ", was " + actual + ".";
    test.ok((actual >= lowerThreshold) && (actual <= upperThreshold), message);
}