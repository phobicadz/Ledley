///<reference path="classy.ts" />
///<reference path="node.d.ts" />
var leds = require("./classy.js");
var timer;
var helper = new leds.ledHelper(120);
var worm = new leds.Worm(0,0);
var worm2 = new leds.Worm(3,0);
var worm3 = new leds.Worm(5,3);
var worm4 = new leds.Worm(1,3);

console.log("Running Ledley....");

timer = setInterval(function() {
  // main animation loop
  helper.clearPixels();
  worm.wriggle();
  worm2.wriggle();
  worm3.wriggle();
  worm4.wriggle();
  console.log("Wriggle");
},10);

// after x Seconds kill the loop
setTimeout(function () {
  clearInterval(timer);
  helper.clearPixels();
  console.log("Finished Ledley....");
}, 12000);

// Exit gracefully
process.on('SIGINT', function () {
  console.log("\nGracefully shutting down from (Ctrl-C)");
  // some other closing procedures go here
  helper.clearPixels();
  process.exit();
})