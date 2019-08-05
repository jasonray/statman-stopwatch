
function expensiveOperation(numberOfTimes) {
	for (let i = 0; i < numberOfTimes; i++) {
		//this is where some random calculation would go, but looping is enough to simulate expensive operation
	}
}

// const Stopwatch = require('statman-stopwatch');
const Stopwatch = require('../lib/Stopwatch');

// example #1, initialize the sw, start it, do an expensive operation, read sw
console.log('new timer');
const sw1 = new Stopwatch('timer1');
sw1.prettyPrint();
console.log('start timer');
sw1.start();
sw1.prettyPrint();
console.log('do stuff');
expensiveOperation(1000000);
sw1.prettyPrint();
console.log('all done');
sw1.stop();
sw1.prettyPrint();
console.log('complete');