"use strict";
///<reference path="node.d.ts" />
var hooloovoo = require("hooloovoo");
var Ball = (function () {
    function Ball(colour, x, y) {
        this.x = x;
        this.y = y;
        this.xdirection = true;
        this.ydirection = true;
        this.colour = colour;
    }
    ;
    Ball.prototype.bounce = function () {
        // individual move logic goes here
        // checkbounds etc
        if (this.x == this.xbound)
            this.xdirection = false;
        if (this.x == 0)
            this.xdirection = true;
        if (this.y == this.ybound)
            this.ydirection = false;
        if (this.y == 0)
            this.ydirection = true;
        if (this.xdirection == false) {
            this.x--;
        }
        else {
            this.x++;
        }
        if (this.ydirection == false) {
            this.y--;
        }
        else {
            this.y++;
        }
        // console.log(this.x + " " + this.y);
        hooloovoo.set_pixel_hex(ledHelper.getPixelNumber(this.x, this.y), this.colour);
        //console.log("bounce this");
    };
    return Ball;
}());
exports.Ball = Ball;
var Worm = (function () {
    function Worm(x, y) {
        this.balls = [];
        this.balls.push(new Ball(ledHelper.red, 0 + x, 0 + y));
        this.balls.push(new Ball(ledHelper.orange, 1 + x, 1 + y));
        this.balls.push(new Ball(ledHelper.yellow, 2 + x, 2 + y));
        this.balls.push(new Ball(ledHelper.green, 3 + x, 3 + y));
        this.balls.push(new Ball(ledHelper.blue, 4 + x, 4 + y));
        this.balls.push(new Ball(ledHelper.purple, 5 + x, 5 + y));
        this.balls.push(new Ball(ledHelper.magenta, 6 + x, 6 + y));
    }
    Worm.prototype.wriggle = function () {
        this.balls.forEach(function (element) {
            element.bounce();
        }, this);
    };
    return Worm;
}());
exports.Worm = Worm;
// singleton helper class
var ledHelper = (function () {
    function ledHelper(ledcount) {
        ledHelper.led_count = ledcount;
        if (!ledHelper.ledhelper) {
            // intialise leds here?
            // used by other classes and by main script file
            hooloovoo.setup(ledHelper.led_count, 32); // assign number of APA102 LEDs, assign SPI clock 
            ledHelper.ledhelper = this;
        }
        return ledHelper.ledhelper;
    }
    ledHelper.clearPixels = function () {
        hooloovoo.clear();
    };
    // converts co-ords to a pixel number
    ledHelper.getPixelNumber = function (x, y) {
        if (y % 2 == 0) {
            return (y * this.max_col) + x;
        }
        else {
            return ((y + 1) * this.max_col) - (x + 1);
        }
    };
    ledHelper.rainbow = function () {
        hooloovoo.clear();
        this.linex(0, this.red);
        this.linex(1, this.orange);
        this.linex(2, this.yellow);
        this.linex(3, this.green);
        this.linex(4, this.blue);
        this.linex(5, this.purple);
        this.linex(6, this.magenta);
        this.linex(7, this.red);
        this.linex(8, this.orange);
        this.linex(9, this.yellow);
        this.linex(10, this.green);
        this.linex(11, this.blue);
    };
    ledHelper.liney = function (y, color) {
        var x = 0; // true block scoping you scoper
        for (x = 0; x < this.max_col; x++) {
            hooloovoo.set_pixel_hex(this.getPixelNumber(x, y), color);
        }
    };
    ledHelper.linex = function (x, color) {
        var y = 0;
        for (y = 0; y < this.max_row; y++) {
            hooloovoo.set_pixel_hex(this.getPixelNumber(x, y), color);
        }
    };
    ledHelper.red = 'FF0000';
    ledHelper.orange = 'FF7F00';
    ledHelper.yellow = 'FFFF00';
    ledHelper.green = '00FF00';
    ledHelper.blue = '0000FF';
    ledHelper.purple = '4B0082';
    ledHelper.magenta = '8F00FF';
    return ledHelper;
}());
exports.ledHelper = ledHelper;
