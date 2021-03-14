import Sprite from "../scripts/Sprite";

import Track from "../scripts/Track";
import { addUpdate} from "../scripts/mainLoop";

//AUDIO
var track = new Track("public/audio/track1.wav", [10, 12, 14, 16]);
var timePerFrame = 416.66;
//SPRITE
import testimg2 from "./img/frog.png";
const spriteThing = new Sprite(testimg2, 2, 1);
spriteThing.Stop();

import fly from "./img/fly.png";
const flySprite = new Sprite(fly, 1, 1);
track.Events.on("Hit", (e) => {
    if (e.detail == 10) {
        flySprite.Stop();
} });
flySprite.Stop();

// LESGOOOO
export const Start = () => {
    track.Start(); 
    spriteThing.reset();
    flySprite.reset();
    flySprite.x = 10 * 20;    
    addUpdate((e) => {
        //needs to move 20 per second
        flySprite.x -= (e.detail / timePerFrame) * 20;
        console.log(e.detail);
    });
};

export const IsHit = () => {track.IsHit();};

