import "../styles/index.scss";

import {Start as StartScene, IsHit} from "../scene1";
import graphics from "./graphicscommon";
import { Start as StartMainLoop } from "./mainLoop";
import pauseMenu from "./pauseMenu"

if (process.env.NODE_ENV === "development") {
  require("../index.html");
}
// graphics.colorRect(0, 30, 30, 30, "red");
console.log("webpack starterkit");
pauseMenu.init();

document.onkeypress = function (e) {
  if (e.key == "w") {
    StartMainLoop();
    StartScene();
    pauseMenu.enable();
  }
  
  if (e.code == "Space") {
    IsHit();
  }

  // Start();
};
