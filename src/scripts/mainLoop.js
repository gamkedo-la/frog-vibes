import EventChannel from "./EventChannel";
var started = false;
import { run as runGraphics } from "./graphicscommon";

export const updateEvent = new EventChannel();

export const Start = () => {
  if (started) return;
  window.requestAnimationFrame(loop);
  started = true;
};

export const pause = () => {
  started = false;
};
export const unpause = () => {
  started = true;
};
export const addUpdate = (fn) => {
  updateEvent.on("Update", fn);
};
function update(progress) {
  // Update the state of the world for the elapsed time since last render
  updateEvent.emit("Update", { detail: progress });
}

function draw() {
  // Draw the state of the world
  runGraphics();
}

function loop(timestamp) {
  if (started) {
    var progress = timestamp - lastRender;
    update(progress);
  }
  
  lastRender = timestamp;

  draw();
  window.requestAnimationFrame(loop);
}

var lastRender = 0;
