import "../styles/index.scss";

import {Start as StartScene1, IsHit as IsHitScene1} from "../scene1";
import {Start as StartScene2, IsHit as IsHitScene2} from "../scene2";
import {Start as StartScene3, IsHit as IsHitScene3} from "../scene3";
import {Start as StartScene4, IsHit as IsHitScene4} from "../scene4";
import {Start as StartScene5, IsHit as IsHitScene5} from "../scene5";
import {Start as StartScene6, IsHit as IsHitScene6} from "../scene6";

import graphics from "./graphicscommon";
import { Start as StartMainLoop } from "./mainLoop";
import Track from "./Track";
import pauseMenu from "./pauseMenu";
import Sprite from "./Sprite";

var hasStarted = false;
var inScene = false;

export var currentSceneNumber = 1;

var scenes = [
  {},
  {start:StartScene1,hit:IsHitScene1},
  {start:StartScene2,hit:IsHitScene2},
  {start:StartScene3,hit:IsHitScene3},
  {start:StartScene4,hit:IsHitScene4},
  {start:StartScene5,hit:IsHitScene5},
  {start:StartScene6,hit:IsHitScene6}
];

if (process.env.NODE_ENV === "development") {
  require("../index.html");
}
// graphics.colorRect(0, 30, 30, 30, "red");

pauseMenu.init();
import splashImg from "../splash.png";
const splashScreen = new Sprite(splashImg, 1, 1);
StartMainLoop();

document.onkeydown = function (e) {
  console.log('keydown:'+e.keyCode);
  
  if (!hasStarted) {
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
  }

  if (!inScene) {

    if (e.keyCode>=49 && e.keyCode<=57) // pressed 1..9?
      currentSceneNumber = e.keyCode - 48;
    else 
      currentSceneNumber = 1;

    console.log("Starting Scene " + currentSceneNumber);

    scenes[currentSceneNumber].start();
    pauseMenu.enable();

    inScene = true;
    return;

  }

  // otherwise, assume keypress was gameplay input  
  scenes[currentSceneNumber].hit();
  
};
