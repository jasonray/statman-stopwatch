/*jslint node: true */
"use strict";

var Stopwatch = require('../lib/Stopwatch');
var defaultPrecision = 20;
var assert = require('assert');
// var TestHelper = require('./testhelper');
var should = require('should');

describe('stopwatch', function () {
    this.timeout(5000);

    it('init should return an instance of stopwatch', function (done) {
        var stopwatch;
        stopwatch = new Stopwatch();
        assert.ok(stopwatch);
        done();
    });

    it.skip('start and read (100ms)', function (done) {
        var testtime = 100;

        var stopwatch = new Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            var delta = stopwatch.read();
            TestHelper.assertCloseEnough(testtime, delta, defaultPrecision);
            done();
        }, testtime);
    });

    it.skip('start and read (10ms)', function (done) {
        var testtime = 10;

        var stopwatch = new Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            var delta = stopwatch.read();
            TestHelper.assertCloseEnough(testtime, delta, defaultPrecision);
            done();
        }, testtime);
    });

    it.skip('autostart set to true automatically starts stopwatch', function (done) {
        var testtime = 10;

        var stopwatch = new Stopwatch(true);
        setTimeout(function () {
            var delta = stopwatch.read();
            TestHelper.assertCloseEnough(testtime, delta, defaultPrecision);
            done();
        }, testtime);
    });

    it('autostart set to false does NOT automatically start stopwatch', function (done) {
        var testtime = 10;

        var stopwatch = new Stopwatch(false);
        setTimeout(function () {
            var delta = stopwatch.read();
            assert.ok(isNaN(delta));
            done();
        }, testtime);
    });

    it.skip('with two stopwatches, do independent reads of each', function (done) {
        var stopwatch1 = new Stopwatch();
        var stopwatch2 = new Stopwatch();

        stopwatch1.start();

        //start first stopwatch, then do a read .3s later
        var testtimeA = 300;
        setTimeout(function () {
            var delta1 = stopwatch1.read();
            TestHelper.assertCloseEnough(testtimeA, delta1, defaultPrecision);
        }, testtimeA);

        //start second stopwatch .1s second after the first, then do a read .5s later
        var testtimeB = 500;
        setTimeout(function () {
            stopwatch2.start();
            setTimeout(function () {
                var delta2 = stopwatch2.read();
                TestHelper.assertCloseEnough(testtimeB, delta2, defaultPrecision);
                done();
            }, testtimeB);
        }, 100);
    });

    it.skip('start, stop, and read should return the time at stop', function (done) {
        var testtime = 100;

        var stopwatch = new Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            stopwatch.stop();

            setTimeout(function () {
                var delta = stopwatch.read();
                TestHelper.assertCloseEnough(testtime, delta, defaultPrecision);
                done();
            }, 500);
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

    it.skip('executing stop twice should return time at second stop', function (done) {
        //start(), wait .1s, stop(), wait .2s, stop(), wait .5s, read(), ensure delta = .3s
        var stopwatch = new Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            stopwatch.stop();

            setTimeout(function () {
                TestHelper.assertCloseEnough(100 + 200, stopwatch.stop(), defaultPrecision);

                setTimeout(function () {
                    var delta = stopwatch.read();
                    TestHelper.assertCloseEnough(100 + 200, delta, defaultPrecision);
                    done();
                }, 500);
            }, 200);
        }, 100);
    });

    it.skip('ensure that stop() returns time', function (done) {
        var testtime = 100;
        var stopwatch = new Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            var delta = stopwatch.stop();
            TestHelper.assertCloseEnough(testtime, delta, defaultPrecision);
            done();
        }, testtime);
    });
});

