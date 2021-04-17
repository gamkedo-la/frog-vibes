import "../styles/index.scss";

import {Start as StartScene1, IsHit as IsHitScene1, Stop as StopScene1} from "../scene1";
import {Start as StartScene2, IsHit as IsHitScene2, Stop as StopScene2} from "../scene2";

import graphics from "./graphicscommon";
import { Start as StartMainLoop } from "./mainLoop";
import { ToggleCredits as SwitchCredits } from "./mainLoop";
import Track from "./Track";
import pauseMenu from "./pauseMenu";
import Sprite from "./Sprite";

const KEY_SPACE = 32;
const KEY_DOWNARROW = 40;
const KEY_C = 67;
const KEY_M = 77;
const KEY_1_ROW = 49;
const KEY_1_PAD = 97;
const KEY_2_ROW = 50;
const KEY_2_PAD = 98;

var hasStarted = false;
var inScene = false;
var showCredits = false;

export var currentSceneNumber = 1;

var scenes = [
  {},
  {start:StartScene1,hit:IsHitScene1,stop:StopScene1},
  {start:StartScene2,hit:IsHitScene2,stop:StopScene2},
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
  if(keyCode == KEY_1_ROW || keyCode == KEY_1_PAD) {
    return 1;
  }
  if(keyCode == KEY_2_ROW || keyCode == KEY_2_PAD) {
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

  var startLevel = levelStartForKey(e.keyCode);

  if (!hasStarted) {
    if (e.keyCode == KEY_C) {
        showCredits = true;
        SwitchCredits();
        return;
    } else if (startLevel < 0) {
      return; // ignore, invalid input
    }
    hasStarted = true;    
    splashScreen.Stop();
  }

  if (hasStarted && inScene) {
    if (e.keyCode == KEY_M) {
      if (Track.ToggleMuteAll()) {
        console.log("All tracks muted!");
      }
      else {
        console.log("All tracks unmuted!");
      }
    }
    if (e.keyCode == KEY_DOWNARROW) {
      console.log("Debug Skip!!");
      Track.DebugSkip();
    }
  }

  if (!inScene) {
    if (startLevel >= 0) {
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

  if(e.keyCode == KEY_SPACE) { // SPACE, gameplay input
    scenes[currentSceneNumber].hit();
  }
  
  // bit brutal last minute fix, but other preventDefault location wasn't picking up,
  // causing game to scroll on itch when spacebar was pressed, so, catching all for now
  e.preventDefault();
};
