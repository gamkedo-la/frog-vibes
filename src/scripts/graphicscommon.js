import EventChannel from "./EventChannel";
var canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

const drawEvents = new EventChannel();
// drawEvents.addEventListener('customEvent', console.log);
// drawEvents.dispatchEvent(new Event('customEvent'));
function drawEvent(fn) { 
	drawEvents.addEventListener("Draw", fn);
}

function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
	ctx.save();
	ctx.translate(atX, atY);
	ctx.rotate(withAng);
	ctx.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
	ctx.restore();
}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	ctx.fillStyle = fillColor;
	ctx.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(centerX,centerY, radius, fillColor) {
	ctx.fillStyle = fillColor;
	ctx.beginPath();
	ctx.arc(centerX,centerY, radius, 0, Math.PI*2, true);
	ctx.fill();
}

function colorText(showWords, textX,textY, fillColor) {
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
const drawImage = (fn, startX, startY) => {
  ctx.drawImage(fn, startX, startY);
};
const clear = () => { 
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};
const graphics = {
	clear,
	drawImage,
	drawEvent,
    drawBitmapCenteredWithRotation,
    colorRect,
    colorCircle,
    colorText,
    colorLine
};
export const event = drawEvents;
export default graphics;