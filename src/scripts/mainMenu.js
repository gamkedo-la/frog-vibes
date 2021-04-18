// When I press c I launch the credits
// When I press a number I go to the corresponding scene
// When I press m I mute everything

import {Start as StartScene1, IsHit as IsHitScene1} from "../scene1";
import {Start as StartScene2, IsHit as IsHitScene2} from "../scene2";
import {Start as StartScene3, IsHit as IsHitScene3} from "../scene3";
import {Start as StartScene4, IsHit as IsHitScene4} from "../scene4";
import {Start as StartScene5, IsHit as IsHitScene5} from "../scene5";
import {Start as StartScene6, IsHit as IsHitScene6} from "../scene6";

import Sprite from "./Sprite";
import splashImg from "../splash.png";
import {currentSceneNumber, inScene} from "./index";

const splashScreen = new Sprite(splashImg, 1, 1);

var isMainMenuActive = false;

var scenes = [
    {},
    {start:StartScene1,hit:IsHitScene1},
    {start:StartScene2,hit:IsHitScene2},
    {start:StartScene3,hit:IsHitScene3},
    {start:StartScene4,hit:IsHitScene4},
    {start:StartScene5,hit:IsHitScene5},
    {start:StartScene6,hit:IsHitScene6}
];

// I want to register specific keydown events 
function Init () {
    document.addEventListener("keydown",
        function(evt) { handleMenuButtons (evt) }, false);
}

// I want to start the main menu from anywhere
function Start () {
    // I want to draw the Splash Screen
    splashScreen.reset();

    // When I press a button, something happens
    isMainMenuActive = true;
}

// I want to be able to quit the main menu
function Quit () {
    isMainMenuActive = false;
}

function handleMenuButtons (evt) {
    if (!isMainMenuActive) { return; }

    console.log("In the main menu I pressed " + evt.keyCode);
    if (evt.keyCode>=49 && evt.keyCode<=57) // pressed 1..9?
      currentSceneNumber = evt.keyCode - 48;
    else 
      currentSceneNumber = 1;

    console.log("Starting Scene " + currentSceneNumber);

    scenes[currentSceneNumber].start();
    pauseMenu.enable();

    inScene = true;
    return;
}

export default {Start, Init};