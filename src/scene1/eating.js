import Sprite from "../scripts/Sprite";

import Track from "../scripts/Track";
import { addUpdate } from "../scripts/mainLoop";

//AUDIO
var track = new Track("public/audio/track1.wav", [10, 12, 14, 16], "public/audio/scene01/kerop.wav");
var timePerFrame = 416.66;
//SPRITE
import testimg2 from "./img/frog.png";
const spriteThing = new Sprite(testimg2, 2, 1);
spriteThing.Stop();

// TONGUE
import tongue from "./img/frog_tongue.png";
const spriteTongue = new Sprite(tongue, 1, 1);
spriteTongue.Stop();
const TONGUE_X = 100;
const TONGUE_Y = 34;
const TONGUE_EXTENDS_Y = 14;
const TONGUE_EXTENDS_Y_SPEED = 6;
spriteTongue.x = TONGUE_X;
spriteTongue.y = TONGUE_Y;
var isTongueStretched = false;

// TONGUE BODY
import tongueBody from "./img/frog_tongue_body.png";
const spritesTongueBody = [
  new Sprite(tongueBody, 1, 1),
  new Sprite(tongueBody, 1, 1)
];
const TONGUE_BODY_Y = 64;
const TONGUE_BODY_HEIGHT = 23;
const TONGUE_BODY_EXTENDS_Y_SPEED = 6;
spritesTongueBody.map((spriteTongueBody, i) => {
  spriteTongueBody.Stop();
  spriteTongueBody.x = TONGUE_X;
  spriteTongueBody.y = TONGUE_BODY_Y + TONGUE_BODY_HEIGHT * i;
});

import fly from "./img/fly.png";
import bee from "./img/bee.png";
const flySprites = [
  new Sprite(fly, 1, 1),
  new Sprite(bee, 2, 1),
  new Sprite(fly, 1, 1),
  new Sprite(fly, 1, 1)
];

const StretchTongueEatBug = bugSprite => {  
  bugSprite.Stop();
  isTongueStretched = true;
  spriteTongue.reset();
  spritesTongueBody.map(spriteTongueBody => {
    spriteTongueBody.reset();
  });
};

track.Events.on("Hit", e => {
  let bugX = 10;
  flySprites.map((sprite, i, flySprites) => {
    if (e.detail == bugX) {
      StretchTongueEatBug(sprite);
      flySprites[i].Stop();
    }
    bugX += 2;
  });
});

// LESGOOOO
export const Start = () => {
  track.Start();
  
  spriteThing.reset();  
  
  flySprites.map(sprite => {
    sprite.reset();
  });

  let bugX = 10;
  flySprites.map(sprite => {
    sprite.x = bugX * 20;
    bugX += 2;
  });

  addUpdate(e => {
    if (isTongueStretched && spriteTongue.y > TONGUE_EXTENDS_Y) {
      spriteTongue.y -= TONGUE_EXTENDS_Y_SPEED;
      spritesTongueBody.map(spriteTongueBody => {
        spriteTongueBody.y -= TONGUE_BODY_EXTENDS_Y_SPEED;
      });
    }
    else {
      isTongueStretched = false;
      if (spriteTongue.y < TONGUE_Y) {
        spriteTongue.y += TONGUE_EXTENDS_Y_SPEED;
        spritesTongueBody.map(spriteTongueBody => {
          spriteTongueBody.y += TONGUE_BODY_EXTENDS_Y_SPEED;
        });
      }
      else {
        spriteTongue.Stop();
        spritesTongueBody.map(spriteTongueBody => {
          spriteTongueBody.Stop();
        });
      }
    }
  });

  addUpdate(e => {
    flySprites.map(sprite => {
      //needs to move 20 per second
      sprite.x -= (e.detail / timePerFrame) * 20;    
    });
  });
};

export const IsHit = () => {
  track.IsHit();
};

export const IsPaused = () => {
  track.Stop();
};

export const IsUnPaused = () => {
  track.Continue();
};