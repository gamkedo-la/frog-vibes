import Sprite from "../scripts/Sprite";

import Track from "../scripts/Track";
import { addUpdate } from "../scripts/mainLoop";

import testimg2 from "../scene1/img/scene1sheeeeeet.png";

// const letters = new Sprite(testimg2, 4, 10);
// letters.Stop();

const startScorePanel = () => {
  console.log("Hodor");
  const panel = new Sprite(testimg2, 4, 10);
  panel.registerAnimation("derp", 36, 1);
  panel.setAnimation("derp");

  const numbers = new Sprite(testimg2, 4, 10);
  numbers.registerAnimation("derp", 16, 10);
  numbers.setAnimation("derp");
  numbers.setSpeed(120);

  const letters = new Sprite(testimg2, 4, 10);
  letters.registerAnimation("derp", 28, 4);
  letters.setAnimation("derp");
  letters.setSpeed(120);
};
export default startScorePanel;
