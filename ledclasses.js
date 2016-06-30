var ledclasses = function (hooloovoo) {
var self = this;

self.max_col = 12;
self.max_row = 10;
self.red = 'FF0000';self.orange = 'FF7F00';self.yellow = 'FFFF00';
self.green = '00FF00';self.blue = '0000FF';self.purple = '4B0082';
self.magenta = '8F00FF';

// psuedo classes -----------------------------------
self.Ball = function(colour,debug,x,y) {
  this.xbound = self.max_col-1;
  this.ybound = self.max_row-1;
  this.colour = colour;
  this.debug = debug;
  this.x = x;
  this.y = y;
}
// and prototype
self.Ball.prototype = {
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

self.Worm = function(x,y,colour) {
  this.balls = [];
  this.balls.push(new self.Ball(self.red,false,0+x,0+y));
  this.balls.push(new self.Ball(self.orange,false,1+x,1+y));
  this.balls.push(new self.Ball(self.yellow,false,2+x,2+y));
  this.balls.push(new self.Ball(self.green,false,3+x,3+y));
  this.balls.push(new self.Ball(self.blue,false,4+x,4+y));
  this.balls.push(new self.Ball(self.purple,false,5+x,5+y));
  this.balls.push(new self.Ball(self.magenta,false,6+x,6+y));
  this.colour = colour;
}

self.Worm.prototype = {
    balls:[],
    colour: "",
    wriggle: function() {
        this.balls.forEach(function(element) {
        element.bounce();
    }, this);
  }
}

// converts co-ords to a pixel number
function getPixelNumber(x,y) {
    if(y%2==0) { // even row
        return (y*self.max_col)+x;        
    }
    else { 
        return ((y+1)*self.max_col)-(x+1);
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

};

module.exports = ledclasses;