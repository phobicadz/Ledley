"use strict";
var Ball = (function () {
    function Ball() {
        this.x = 0;
        this.y = 0;
        this.xdirection = true;
        this.ydirection = true;
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
        if (this.debug)
            console.log(this.x + " " + this.y);
    };
    return Ball;
}());
exports.Ball = Ball;
