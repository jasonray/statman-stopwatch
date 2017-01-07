/*jslint node: true */
"use strict";

var Stopwatch = require('../lib/Stopwatch');
var defaultPrecision = 20;
var assert = require('assert');
// var TestHelper = require('./testhelper');
var should = require('should');

describe('stopwatch 2', function () {
    this.timeout(5000);

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

