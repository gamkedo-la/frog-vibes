import Sprite from "../scripts/Sprite";

import Track from "../scripts/Track";
import { addUpdate } from "../scripts/mainLoop";

//AUDIO
var track = new Track("public/audio/track1.wav", [10, 12, 14, 16]);
var timePerFrame = 416.66;
//SPRITE
import testimg2 from "./img/frog.png";
const spriteThing = new Sprite(testimg2, 2, 1);
spriteThing.Stop();

import fly from "./img/fly.png";
const flySprite = new Sprite(fly, 1, 1);
track.Events.on("Hit", (e) => {
  if (e.detail == 10) {
    flySprite.Stop();
  }
});
flySprite.Stop();

const flySprite1 = new Sprite(fly, 1, 1);
track.Events.on("Hit", (e) => {
  if (e.detail == 12) {
    flySprite1.Stop();
  }
});
flySprite1.Stop();

const flySprite2 = new Sprite(fly, 1, 1);
track.Events.on("Hit", (e) => {
  if (e.detail == 14) {
    flySprite2.Stop();
  }
});
flySprite2.Stop();

const flySprite3 = new Sprite(fly, 1, 1);
track.Events.on("Hit", (e) => {
  if (e.detail == 16) {
    flySprite3.Stop();
  }
});
flySprite3.Stop();

// LESGOOOO
export const Start = () => {
  track.Start();
  spriteThing.reset();
  flySprite.reset();
  flySprite1.reset();
  flySprite2.reset();
  flySprite3.reset();
  flySprite.x = 10 * 20;
  flySprite1.x = 12 * 20;
  flySprite2.x = 14 * 20;
  flySprite3.x = 16 * 20;

  
  addUpdate((e) => {
    //needs to move 20 per second
    flySprite.x -= (e.detail / timePerFrame) * 20;    
  });

  addUpdate((e) => {
    //needs to move 20 per second
    flySprite1.x -= (e.detail / timePerFrame) * 20;    
  });
  addUpdate((e) => {
    //needs to move 20 per second
    flySprite2.x -= (e.detail / timePerFrame) * 20;    
  });
  addUpdate((e) => {
    //needs to move 20 per second
    flySprite3.x -= (e.detail / timePerFrame) * 20;    
  });
};

export const IsHit = () => {
  track.IsHit();
};
