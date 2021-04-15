import Sprite from "../scripts/Sprite";
import testimg from "./img/testframe.png";

import Track from "../scripts/Track";
console.log(testimg);
var track = new Track("public/Audio/track1.wav", [10, 12, 14, 16]);


export const Start = () => {
    track.Start();
    spriteThing.drawFrame = true;
};
export const IsHit = () => {track.IsHit();};
export default testimg;

import testimg2 from "./img/Sprite-0001.png";
const spriteThing = new Sprite(testimg2, 1, 1);
spriteThing.Stop();

export const IsPaused = () => {
    track.Stop();
};

export const IsUnPaused = () => {
    track.Continue();
};
