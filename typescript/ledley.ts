///<reference path="node.d.ts" />
import { ledHelper, Worm } from "./classy";
let helper = new ledHelper(120,12,10); // initialise the static class with correct led number
var worm = new Worm(0,0);
var worm2 = new Worm(3,0);
var worm3 = new Worm(5,3);
var worm4 = new Worm(1,3);
var timer;

console.log("Running Ledley....");

timer = setInterval(function() {
  // main animation loop
  ledHelper.clearPixels();
  worm.wriggle();
 // worm2.wriggle();
 // worm3.wriggle();
 worm4.wriggle();
},16);

// after x Seconds kill the loop
setTimeout(function () {
  clearInterval(timer);
  ledHelper.rainbow();

  console.log("Finished Ledley....");
}, 12000);

// Exit gracefully
process.on('SIGINT', function () {
  console.log("\nGracefully shutting down from (Ctrl-C)");
  // some other closing procedures go here
  ledHelper.clearPixels();
  process.exit();
})