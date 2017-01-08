/*jslint node: true */
"use strict";

var Stopwatch = require('../lib/Stopwatch');
var defaultPrecision = 15;
var assert = require('assert');
var should = require('should');

describe('stopwatch', function () {
    this.timeout(5000);

    describe('constructor', function () {
        it('w/no params', function () {
            var stopwatch = new Stopwatch();
            should.exist(stopwatch);
        });

        it('w/name as first param', function () {
            var stopwatch = new Stopwatch('metric-name');
            stopwatch.name().should.equal('metric-name');
        });

        it('w/autostart as first param', function () {
            var stopwatch = new Stopwatch(true);
            should.exist(stopwatch.name());
            stopwatch.name().should.not.equal(true);
        });

        it('w/both name and autostart', function () {
            var stopwatch = new Stopwatch('metric-name', true);
            stopwatch.name().should.equal('metric-name');
        });

        it('autocreated names are not constant', function () {
            var stopwatch1 = new Stopwatch(true);
            var stopwatch2 = new Stopwatch(true);
            stopwatch1.name().should.not.equal(stopwatch2.name());
        });
    });

    it('start and read (100ms)', function (done) {
        var testtime = 100;

        var stopwatch = new Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            var delta = stopwatch.read();
            verifyDelta(testtime, delta, defaultPrecision);
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

    it('autostart set to true automatically starts stopwatch', function (done) {
        var testtime = 10;

        var stopwatch = new Stopwatch(true);
        setTimeout(function () {
            var delta = stopwatch.read();
            verifyDelta(testtime, delta, defaultPrecision);
            done();
        }, testtime);
    });

    it('autostart set to false does NOT automatically start stopwatch', function (done) {
        var testtime = 10;

        var stopwatch = new Stopwatch(false);
        setTimeout(function () {
            stopwatch.read().should.be.NaN();
            done();
        }, testtime);
    });

    it('with two stopwatches, do independent reads of each', function (done) {
        var stopwatch1 = new Stopwatch();
        var stopwatch2 = new Stopwatch();

        stopwatch1.start();

        //start first stopwatch, then do a read .3s later
        var testtimeA = 300;
        setTimeout(function () {
            var delta1 = stopwatch1.read();
            verifyDelta(testtimeA, delta1, defaultPrecision);
        }, testtimeA);

        //start second stopwatch .1s second after the first, then do a read .5s later
        var testtimeB = 500;
        setTimeout(function () {
            stopwatch2.start();
            setTimeout(function () {
                var delta2 = stopwatch2.read();
                verifyDelta(testtimeB, delta2, defaultPrecision);
                done();
            }, testtimeB);
        }, 100);
    });

    it('start, stop, and read should return the time at stop', function (done) {
        var testtime = 100;

        var stopwatch = new Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            stopwatch.stop();

            setTimeout(function () {
                var delta = stopwatch.read();
                verifyDelta(testtime, delta, defaultPrecision);
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

    it('executing stop twice should return time at second stop', function (done) {
        //start(), wait .1s, stop(), wait .2s, stop(), wait .5s, read(), ensure delta = .3s
        var stopwatch = new Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            stopwatch.stop();

            setTimeout(function () {
                verifyDelta(100 + 200, stopwatch.stop(), defaultPrecision);

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

    describe('toString()', function () {
        it('idle', function () {
            var stopwatch = new Stopwatch('sw');
            //[sw => state:init; value:NaN]
            stopwatch.toString().should.containEql('state:init');
            stopwatch.toString().should.containEql('value:');
        });
        it('started', function () {
            var stopwatch = new Stopwatch('sw', true);
            //[sw => state:running; value:0.01]
            stopwatch.toString().should.containEql('state:running');
            stopwatch.toString().should.containEql('value:0');
        });
        it('stopped', function () {
            var stopwatch = new Stopwatch('sw', true);
            stopwatch.stop();
            //[sw => state:stopped; value:0.01]
            stopwatch.toString().should.containEql('state:stopped');
            stopwatch.toString().should.containEql('value:0');
        });
    });
});


//TODO:
//replace with: statman.TestHelper.assertCloseEnough(testtime, delta, defaultPrecision);
function verifyDelta(expected, actual, acceptedVariance) {
    var lowerThreshold = expected - acceptedVariance;
    var upperThreshold = expected + acceptedVariance;
    var message = "Expected " + expected + " ± " + acceptedVariance + ", was " + actual + ".";
    assert.ok((actual >= lowerThreshold) && (actual <= upperThreshold), message);
}