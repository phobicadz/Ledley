var hooloovoo = require('hooloovoo');
var led_count = 121;
var max_col = 12;
var max_row = 10;
var red = 'FF0000';var orange = 'FF7F00';var yellow = 'FFFF00';
var green = '00FF00';var blue = '0000FF';var purple = '4B0082';
var magenta = '8F00FF';
var timer;

// psuedo class a for a ball
function Ball(name) {
  this.name = name
}
// and prototype
Ball.prototype = {
  x:0, 
  y:0,
  xdirection:true,
  ydirection:true,
  xbound:0,
  ybound:0,
  debug:true,
  colour:"",
  bounce: function() {
    // individual move logic goes here
    // checkbounds etc
    if (this.x==this.xbound) this.xdirection=false;
    if (this.x==0) this.xdirection=true;
    if (this.y==this.ybound) this.ydirection=false;
    if (this.y==0) this.ydirection=true;
    if (this.xdirection == false) { this.x-- } else { this.x++ }
    if (this.ydirection == false) { this.y-- } else { this.y++ }  

    hooloovoo.set_pixel_hex(getPixelNumber(this.x,this.y),this.colour);
    if(this.debug) console.log(this.x + " " + this.y);
  }
};
// end psuedo class

// create ball object
var ball = new Ball('Benny');
ball.colour = blue;
ball.xbound = max_col-1;
ball.ybound = max_row-1;
ball.debug = true;

// connecting to Raspberry Pi  
hooloovoo.setup(led_count, 128); // assign number of APA102 LEDs, assign SPI clock 

timer = setInterval(function() {
  // main animation loop
  hooloovoo.clear();
  ball.bounce();

},50);

// after x Seconds kill the loop
setTimeout(function () {
  clearInterval(timer);
}, 12000);

// converts co-ords to a pixel number
function getPixelNumber(x,y) {
    if(y%2==0) { // even row
        return (y*max_col)+x;        
    }
    else { 
        return ((y+1)*max_col)-(x+1);
    }
}

function rainbow() {
  hooloovoo.clear();
  linex(0,red);linex(1,orange);
  linex(2,yellow);linex(3,green);
  linex(4,blue);linex(5,purple);
  linex(6,magenta);linex(7,red);
  linex(8,orange);linex(9,yellow);
  linex(10,green);linex(11,blue);
}  

function liney(y,color) {
    for(x=0;x<max_col;x++) {
        hooloovoo.set_pixel_hex(getPixelNumber(x,y),color);
      }
} 

function linex(x,color) {
  for(y=0;y<max_row;y++) {
    hooloovoo.set_pixel_hex(getPixelNumber(x,y),color);
  }
}

// Exit gracefully
process.on('SIGINT', function () {
  console.log("\nGracefully shutting down from (Ctrl-C)");
  // some other closing procedures go here
  hooloovoo.clear();
  process.exit();
})
