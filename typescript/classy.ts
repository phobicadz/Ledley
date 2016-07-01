

class Ball {
    xbound: number;
    ybound: number;
    colour: string;
    debug: boolean;
    x: number;
    y: number;
    xdirection:boolean;
    ydirection:boolean;

    constructor(){
        this.x=0;
        this.y=0;
        this.xdirection=true;
        this.ydirection=true;
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
        if (this.debug) console.log(this.x + " " + this.y);
    }  
}

export { Ball };

