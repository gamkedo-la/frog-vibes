import Sprite from "../scripts/Sprite";
import Track from "../scripts/Track";
import { Pollywog } from "./pollywog";

const debugme = true;

let track = new Track("public/audio/pollywogsong.wav", [2, 4, 6, 8, 10, 12, 14, 16]);

export const Start = () => { 

	if (debugme) console.log("starting pollywog scene!");
	
	track.Start();
	
	let test = new Pollywog();
	
};

export const IsHit = () => { 
	track.IsHit(); 
};


