import Sprite from "../scripts/Sprite";

import Track from "../scripts/Track";
import { addUpdate } from "../scripts/mainLoop";

import testimg2 from "../scene1/img/scene1sheeeeeet2.png";

// const letters = new Sprite(testimg2, 4, 10);
// letters.Stop();

const startScorePanel = () => {
  // console.log("Hodor");
  const panel = new Sprite(testimg2, 40, 1);
  panel.registerAnimation("derp", 36, 2);
  panel.setAnimation("derp");

  document.addEventListener("mouseup",
      function(e) { location.reload(); } ); // sledgehammer restart, no state to keep, easier than full reinitialization

  /*const numbers = new Sprite(testimg2, 40, 1);
  numbers.registerAnimation("derp", 16, 10);
  numbers.setAnimation("derp");
  numbers.setSpeed(120);

  const letters = new Sprite(testimg2, 40, 1);
  letters.registerAnimation("derp", 28, 4);
  letters.setAnimation("derp");
  letters.setSpeed(120);*/
};
export default startScorePanel;

//need to tally up score and display results on scorepanel
//need to add a mouse or keypress event to exit scorepanel and return to splash