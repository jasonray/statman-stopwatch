/*jslint node: true */
"use strict";

var Stopwatch = require('../lib/Stopwatch');
var defaultPrecision = 10;
var mocha = require('mocha');
var assert = require('assert');

describe('stopwatch', function () {
    this.timeout(3000);

    it('init', function (done) {
        var stopwatch = new Stopwatch();
        done();
    });

    it('start, stop, and read (1000ms)', function (done) {
        var testtime = 1000;

        var stopwatch = new Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            var delta = stopwatch.read();
            verifyDelta(1000, testtime, defaultPrecision);
            done();
        }, testtime);
    });

    it('start, stop, and read (10ms)', function (done) {
        var testtime = 10;

        var stopwatch = new Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            var delta = stopwatch.read();
            verifyDelta(testtime, delta, defaultPrecision);
            done();
        }, testtime);
    });

    // it('test name', function (done) {
    // });

    it('autostart', function (done) {
        var testtime = 10;

        var stopwatchA = new Stopwatch(true);
        var stopwatchB = new Stopwatch(false);
        setTimeout(function () {
            var deltaA = stopwatchA.read();
            verifyDelta(testtime, deltaA, defaultPrecision);

            var deltaB = stopwatchB.read();
            assert.ok(isNaN(deltaB));
            done();
        }, testtime);
    });

    it('with two stopwatches, do independent reads of each', function (done) {
        var stopwatch1 = new Stopwatch();
        var stopwatch2 = new Stopwatch();

        stopwatch1.start();

        //start first stopwatch, then do a ready 2s later
        var testtimeA = 2000;
        setTimeout(function () {
            var delta1 = stopwatch1.read();
            verifyDelta(testtimeA, delta1, defaultPrecision);
        }, testtimeA);

        //start second stopwatch 1/2 second after the first, then do a ready 3s later
        var testtimeB = 2000;
        setTimeout(function () {
            stopwatch2.start();
            setTimeout(function () {
                var delta2 = stopwatch2.read();
                verifyDelta(testtimeB, delta2, defaultPrecision);
                done();
            }, testtimeB);
        }, 500);
    });

    it('utilize stop', function (done) {
        var testtime = 500;

        var stopwatch = new Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            stopwatch.stop();

            setTimeout(function () {
                var delta = stopwatch.read();
                verifyDelta(testtime, delta, defaultPrecision);
                done();
            }, 1000);
        }, testtime);
    });

    // it('test name', function (done) {
    // });


});


// };
//
//
//
// exports.twoStopWatches = function(test) {

// };
//
// exports.utilizeStop = function(test) {

// };
//
// exports.stopWithoutStart = function(test) {
//     var stopwatch = new Stopwatch();
//     stopwatch.stop();
//     test.ok(isNaN(stopwatch.read()));
//     test.done();
// };
//
// exports.utilizeStopTwice = function(test) {
//     var stopwatch = new Stopwatch();
//     stopwatch.start();
//     setTimeout(function() {
//         stopwatch.stop();
//
//         setTimeout(function() {
//             stopwatch.stop();
//             setTimeout(function() {
//                 var delta = stopwatch.read();
//                 verifyDelta(test, 2000, delta, defaultPrecision);
//                 test.done();
//
//             }, 1000);
//
//         }, 1000);
//
//     }, 1000);
// };
//
// exports.stopReturnsTime = function(test) {
//     var stopwatch = new Stopwatch();
//     stopwatch.start();
//     setTimeout(function() {
//         var delta = stopwatch.stop();
//         verifyDelta(test, 1000, delta, defaultPrecision);
//         test.done();
//     }, 1000);
// };

function verifyDelta(expected, actual, acceptedVariance) {
    var lowerThreshold = expected - acceptedVariance;
    var upperThreshold = expected + acceptedVariance;
    var message = "Expected " + expected + " ± " + acceptedVariance + ", was " + actual + ".";
    assert.ok((actual >= lowerThreshold) && (actual <= upperThreshold), message);
}