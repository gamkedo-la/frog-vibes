import EventChannel from "./EventChannel";
var canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// drawEvents.addEventListener('customEvent', console.log);
// drawEvents.dispatchEvent(new Event('customEvent'));

function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
  ctx.save();
  ctx.translate(atX, atY);
  ctx.rotate(withAng);
  ctx.drawImage(useBitmap, -useBitmap.width / 2, -useBitmap.height / 2);
  ctx.restore();
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  ctx.fillStyle = fillColor;
  ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
  ctx.fillStyle = fillColor;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  ctx.fill();
}

function colorText(showWords, textX, textY, fillColor) {
  ctx.fillStyle = fillColor;
  ctx.fillText(showWords, textX, textY);
}

function colorLine(startX, startY, endX, endY, color) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}
const drawImage = (img, startX, startY) => {
  ctx.drawImage(img, startX, startY);
};
const drawFrame = (
  spriteSheet,
  frameX,
  frameY,
  frameWidth,
  frameHeight,
  x,
  y
) => {
  ctx.drawImage(
    spriteSheet,
    frameX,
    frameY,
    frameWidth,
    frameHeight,
    x,
    y,
    frameWidth,
    frameHeight
  );
};
const clear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};
const graphics = {
  clear,
  drawImage,
  drawFrame,
  drawBitmapCenteredWithRotation,
  colorRect,
  colorCircle,
  colorText,
  colorLine,
};
export const run = () => {
  clear();
  drawEvent.emit("Draw");
};
export const addDraw = (fn) => {
  drawEvent.addEventListener("Draw", fn);
};
export const removeDraw = (fn) => {
  drawEvent.addEventListener; ("Draw", fn);
};
export const drawEvent = new EventChannel();
export default graphics;
