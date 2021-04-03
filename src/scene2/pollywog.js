import Sprite from "../scripts/Sprite";
import pollywogSprite from "./img/pollywog.png";
import { addUpdate } from "../scripts/mainLoop";

// a cute baby frog
// starts as an egg
// becomes a tadpole
// grows arms and legs
// jumps out of the water

export class Pollywog {
	
    age;
	angle;
    spawnY;
    spr;
    spawnY;
    speed;
    accel;
    
    constructor() {
        this.spr = new Sprite(pollywogSprite, 2, 1);
        this.accel = 0.01; // per frame
        this.spawnY = 20+Math.random()*100;
        this.speed = Math.random() / 2; // start slowish
        this.spr.x = -200 + Math.random()*-200;
        this.spr.y = this.spawnY;
        addUpdate(this.update);
    }

    update = () => {
		this.age++;
		this.angle = Math.cos(this.age/1000)*2*Math.PI; // swim in a circle
		this.angle += Math.cos(this.age/33)*0.1; // and wobble back and forth
		this.speed += this.accel; // grow stronger over time
        this.spr.x += this.speed; // move
        this.spr.y = this.spawnY + Math.cos(this.spr.x/20)*8; // wobble
        if (this.spr.x > 320) this.spr.x = -200; // wrap
        //console.log('pollywog moves to ' + this.spr.x + ',' + this.spr.y);
	};

    


}

