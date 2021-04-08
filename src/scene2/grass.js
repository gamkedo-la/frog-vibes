import Sprite from "../scripts/Sprite";
import grassSprite from "./img/grass.png";
import { addUpdate } from "../scripts/mainLoop";

export class Grass {
	
    spawnY;
    spr;
    spawnY;
    speed;
    
    constructor() {
        this.spr = new Sprite(grassSprite, 1, 1);
        this.spawnY = 50+Math.random()*100;
        this.speed = -Math.random()/2-0.1;
        this.spr.x = -640 + Math.random()*1280;
        this.spr.y = this.spawnY;
        addUpdate(this.update);
    }

    update = () => {
		//this.speed -= 0.01; // accel
        this.spr.x += this.speed; // move
        //this.spr.y = Math.round(this.spawnY + Math.cos(this.spr.x/20)*0); // wobble
        if (this.spr.x > 640) this.spr.x = -640; // wrap
        if (this.spr.x < -640) this.spr.x = 640; // wrap
	};
}
