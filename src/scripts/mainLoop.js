import EventChannel from "./EventChannel";
var started = false;
import graphics, {graphicsEvent}  from "./graphicscommon";

export const events = new EventChannel();

export const  Start = () => { 
  if (started) return;
  window.requestAnimationFrame(loop);
  started = true;
};

export const Pause = () => { 
  started = false;
};

function update(progress) {
  // Update the state of the world for the elapsed time since last render
  events.emit("Update", { detail: progress });
}

function draw() {
  // Draw the state of the world
  graphics.clear();
  graphicsEvent.emit("Draw");
}

function loop(timestamp) {
  if (!started) return;
  var progress = timestamp - lastRender;

  update(progress);
  draw();

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}
var lastRender = 0;