
function expensiveOperation(numberOfTimes) {
	for (let i = 0; i < numberOfTimes; i++) {
		//this is where some random calculation would go, but looping is enough to simulate expensive operation
	}
}

// const Stopwatch = require('statman-stopwatch');
const Stopwatch = require('../lib/Stopwatch');

console.log('starting sample project');

// example #1, initialize the sw, start it, do an expensive operation, read sw
const sw1 = new Stopwatch();
sw1.start();
console.log('starting first expensive operation');
expensiveOperation(1000000);
console.log('expensive operation time #1: ', sw1.read());

// example #2, initialize the sw with autostart, do an expensive operation, read sw
const sw2 = new Stopwatch(true);
console.log('starting second expensive operation');
expensiveOperation(1000000);
console.log('expensive operation time #2: ', sw2.read());

// example #3, initialize the sw with autostart, do an expensive operation, stop sw, read sw
const sw3 = new Stopwatch(true);
console.log('starting third expensive operation');
expensiveOperation(1000000);
sw3.stop();
console.log('expensive operation time #3: ', sw3.read());

// example #4, initialize the sw with autostart, do an expensive operation, stop sw
const sw4 = new Stopwatch(true);
console.log('starting fourth expensive operation');
expensiveOperation(1000000);
console.log('expensive operation time #4: ', sw4.stop());
