import Sprite from "../scripts/Sprite";
import testimg from "./img/testframe.jpg";
import testimg2 from "./img/Sprite-0001.png";
import Track from "../scripts/Track";
import graphics from "../scripts/graphicscommon";
console.log(testimg);
var track = new Track("public/audio/track1.wav", [10, 12, 14, 16]);
var img = new Image();
img.src = testimg2;
graphics.drawEvent(() => { 
    
    graphics.drawImage(img, 0, 0);
}); 
export const Start = () => { track.Start(); };
export const IsHit = () => {track.IsHit();};
export default testimg;