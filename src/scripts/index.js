import "../styles/index.scss";

import {Start as StartScene1, IsHit as IsHitScene1} from "../scene1";
import {Start as StartScene2, IsHit as IsHitScene2} from "../scene2";
/*import {Start as StartScene3, IsHit as IsHitScene3} from "../scene3";
import {Start as StartScene4, IsHit as IsHitScene4} from "../scene4";
import {Start as StartScene5, IsHit as IsHitScene5} from "../scene5";
import {Start as StartScene6, IsHit as IsHitScene6} from "../scene6";*/

import graphics from "./graphicscommon";
import { Start as StartMainLoop } from "./mainLoop";
import { ToggleCredits as SwitchCredits } from "./mainLoop";
import Track from "./Track";
import pauseMenu from "./pauseMenu";
import Sprite from "./Sprite";

var hasStarted = false;
var inScene = false;
var showCredits = false;

export var currentSceneNumber = 1;

var scenes = [
  {},
  {start:StartScene1,hit:IsHitScene1},
  {start:StartScene2,hit:IsHitScene2},
  /*{start:StartScene3,hit:IsHitScene3},
  {start:StartScene4,hit:IsHitScene4},
  {start:StartScene5,hit:IsHitScene5},
  {start:StartScene6,hit:IsHitScene6}*/
];

if (process.env.NODE_ENV === "development") {
  require("../index.html");
}
// graphics.colorRect(0, 30, 30, 30, "red");

pauseMenu.init();
import splashImg from "../splash.png";
const splashScreen = new Sprite(splashImg, 1, 1);
StartMainLoop();

function levelStartForKey(keyCode) {
  if(keyCode == 49 || keyCode == 97) { // 1 in alpha row or numpad
    return 1;
  }
  if(keyCode == 50 || keyCode == 98) {  // 2 in alpha row or numpad
    return 2;
  }
  return -1;
}

document.onkeydown = function (e) {
  // console.log('keydown:'+e.keyCode);
  
  if(showCredits) {
    showCredits = false;
    SwitchCredits();
    return;
  }

  if (!hasStarted) {
    if (e.keyCode == 67) { // key 'C' to toggle credits
        showCredits = true;
        SwitchCredits();
        return;
    } else if (levelStartForKey(e.keyCode) < 0) {
      return; // ignore, invalid input
    }
    console.log("Stopping Splash");
    hasStarted = true;    
    splashScreen.Stop();
  }

  if (hasStarted && inScene) {
    if (e.keyCode == 77) { // key 'M' to toggle mute on all tracks
      if (Track.ToggleMuteAll()) {
        console.log("All tracks muted!");
      }
      else {
        console.log("All tracks unmuted!");
      }
    }
    if (e.keyCode == 40) {
      console.log("Debug Skip!!");
      Track.DebugSkip();
    }
  }

  if (!inScene) {
    var startLevel = levelStartForKey(e.keyCode);
    if (startLevel >= 0) { // pressed 1 or 2?
      currentSceneNumber = startLevel;
    } else {
      return; // ignore, invalid input
    }

    console.log("Starting Scene " + currentSceneNumber);

    scenes[currentSceneNumber].start();
    pauseMenu.enable();

    inScene = true;
    return;

  }

  if(e.keyCode == 32) { // SPACE, gameplay input
    scenes[currentSceneNumber].hit();
  }
  
  // bit brutal last minute fix, but other preventDefault location wasn't picking up,
  // causing game to scroll on itch when spacebar was pressed, so, catching all for now
  e.preventDefault();
};
