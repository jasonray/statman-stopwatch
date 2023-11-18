```
function expensiveOperation(numberOfTimes) {
	for (let i = 0; i < numberOfTimes; i++) {
		//this is where some random calculation would go, but looping is enough to simulate expensive operation
	}
}

const Stopwatch = require("../lib/Stopwatch");

console.log("starting sample project");

// example #1, initialize the sw, start it, do an expensive operation, read sw
const sw1 = new Stopwatch();
sw1.start();
console.log("starting first expensive operation");
expensiveOperation(1000000);
console.log("expensive operation time #1: ", sw1.read());

// example #2, initialize the sw with autostart, do an expensive operation, read sw
const sw2 = new Stopwatch(true);
console.log("starting second expensive operation");
expensiveOperation(1000000);
console.log("expensive operation time #2: ", sw2.read());

// example #3, initialize the sw with autostart, do an expensive operation, stop sw, read sw
const sw3 = new Stopwatch(true);
console.log("starting third expensive operation");
expensiveOperation(1000000);
sw3.stop();
console.log("expensive operation time #3: ", sw3.read());

// example #4, initialize the sw with autostart, do an expensive operation, stop sw
const sw4 = new Stopwatch(true);
console.log("starting fourth expensive operation");
expensiveOperation(1000000);
console.log("expensive operation time #4: ", sw4.stop());

// example #5, use prettyPrint
console.log("begin example of prettyPrint scenario");
const sw5 = new Stopwatch("pretty-print-example");
sw5.prettyPrint();
console.log("start timer");
sw5.start();
sw5.prettyPrint();
console.log("do stuff");
expensiveOperation(1000000);
sw5.prettyPrint();
console.log("all done");
sw5.stop();
sw5.prettyPrint();
console.log("complete");

// example #6, suspend/resume
console.log("begin suspend / resume example");
const sw6 = new Stopwatch("suspend/resume-timer-example");
const sw7 = new Stopwatch("total-time-example");
console.log("start timer");
sw6.start();
sw7.start();
console.log("do stuff");
expensiveOperation(1000000);
sw6.suspend();
console.log("doing some stuff that I don't want to include in my timings");
expensiveOperation(2000000);
sw6.resume();
console.log("do more stuff");
expensiveOperation(1000000);
console.log("all done");
sw6.stop();
sw7.stop();
console.log("complete");
console.log("time #6: ", sw6.read());
console.log("time #7: ", sw7.read());
sw6.prettyPrint();
```