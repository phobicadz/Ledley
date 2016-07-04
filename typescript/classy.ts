///<reference path="node.d.ts" />
var hooloovoo = require("hooloovoo");
class Ball {  
    xbound: number;
    ybound: number;
    colour: string;
    debug: boolean;
    x: number;
    y: number;
    xdirection:boolean;
    ydirection:boolean;

    constructor(colour,x,y){
        this.x=x;
        this.y=y;
        this.xdirection=true;
        this.ydirection=true;
        this.colour = colour;
    };

    bounce() {
        // individual move logic goes here
        // checkbounds etc
        if (this.x==this.xbound) this.xdirection=false;
        if (this.x==0) this.xdirection=true;
        if (this.y==this.ybound) this.ydirection=false;
        if (this.y==0) this.ydirection=true;
        if (this.xdirection == false) { this.x-- } else { this.x++ }
        if (this.ydirection == false) { this.y-- } else { this.y++ }  
        // console.log(this.x + " " + this.y);

        hooloovoo.set_pixel_hex(ledHelper.getPixelNumber(this.x,this.y),this.colour);
        //console.log("bounce this");
    }  
}

class Worm {

    balls: Ball[];

    constructor(x,y){
        this.balls = [];
        this.balls.push(new Ball(ledHelper.red,0+x,0+y));
        this.balls.push(new Ball(ledHelper.orange,1+x,1+y));
        this.balls.push(new Ball(ledHelper.yellow,2+x,2+y));
        this.balls.push(new Ball(ledHelper.green,3+x,3+y));
        this.balls.push(new Ball(ledHelper.blue,4+x,4+y));
        this.balls.push(new Ball(ledHelper.purple,5+x,5+y));
        this.balls.push(new Ball(ledHelper.magenta,6+x,6+y));
    }

    wriggle() {
          this.balls.forEach(function(element) {
            element.bounce();
        }, this);
    }
}

// singleton helper class
class ledHelper {

    private static ledhelper: ledHelper;
    
    constructor(ledcount) {
        ledHelper.led_count = ledcount;

        if(!ledHelper.ledhelper) {
            // intialise leds here?
            // used by other classes and by main script file
            hooloovoo.setup(ledHelper.led_count,32); // assign number of APA102 LEDs, assign SPI clock 
            ledHelper.ledhelper = this;
        }    
        return ledHelper.ledhelper;
    }

    static red = 'FF0000';
    static orange = 'FF7F00';
    static yellow = 'FFFF00';
    static green = '00FF00';
    static blue = '0000FF';
    static purple = '4B0082';
    static magenta = '8F00FF';
    static max_col:number;
    static max_row:number;
    static led_count:number;

    clearPixels() {
        hooloovoo.clear();
    }

    // converts co-ords to a pixel number
    static getPixelNumber(x,y) {
        if(y%2==0) { // even row
            return (y*this.max_col)+x;        
        }
        else { 
            return ((y+1)*this.max_col)-(x+1);
        }
    }

    static rainbow() {
        hooloovoo.clear();
        this.linex(0,this.red);this.linex(1,this.orange);
        this.linex(2,this.yellow);this.linex(3,this.green);
        this.linex(4,this.blue);this.linex(5,this.purple);
        this.linex(6,this.magenta);this.linex(7,this.red);
        this.linex(8,this.orange);this.linex(9,this.yellow);
        this.linex(10,this.green);this.linex(11,this.blue);
    }  

	static liney(y,color) {
        let x = 0; // true block scoping you scoper
        for(x=0;x<this.max_col;x++) {
            hooloovoo.set_pixel_hex(this.getPixelNumber(x,y),color);
        }
    } 

    static linex(x,color) {
        let y = 0;
        for(y=0;y<this.max_row;y++) {
            hooloovoo.set_pixel_hex(this.getPixelNumber(x,y),color);
        }
    }
}

export { Ball, Worm, ledHelper};


