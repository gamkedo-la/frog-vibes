import Sprite from "../scripts/Sprite";

// a cute baby frog
// starts as an egg
// becomes a tadpole
// grows arms and legs
// jumps out of the water

export class Pollywog {
	
    age = 0;
	angle = 0;
	speed = 0;
    sprite = new Sprite();
	
    update = () => {
		age++;
		angle = Math.cos(age/100);
		speed = age * 0.1;
	};
	
}