import Sprite from "../scripts/Sprite";
import lillypadSprite from "./img/lillypad.png";
import { addUpdate } from "../scripts/mainLoop";

export class Lillypad {
	
    spawnY;
    spr;
    spawnY;
    speed;
    
    constructor() {
        this.spr = new Sprite(lillypadSprite, 1, 1);
        this.spawnY = -24+Math.random()*48;
        this.speed = -Math.random()/2 -0.1;
        this.spr.x = -640 + Math.random()*1280;
        this.spr.y = this.spawnY;
        addUpdate(this.update);
    }

    update = () => {
		//this.speed -= 0.01; // move left faster amd faster
        this.spr.x += this.speed; // move
        this.spr.y = Math.round(this.spawnY + Math.cos(this.spr.x/20)*3); // wobble
        if (this.spr.x > 640) this.spr.x = -640; // wrap
        if (this.spr.x < -640) this.spr.x = 640; // wrap
	};

}

