import {pause, unpause} from "./mainLoop.js";
import Sprite from "./Sprite";
import {currentSceneNumber} from "./index";
// import Input from "./Input";

import {IsPaused as PauseScene1, IsUnPaused as UnPauseScene1} from "../scene1";
import {IsPaused as PauseScene2, IsUnPaused as UnPauseScene2} from "../scene2";
import {IsPaused as PauseScene3, IsUnPaused as UnPauseScene3} from "../scene3";
import {IsPaused as PauseScene4, IsUnPaused as UnPauseScene4} from "../scene4";
import {IsPaused as PauseScene5, IsUnPaused as UnPauseScene5} from "../scene5";
import {IsPaused as PauseScene6, IsUnPaused as UnPauseScene6} from "../scene6";

import pauseImg from "../pauseMenu/pauseMenu.png";

var canvas = document.getElementById("gameCanvas");
var rect = canvas.getBoundingClientRect();
var root = document.documentElement;

var isEnabled = false;
var isPaused = false;

var isMouseOnUnPauseButton = false;

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

function init() {
    document.addEventListener("keydown", 
        function(evt) { handlePauseButton(evt) }, false);

    document.addEventListener("mousedown",
        function(evt) { handleMouseClick(evt) }, false);

    canvas.addEventListener("mousemove", 
        function(evt) { handleMousePosition(evt) }, false);
}

// I want to be able to press a button and pause the game.
function handlePauseButton(evt) {
    if (!isEnabled) { return; }

    // I want to check if the button is pressed
    if (evt.key == "Escape") {

        // I game is not paused, then pause it
        if (!isPaused) {
            pauseGame();
            // console.log(Input.mouseCanvasX);
        }
        else{
            unPauseGame();
        }
    }
}

function unPauseGame() {
    // I remove the pause UI
    pauseSprite.Stop();

    // I restart the game
    unpause();
    scenes[currentSceneNumber].unPauseTrack();

    isPaused = false;
}

function pauseGame() {
    // Then I want to display the UI.
    displayUI();

    // If it is pressed I want to stop the main loop
    pause();
    scenes[currentSceneNumber].pauseTrack();

    isPaused = true;
}

// import pauseMenu from "../pauseMenu/"
// When I pause the game I want to see some UI.
function displayUI() {
    if (!isEnabled) { return; }

    pauseSprite = new Sprite(pauseImg, 1, 1);
}

function handleMousePosition(evt) {
    if (!isEnabled || !isPaused) { return; }

    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;

    var mouseCanvasX = Math.floor(mouseX * (canvas.width/canvas.clientWidth));
    var mouseCanvasY = Math.floor(mouseY * (canvas.height/canvas.clientHeight));

    if (mouseCanvasX > 100 && mouseCanvasX < 220 &&
        mouseCanvasY > 45 && mouseCanvasY < 75){
            isMouseOnUnPauseButton = true;
    }
    else{
        isMouseOnUnPauseButton = false;
    }
}

function handleMouseClick(evt) {
    if (!isEnabled || !isPaused || evt.button != 0) { return; }
    
    // When I click on the unpause button, the game continues and the UI goes away.
    if (isMouseOnUnPauseButton) {
        unPauseGame();
    }
}

var pauseSprite = null;

export default {enable, disable, init};