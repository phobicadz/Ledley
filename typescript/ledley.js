"use strict";
///<reference path="node.d.ts" />
var classy_1 = require("./classy");
var helper = new classy_1.ledHelper(120); // initialise the static class with correct led number
var worm = new classy_1.Worm(0, 0);
var worm2 = new classy_1.Worm(3, 0);
var worm3 = new classy_1.Worm(5, 3);
var worm4 = new classy_1.Worm(1, 3);
var timer;
console.log("Running Ledley....");
timer = setInterval(function () {
    // main animation loop
    classy_1.ledHelper.clearPixels();
    worm.wriggle();
    worm2.wriggle();
    worm3.wriggle();
    worm4.wriggle();
}, 20);
// after x Seconds kill the loop
setTimeout(function () {
    clearInterval(timer);
    classy_1.ledHelper.rainbow();
    console.log("Finished Ledley....");
}, 12000);
// Exit gracefully
process.on('SIGINT', function () {
    console.log("\nGracefully shutting down from (Ctrl-C)");
    // some other closing procedures go here
    classy_1.ledHelper.clearPixels();
    process.exit();
});
