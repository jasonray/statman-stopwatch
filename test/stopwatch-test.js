/*jslint node: true */
"use strict";

var Stopwatch = require('../lib/Stopwatch');
var defaultPrecision = 15;
var mocha = require('mocha');
var assert = require('assert');

describe('stopwatch', function () {
    this.timeout(5000);

    it('init', function (done) {
        var stopwatch = new Stopwatch();
        done();
    });

    it('start and read (1000ms)', function (done) {
        var testtime = 1000;

        var stopwatch = new Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            var delta = stopwatch.read();
            verifyDelta(1000, testtime, defaultPrecision);
            done();
        }, testtime);
    });

    it('start and read (10ms)', function (done) {
        var testtime = 10;

        var stopwatch = new Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            var delta = stopwatch.read();
            verifyDelta(testtime, delta, defaultPrecision);
            done();
        }, testtime);
    });

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

    it('start, stop, and read', function (done) {
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

    it('performing read without start() or stop() returns NaN', function (done) {
        var stopwatch = new Stopwatch();
        assert.ok(isNaN(stopwatch.read()));
        done();
    });

    it('performing read without start() returns NaN', function (done) {
        var stopwatch = new Stopwatch();
        stopwatch.stop();
        assert.ok(isNaN(stopwatch.read()));
        done();
    });

    it('executing stop twice', function (done) {
        //start(), wait .1s, stop(), wait .2s, stop(), wait .5s, read(), ensure delta = .3s
        var stopwatch = new Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            stopwatch.stop();

            setTimeout(function () {
                stopwatch.stop();
                setTimeout(function () {
                    var delta = stopwatch.read();
                    verifyDelta(100 + 200, delta, defaultPrecision);
                    done();
                }, 500);
            }, 200);
        }, 100);
    });

    it('ensure that stop() returns time', function (done) {
        var testtime = 100;
        var stopwatch = new Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            var delta = stopwatch.stop();
            verifyDelta(testtime, delta, defaultPrecision);
            done();
        }, testtime);
    });
});

function verifyDelta(expected, actual, acceptedVariance) {
    var lowerThreshold = expected - acceptedVariance;
    var upperThreshold = expected + acceptedVariance;
    var message = "Expected " + expected + " ± " + acceptedVariance + ", was " + actual + ".";
    assert.ok((actual >= lowerThreshold) && (actual <= upperThreshold), message);
}