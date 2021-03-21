import {pause, unpause} from "./mainLoop.js";
import Sprite from "./Sprite";
import index from "./index";

import {Stop as StopScene1} from "../scene1";

import pauseImg from "../pauseMenu/pauseMenu.png";

var isEnabled = false;
var isPaused = false;

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

    document.addEventListener("keydown", function (e) {
            if (!isEnabled) { return; }

            // I want to check if the button is pressed
            if (e.key == "Escape") {

                // I game is not paused, then pause it
                if (!isPaused) {
                    // Then I want to display the UI.
                    displayUI();

                    // If it is pressed I want to stop the main loop
                    pause();

                    isPaused = true;
                }
                else{
                    // I remove the pause UI
                    pauseSprite.Stop();

                    // I restart the game
                    unpause();
                    isPaused = false;
                }
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

    pauseSprite = new Sprite(pauseImg, 1, 1);
}

var pauseSprite = null;
export default {enable, disable, init};