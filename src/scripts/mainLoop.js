import EventChannel from "./EventChannel";
var started = false;


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
  events.emit("update", { detail: progress });
}

function draw() {
  // Draw the state of the world
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