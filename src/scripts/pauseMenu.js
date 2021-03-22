import {pause, unpause} from "./mainLoop.js";
import Sprite from "./Sprite";
import {currentSceneNumber} from "./index";

import {IsPaused as PauseScene1, IsUnPaused as UnPauseScene1} from "../scene1";
import {IsPaused as PauseScene2, IsUnPaused as UnPauseScene2} from "../scene2";
import {IsPaused as PauseScene3, IsUnPaused as UnPauseScene3} from "../scene3";
import {IsPaused as PauseScene4, IsUnPaused as UnPauseScene4} from "../scene4";
import {IsPaused as PauseScene5, IsUnPaused as UnPauseScene5} from "../scene5";
import {IsPaused as PauseScene6, IsUnPaused as UnPauseScene6} from "../scene6";

import pauseImg from "../pauseMenu/pauseMenu.png";

var isEnabled = false;
var isPaused = false;

var scenes = [
    {},
    {pauseTrack:PauseScene1, unPauseTrack:UnPauseScene1},
    {pauseTrack:PauseScene2, unPauseTrack:UnPauseScene2},
    {pauseTrack:PauseScene3, unPauseTrack:UnPauseScene3},
    {pauseTrack:PauseScene4, unPauseTrack:UnPauseScene4},
    {pauseTrack:PauseScene5, unPauseTrack:UnPauseScene5},
    {pauseTrack:PauseScene6, unPauseTrack:UnPauseScene6}
  ];

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

                console.log(currentSceneNumber);

                // I game is not paused, then pause it
                if (!isPaused) {
                    // Then I want to display the UI.
                    displayUI();

                    // If it is pressed I want to stop the main loop
                    pause();
                    scenes[currentSceneNumber].pauseTrack();

                    isPaused = true;
                }
                else{
                    // I remove the pause UI
                    pauseSprite.Stop();

                    // I restart the game
                    unpause();
                    scenes[currentSceneNumber].unPauseTrack();
                    
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