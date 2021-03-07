import "../styles/index.scss";

import {Start as StartScene, IsHit} from "../scene1";
import graphics from "./graphicscommon";
import { Start as StartMainLoop } from "./mainLoop";
import pauseMenu from "./pauseMenu";
import Sprite from "./Sprite";
var hasStarted = false;
var inScene = false;
if (process.env.NODE_ENV === "development") {
  require("../index.html");
}
// graphics.colorRect(0, 30, 30, 30, "red");

pauseMenu.init();
import splashImg from "../splash.png";
const splashScreen = new Sprite(splashImg, 1, 1);
StartMainLoop();
document.onkeypress = function (e) {
  if (!hasStarted) {
    console.log("Stopping Splash");
    hasStarted = true;    
    splashScreen.stop();
    console.log("Starting Scene");
    StartScene();
    inScene = true;
    return;
  }
  if (!hasStarted && !inScene) {
    console.log("Starting Scene");
    StartScene();
    inScene = true;
    return;
  }
  
  
    IsHit();
    

  // Start();
};
