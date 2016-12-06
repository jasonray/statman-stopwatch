/*jslint node: true */
"use strict";

var Stopwatch = require('../lib/Stopwatch');
var defaultPrecision = 5;
var mocha = require('mocha');
var assert = require('assert');

describe('stopwatch', function () {
    it('init', function (done) {
        var stopwatch = new Stopwatch();
        done();
    });

    it('start, stop, and read (1000ms)', function (done) {
        var stopwatch = new Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            var delta = stopwatch.read();
            verifyDelta(1000, delta, defaultPrecision);
            done();
        }, 1000);
    });
});


// exports.initStopwatch = function(test) {
//     var stopwatch = new Stopwatch();
//     test.done();
// };
//
// exports.startAndReadStopwatch1000 = function(test) {
//     var stopwatch = new Stopwatch();
//     stopwatch.start();
//     setTimeout(function() {
//         var delta = stopwatch.read();
//         verifyDelta(test, 1000, delta, defaultPrecision);
//         test.done();
//     }, 1000);
// };
//
// exports.startAndReadStopwatch10 = function(test) {
//     var stopwatch = new Stopwatch();
//     stopwatch.start();
//     setTimeout(function() {
//         var delta = stopwatch.read();
//         verifyDelta(test, 10, delta, defaultPrecision);
//         test.done();
//     }, 10);
// };
//
// exports.autostart = function(test) {
//     var stopwatchA = new Stopwatch(true);
//     var stopwatchB = new Stopwatch(false);
//     setTimeout(function() {
//         var deltaA = stopwatchA.read();
//         verifyDelta(test, 1000, deltaA, defaultPrecision);
//
//         var deltaB = stopwatchB.read();
//         test.ok(isNaN(deltaB));
//         test.done();
//     }, 1000);
// };
//
//
//
// exports.twoStopWatches = function(test) {
//     var stopwatch1 = new Stopwatch();
//     var stopwatch2 = new Stopwatch();
//
//     stopwatch1.start();
//
//     setTimeout(function() {
//         var delta1 = stopwatch1.read();
//         verifyDelta(test, 2000, delta1, defaultPrecision);
//     }, 2000);
//
//     setTimeout(function() {
//         stopwatch2.start();
//         setTimeout(function() {
//             var delta2 = stopwatch2.read();
//             verifyDelta(test, 3000, delta2, defaultPrecision);
//             test.done();
//         }, 3000);
//     }, 500);
// };
//
// exports.utilizeStop = function(test) {
//     var stopwatch = new Stopwatch();
//     stopwatch.start();
//     setTimeout(function() {
//         stopwatch.stop();
//
//         setTimeout(function() {
//             var delta = stopwatch.read();
//             verifyDelta(test, 1000, delta, defaultPrecision);
//             test.done();
//
//         }, 1000);
//
//     }, 1000);
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