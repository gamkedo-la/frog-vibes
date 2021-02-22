import "../styles/index.scss";

import scene1, {Start as StartScene, IsHit} from "../scene1";
import graphics from "./graphicscommon";
import { Start as StartMainLoop, Pause } from "./mainLoop";

if (process.env.NODE_ENV === "development") {
  require("../index.html");
}
graphics.colorRect(0, 30, 30, 30, "red");
console.log("webpack starterkit");
console.log(scene1);
var marginOfError = 0.5;

document.onkeypress = function (e) {
  if (e.key == "w") {
    StartMainLoop();
    StartScene();
  }
  if (e.key == "s") Pause();
  if (e.code == "Space") {
    IsHit();
  }

  // Start();
};
