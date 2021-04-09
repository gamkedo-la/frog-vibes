import EventChannel from "./EventChannel";
var started = false;
import { run as runGraphics } from "./graphicscommon";

import { colorBlank as drawColor } from "./graphicscommon";
import { creditsText as drawCredits } from "./graphicscommon";

export const updateEvent = new EventChannel();

export const Start = () => {
  if (started) return;
  window.requestAnimationFrame(loop);
  started = true;
};

var creditsDisplay = false;
export const ToggleCredits = () => {
  creditsDisplay = !creditsDisplay;
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

let creditsList = [
"PRESS ANY KEY TO RETURN",
" ",
        "ClayTaeto: Project lead, frog images, core functionality, animation loading system, scene diagrams, color palette, fly and bee logic, score panel",
"Jeff \"Axphin\" Hanlon: 2 looping songs, joke bug boot animation, frog design update, graphic item separation (art pipeline), font selection and related integration, fly sprite animation, continue button art",
"Randy Tan Shaoxian: Mute toggle, frog tongue tuning, fly eating and miss sounds, tongue changes based on collision, additional minor bug fixes",
"Christer \"McFunkypants\" Kaitila: Tadpole scene (plus related art, functionality), victory voice sound",
"Charlene A.: Bee animation sprite, case sensitive compatibility fix",
"Ian Cherabier: Pause menu and related art/functionality",
"Clemens Reil: Practice commit"];
let creditsMaxCharWidthToWrap = 68;

function wrapCredits() { // note: gets calling immediately after definition
    let newCut = [];
    let findEnd;
    for(var i=0;i<creditsList.length;i++) {
        while(creditsList[i].length > 0) {
            findEnd = creditsMaxCharWidthToWrap;
            if(creditsList[i].length > creditsMaxCharWidthToWrap) {
                for(var ii=findEnd;ii>0;ii--) {
                    if(creditsList[i].charAt(ii) == " ") {
                        findEnd=ii;
                        break;
                    }
                }
            }
            newCut.push(creditsList[i].substring(0, findEnd));
            creditsList[i] = creditsList[i].substring(findEnd, creditsList[i].length);
        }
    }
    creditsList = newCut;
}
wrapCredits(); // calling once right at start


function draw() {
  // Draw the state of the world
  runGraphics();
  if(creditsDisplay) {
    drawColor("blue");
    drawCredits(7,15, creditsList);
  }
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
