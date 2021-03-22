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
spritesTongueBody.forEach((spriteTongueBody, i) => {
  spriteTongueBody.Stop();
  spriteTongueBody.x = TONGUE_X;
  spriteTongueBody.y = TONGUE_BODY_Y + TONGUE_BODY_HEIGHT * i;
});

import fly from "./img/fly.png";
const flySprite = new Sprite(fly, 1, 1);
track.Events.on("Hit", (e) => {
  if (e.detail == 10) {
    flySprite.Stop();
    isTongueStretched = true;
    spriteTongue.reset();
    spritesTongueBody.forEach(spriteTongueBody => {
      spriteTongueBody.reset();
    });
  }
});
flySprite.Stop();

import bee from "./img/bee.png";
const flySprite1 = new Sprite(bee, 2, 1);
track.Events.on("Hit", (e) => {
  if (e.detail == 12) {
    flySprite1.Stop();
    isTongueStretched = true;
    spriteTongue.reset();
    spritesTongueBody.forEach(spriteTongueBody => {
      spriteTongueBody.reset();
    });
  }
});
flySprite1.Stop();

const flySprite2 = new Sprite(fly, 1, 1);
track.Events.on("Hit", (e) => {
  if (e.detail == 14) {
    flySprite2.Stop();
    isTongueStretched = true;
    spriteTongue.reset();
    spritesTongueBody.forEach(spriteTongueBody => {
      spriteTongueBody.reset();
    });
  }
});
flySprite2.Stop();

const flySprite3 = new Sprite(fly, 1, 1);
track.Events.on("Hit", (e) => {
  if (e.detail == 16) {
    flySprite3.Stop();
    isTongueStretched = true;
    spriteTongue.reset();
    spritesTongueBody.forEach(spriteTongueBody => {
      spriteTongueBody.reset();
    });
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
  

  addUpdate(e => {
    if (isTongueStretched && spriteTongue.y > TONGUE_EXTENDS_Y) {
      spriteTongue.y -= TONGUE_EXTENDS_Y_SPEED;
      spritesTongueBody.forEach(spriteTongueBody => {
        spriteTongueBody.y -= TONGUE_BODY_EXTENDS_Y_SPEED;
      });
    }
    else {
      isTongueStretched = false;
      if (spriteTongue.y < TONGUE_Y) {
        spriteTongue.y += TONGUE_EXTENDS_Y_SPEED;
        spritesTongueBody.forEach(spriteTongueBody => {
          spriteTongueBody.y += TONGUE_BODY_EXTENDS_Y_SPEED;
        });
      }
      else {
        spriteTongue.Stop();
        spritesTongueBody.forEach(spriteTongueBody => {
          spriteTongueBody.Stop();
        });
      }
    }
  });

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

export const IsPaused = () => {
  track.Stop();
};

export const IsUnPaused = () => {
  track.Continue();
};