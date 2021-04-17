import Sprite from "../scripts/Sprite";
import Track from "../scripts/Track";
import { Pollywog } from "./pollywog";
import { Lillypad } from "./lillypad";
import { Grass } from "./grass";
import { Water } from "./water";
import { Pond } from "./pond";
import { Yay } from "./yay";

import startScorePanel from "../scorePanel/scorepanel.js";

const debugme = false;

var DEBUG_INSTANT_END_ROUND_TADPOLE = false;
if(DEBUG_INSTANT_END_ROUND_TADPOLE) {
  console.log("WARNING: DEBUG_INSTANT_END_ROUND_TADPOLE is TRUE in tadpoles.js");
}

var tadpoleRoundSummaryDelay = 50; // previously 2000, seemed awkwardly long

let track = new Track("public/Audio/pollywogsong.wav", [10, 12, 14, 16, 26, 28, 30, 32, 43, 45, 47, 49],"public/Audio/scene01/ohno.wav");
let everyone = [];

export const Start = () => { 

	if (debugme) console.log("starting pollywog scene!");
	
    if(DEBUG_INSTANT_END_ROUND_TADPOLE) {
      track.Events.emit("Ended", { detail: "bwaap bwaaaaaa" });
    } else {
      track.Start();
    }
	
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
    // console.log("HIT #" + totalhits);
    totalhits += 1;
    // everyone gets a HuGE speed boost!
    for (let n=0; n<everyone.length; n++) {
        everyone[n].speed += Math.random() * 4.0;
    }    
});

// off beat - fail
track.Events.on("Miss", e => {  
    // console.log("MISS!");
    // everyone gets a SMALL speed boost ANYWAYS!!!! LOLOLOL
    for (let n=0; n<everyone.length; n++) {
        everyone[n].speed += Math.random() * 1.0;
    }       
});

//ending
track.Events.on("Ended", (e) => {
    // console.log("track has ended!");
    if (totalhits == 0) {
        // console.log("You missed every beat!");
        if (track.missSfx) track.missSfx.play();
    } else {
        // console.log("You did great!");
    }

    setTimeout(() => { startScorePanel();}, tadpoleRoundSummaryDelay);
});
