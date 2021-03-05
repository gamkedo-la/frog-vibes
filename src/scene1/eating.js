import Sprite from "../scripts/Sprite";
import testimg from "./img/testframe.jpg";

import Track from "../scripts/Track";
import graphics, { addDraw }from "../scripts/graphicscommon";
console.log(testimg);
var track = new Track("public/audio/track1.wav", [10, 12, 14, 16]);


export const Start = () => { track.Start(); };
export const IsHit = () => {track.IsHit();};
export default testimg;

import testimg2 from "./img/Sprite-0001.png";
new Sprite(testimg2, 2, 1);

