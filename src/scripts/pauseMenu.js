import {pause} from "./mainLoop.js";
import Sprite from "./Sprite";

var isEnabled = false;

// I want to enable this functionality.
function enable() {
    isEnabled = true;
}

// I want to be able to disable this functionality.
function disable () {
    isEnabled = false;
}

// I want to be able to press a button and pause the game.
function handlePauseButton() {

    document.addEventListener("keypress", function (e) {
            console.log(e.key);
            console.log(isEnabled);

            if (!isEnabled) { return; }

            // I want to check if the button is pressed
            if (e.key == "f") {
                // Then I want to display the UI.
                displayUI();

                // If it is pressed I want to stop the main loop
                pause();
            }
        }, false);
}

function init() {
    handlePauseButton();
}

// When I click on the unpause button, the game continues and the UI goes away.
function handleUnPause() {
    if (!isEnabled) { return; }

}

// import pauseMenu from "../pauseMenu/"
// When I pause the game I want to see some UI.
// On the UI I want there to be a button to unpause.
function displayUI() {
    if (!isEnabled) { return; }

    new Sprite("../pauseMenu/pauseMenu.jpg", 1, 1);
}

export default {enable, disable, init};