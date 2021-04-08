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
let everyone = [];

export const Start = () => { 

	if (debugme) console.log("starting pollywog scene!");
	
	track.Start(); // music
	
    let pond = new Pond(); // bg
    
    let yay = new Yay(); // text messages

    // these don't look all that great - removed
    //for (let n=0; n<16; n++) {
    //    let splash = new Water();
    //}

	for (let n=0; n<16; n++) {
        let tad = new Pollywog();
        everyone.push(tad);
    }
	
	for (let n=0; n<16; n++) {
        let pad = new Lillypad();
    }

	for (let n=0; n<20; n++) {
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

var totalhits = 0;
// good timing - success
track.Events.on("Hit", e => {
    console.log("HIT #" + totalhits);
    totalhits += 1;
    // everyone gets a speed boost!
    for (let n=0; n<everyone.length; n++) {
        everyone[n].speed += Math.random() * 0.1;
    }    
});

// off beat - fail
track.Events.on("Miss", e => {  
    console.log("MISS!");
});

//ending
track.Events.on("Ended", (e) => {
    console.log("track has eneded!");
});
