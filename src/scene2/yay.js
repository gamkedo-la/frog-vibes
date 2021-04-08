import Sprite from "../scripts/Sprite";
import yaySprite from "./img/yay.png";
import { addUpdate } from "../scripts/mainLoop";

const MS_PER_YAY = 500;
const MS_PER_HIDE = 2500;

export class Yay {
	
    spr;
    nextYay;
    nextHide;
    
    constructor() {
        this.spr = new Sprite(yaySprite, 1, 11, 0.3);
        this.spr.x = -9999;
        this.spr.y = -9999;
        this.nextYay = performance.now() + MS_PER_HIDE;
        this.nextHide = 0;
        addUpdate(this.update);
    }

    update = () => {
		
        // sadly this does not synch up perfectly to the sprite anim framerate...
        // it's one frame ahead or behind or something
        let now = performance.now();
        if (now >= this.nextHide) {
            this.spr.x = -9999;
            this.spr.y = -9999;
        }
        if (now >= this.nextYay) {
            this.nextYay = now + MS_PER_YAY + MS_PER_HIDE;
            this.nextHide = now + MS_PER_YAY;
            this.spr.x = Math.round(Math.random()*(320-80));
            this.spr.y = Math.round(Math.random()*(100));//(180-16));
        }

	};
}
