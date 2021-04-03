import Sprite from "../scripts/Sprite";
import Track from "../scripts/Track";
import { Pollywog } from "./pollywog";
import { Lillypad } from "./lillypad";
import { Grass } from "./grass";
import { Water } from "./water";
import { Pond } from "./pond";
import { Yay } from "./yay";

const debugme = true;

let track = new Track("public/audio/pollywogsong.wav", [2, 4, 6, 8, 10, 12, 14, 16]);

export const Start = () => { 

	if (debugme) console.log("starting pollywog scene!");
	
	track.Start(); // music
	
    let pond = new Pond(); // bg
    
    let yay = new Yay(); // text messages

    for (let n=0; n<10; n++) {
        let splash = new Water();
    }

	for (let n=0; n<16; n++) {
        let tad = new Pollywog();
    }
	
	for (let n=0; n<6; n++) {
        let pad = new Lillypad();
    }

	for (let n=0; n<6; n++) {
        let sprig = new Grass();
    }
};

export const IsHit = () => { 
	track.IsHit(); 
};

export const IsPaused = () => {
    track.Stop();
  };
  
  export const IsUnPaused = () => {
    track.Continue();
  };
