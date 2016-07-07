///<reference path="node.d.ts" />
var Ball = (function () {
    function Ball(colour, x, y) {
        this.velocity = new Vector(0.1, -0.4);
        this.x = x;
        this.y = y;
        this.xbound = ledHelper.max_col - 1;
        this.ybound = ledHelper.max_row - 1;
        this.xdirection = true;
        this.ydirection = true;
        this.colour = colour;
        this.position = new Point(x, y);
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
        ledHelper.leds.set_pixel_hex(ledHelper.getPixelNumber(this.x, this.y), this.colour);
    };
    Ball.prototype.gravityBounce = function () {
        this.velocity = this.velocity.add(ledHelper.GRAVITY.scale(0.1));
        // collision detection against world
        if (this.position.y > ledHelper.max_row - 1) {
            this.velocity.x2 = -this.velocity.x2 * ledHelper.FRICTION;
            this.position.y = ledHelper.max_row - 1;
        }
        else if (this.position.y < ledHelper.min_row) {
            this.velocity.x2 = -this.velocity.x2 * ledHelper.FRICTION;
            this.position.y = ledHelper.min_row;
        }
        if (this.position.x < ledHelper.min_col) {
            this.velocity.x1 = -this.velocity.x1 * ledHelper.FRICTION;
            this.position.x = ledHelper.min_col;
        }
        else {
            if (this.position.x > ledHelper.max_col - 1) {
                this.velocity.x1 = -this.velocity.x1 * ledHelper.FRICTION;
                this.position.x = ledHelper.max_col - 1;
            }
        }
        // update position
        this.position.x += this.velocity.x1;
        this.position.y += this.velocity.x2;
        console.log(Math.round(this.position.x), Math.round(this.position.y));
        ledHelper.leds.set_pixel_hex(ledHelper.getPixelNumber(Math.round(this.position.x), Math.round(this.position.y)), this.colour);
    };
    return Ball;
})();
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
})();
exports.Worm = Worm;
var Vector = (function () {
    function Vector(x1, x2) {
        this.x1 = x1;
        this.x2 = x2;
    }
    Vector.prototype.add = function (other) {
        return new Vector(this.x1 + other.x1, this.x2 + other.x2);
    };
    Vector.prototype.scale = function (by) {
        return new Vector(this.x1 * by, this.x2 * by);
    };
    Vector.prototype.normalize = function () {
        function norm(value) {
            return value > 0 ? 1 : value < 0 ? -1 : 0;
        }
        return new Vector(norm(this.x1), norm(this.x2));
    };
    return Vector;
})();
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.relative = function (to) {
        return new Vector(to.x - this.x, to.y - this.y);
    };
    Point.prototype.distance = function (to) {
        return Math.sqrt(Math.pow(this.x - to.x, 2) + Math.pow(this.y - to.y, 2));
    };
    return Point;
})();
// singleton static helper/wrapper class
var ledHelper = (function () {
    function ledHelper(ledcount, maxcol, maxrow) {
        ledHelper.led_count = ledcount;
        ledHelper.leds = require("hooloovoo");
        ledHelper.max_col = maxcol;
        ledHelper.max_row = maxrow;
        if (!ledHelper.ledhelper) {
            ledHelper.leds.setup(ledHelper.led_count, 32); // assign number of APA102 LEDs, assign SPI clock 
            ledHelper.ledhelper = this;
        }
        return ledHelper.ledhelper;
    }
    ledHelper.setPixel = function (lednumber) {
        ledHelper.leds.set_pixel_hex(lednumber, 'FFFFFF');
    };
    ledHelper.clearPixels = function () {
        ledHelper.leds.clear();
    };
    // converts co-ords to a pixel number
    ledHelper.getPixelNumber = function (x, y) {
        if (y % 2 == 0) {
            return (y * ledHelper.max_col) + x;
        }
        else {
            return ((y + 1) * ledHelper.max_col) - (x + 1);
        }
    };
    ledHelper.rainbow = function () {
        ledHelper.leds.clear();
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
            ledHelper.leds.set_pixel_hex(this.getPixelNumber(x, y), color);
        }
    };
    ledHelper.linex = function (x, color) {
        var y = 0;
        for (y = 0; y < this.max_row; y++) {
            ledHelper.leds.set_pixel_hex(this.getPixelNumber(x, y), color);
        }
    };
    ledHelper.red = 'FF0000';
    ledHelper.orange = 'FF7F00';
    ledHelper.yellow = 'FFFF00';
    ledHelper.green = '00FF00';
    ledHelper.blue = '0000FF';
    ledHelper.purple = '4B0082';
    ledHelper.magenta = '8F00FF';
    ledHelper.min_col = 0;
    ledHelper.min_row = 0;
    ledHelper.GRAVITY = new Vector(0, 9.81);
    ledHelper.FRICTION = 0.85;
    return ledHelper;
})();
exports.ledHelper = ledHelper;
