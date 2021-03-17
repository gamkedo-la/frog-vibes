import Sprite from "../scripts/Sprite";
import waterSprite from "./img/water.png";
import { addUpdate } from "../scripts/mainLoop";

export class Water {
	
    spawnY;
    spr;
    spawnY;
    speed;
    
    constructor() {
        this.spr = new Sprite(waterSprite, 1, 1);
        this.spawnY = -32+Math.random()*128;
        this.speed = -Math.random();
        this.spr.x = -640 + Math.random()*1280;
        this.spr.y = this.spawnY;
        addUpdate(this.update);
    }

    update = () => {
		this.speed -= 0.01; // grow stronger over time
        this.spr.x += this.speed; // move
        this.spr.y = this.spawnY + Math.cos(this.spr.x/40)*4; // wobble
        if (this.spr.x > 640) this.spr.x = -640; // wrap
        if (this.spr.x < -640) this.spr.x = 640; // wrap
	};
}
