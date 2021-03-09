import Sprite from "../scripts/Sprite";
import pollywogSprite from "./img/pollywog.png";

// a cute baby frog
// starts as an egg
// becomes a tadpole
// grows arms and legs
// jumps out of the water

export class Pollywog {
	
    age = 0;
	angle = 0;
	speed = 0;

    sprite = new Sprite(pollywogSprite, 2, 1);
	
    update = () => {
		age++;
		angle = Math.cos(age/1000)*2*Math.PI; // swim in a circle
		angle += Math.cos(age/33)*0.1; // and wobble back and forth
		speed = age * 0.1; // grow stronger over time
	};
	
}

