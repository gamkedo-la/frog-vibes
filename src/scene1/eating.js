import Sprite from "../scripts/Sprite";
import testimg from "./img/testframe.jpg";
import Track from "../scripts/Track";
console.log(testimg);
var track = new Track("public/audio/track1.wav", [10, 12, 14, 16]);
export const Start = () => { track.Start(); };
export const IsHit = () => {track.IsHit();};
export default testimg;