import Sprite from "../scripts/Sprite";
import yaySprite from "./img/yay.png";
import { addUpdate } from "../scripts/mainLoop";

const MS_PER_YAY = 1000;

export class Yay {
	
    spr;
    nextYay;
    
    constructor() {
        this.spr = new Sprite(yaySprite, 1, 11, MS_PER_YAY/1000);
        this.nextYay = 0;
        addUpdate(this.update);
    }

    update = () => {
		
        // sadly this does not synch up perfectly to the sprite anim framerate...
        // it's one frame ahead or behind or something
        let now = performance.now();
        if (now >= this.nextYay) {
            this.nextYay = now + MS_PER_YAY;
            this.spr.x = Math.round(Math.random()*(320-80));
            this.spr.y = Math.round(Math.random()*(180-16));
        }

	};
}
