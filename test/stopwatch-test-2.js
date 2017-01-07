/*jslint node: true */
"use strict";

var Stopwatch = require('../lib/Stopwatch');
var defaultPrecision = 20;
var assert = require('assert');
// var TestHelper = require('./testhelper');
var should = require('should');

describe('stopwatch 2', function () {
    this.timeout(5000);

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

