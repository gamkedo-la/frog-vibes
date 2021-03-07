import Sprite from "../scripts/Sprite";
import testimg from "./img/testframe.jpg";

import Track from "../scripts/Track";

//AUDIO
var track = new Track("public/audio/track1.wav", [10, 12, 14, 16]);

//SPRITE
import testimg2 from "./img/Sprite-0001.png";
const spriteThing = new Sprite(testimg2, 2, 1);
spriteThing.stop();

// LESGOOOO
export const Start = () => {
    track.Start(); 
    spriteThing.reset();
    
    
};
export const IsHit = () => {track.IsHit();};
export default testimg;

