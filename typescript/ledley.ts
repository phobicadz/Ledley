///<reference path="classy.ts" />
///<reference path="node.d.ts" />
var hooloovoo = require("hooloovoo");
var leds = require("./classy.js");
var led_count = 121;
var timer;

// connecting to Raspberry Pi  
hooloovoo.setup(led_count,32); // assign number of APA102 LEDs, assign SPI clock 

var worm = new leds.Worm(0,0,"suck");
var worm2 = new leds.Worm(3,0,"my");
var worm3 = new leds.Worm(5,3,"balls");
var worm4 = new leds.Worm(1,3,"balls");

timer = setInterval(function() {
  // main animation loop
 hooloovoo.clear();
  worm.wriggle();
  worm2.wriggle();
  worm3.wriggle();
  worm4.wriggle();
},10);

// after x Seconds kill the loop
setTimeout(function () {
  clearInterval(timer);
  hooloovoo.clear();
}, 12000);

// Exit gracefully
process.on('SIGINT', function () {
  console.log("\nGracefully shutting down from (Ctrl-C)");
  // some other closing procedures go here
  hooloovoo.clear();
  process.exit();
})