import Sprite from "../scripts/Sprite";

import Track from "../scripts/Track";
import { addUpdate } from "../scripts/mainLoop";

var DEBUG_INSTANT_END_ROUND_FROG = false;
if(DEBUG_INSTANT_END_ROUND_FROG) {
  console.log("WARNING: DEBUG_INSTANT_END_ROUND_FROG is TRUE in frog game eating.js");
}

var frogRoundSummaryDelay = 50; // previously 2000, seemed awkwardly long

//AUDIO
var track = new Track("public/Audio/track1.wav", [10, 12, 14, 16, 26, 28, 30, 32, 43, 45, 47, 49], "public/Audio/scene01/kerop.wav", "public/Audio/scene01/ohno.wav");
var timePerFrame = 416.66;

// SCENE SPRITE
import testimg2 from "./img/scene1sheeeeeet2.png";
const spriteThing = new Sprite(testimg2, 40, 1);

spriteThing.registerAnimation("Idle", 4, 2);
spriteThing.registerAnimation("Sad", 12, 1);
spriteThing.registerAnimation("Happy", 8, 1);
spriteThing.setAnimation("Idle");
spriteThing.Stop();

import startScorePanel from "../scorePanel/scorepanel.js";

// TONGUE VALUES
const TONGUE_X = 100;
const TONGUE_Y = 34;
const TONGUE_EXTENDS_Y = 14;
const TONGUE_EXTENDS_Y_SPEED = 6;
const TONGUE_BODY_Y = 64;
const TONGUE_BODY_HEIGHT = 23;
const TONGUE_BODY_EXTENDS_Y_SPEED = 6;
let isTongueStretched = false;
let isTongueStretchedHit = false;

// TONGUE SPRITE
import tongueHit from "./img/frog_tongue.png";
import tongueMiss from "./img/frog_tongue_miss.png";
const spriteTongueHit = new Sprite(tongueHit, 1, 1);
const spriteTongueMiss = new Sprite(tongueMiss, 1, 1);
let spriteTongue = spriteTongueHit;
const InitTongue = (tongue = spriteTongue) => {  
  tongue.Stop();
  tongue.x = TONGUE_X;
  tongue.y = TONGUE_Y;  
};
InitTongue(spriteTongueHit);
InitTongue(spriteTongueMiss);

// TONGUE BODY SPRITES
import tongueHitBody from "./img/frog_tongue_body.png";
import tongueMissBody from "./img/frog_tongue_body_miss.png";
const spritesTongueHitBody = [
  new Sprite(tongueHitBody, 1, 1),
  new Sprite(tongueHitBody, 1, 1)
];
const spritesTongueMissBody = [
  new Sprite(tongueMissBody, 1, 1),
  new Sprite(tongueMissBody, 1, 1)
];
let spritesTongueBody = spritesTongueHitBody;
const InitTongueBody = (tongueBody = spritesTongueBody) => {
  tongueBody.map((spriteTongueBody, i) => {
    spriteTongueBody.Stop();
    spriteTongueBody.x = TONGUE_X;
    spriteTongueBody.y = TONGUE_BODY_Y + TONGUE_BODY_HEIGHT * i;
  });
};
InitTongueBody(spritesTongueHitBody);
InitTongueBody(spritesTongueMissBody);

// BUG SPRITES
import fly from "./img/fly.png";
import bee from "./img/bee.png";
import boot from "./img/boot.png";
const bugSprites = [
  new Sprite(fly, 2, 1),
  new Sprite(bee, 2, 1),
  new Sprite(fly, 2, 1),
  new Sprite(boot, 2, 1),

  new Sprite(fly, 2, 1),
  new Sprite(fly, 2, 1),
  new Sprite(bee, 2, 1),
  new Sprite(fly, 2, 1),

  new Sprite(boot, 2, 1),
  new Sprite(bee, 2, 1),
  new Sprite(bee, 2, 1),
  new Sprite(fly, 2, 1),
];
bugSprites.map(bugSprite => {
  bugSprite.Stop();
});


const TongueStretchedHit = (isHit = true) => {
  if (!isTongueStretched) {    
    isTongueStretchedHit = isHit;
    
    if (isHit) {
      spriteTongue = spriteTongueHit;
      spritesTongueBody = spritesTongueHitBody;
    }
    else {
      spriteTongue = spriteTongueMiss;
      spritesTongueBody = spritesTongueMissBody;
    }

    spriteTongue.reset();
    spritesTongueBody.map(spriteTongueBody => {
      spriteTongueBody.reset();
    });
    isTongueStretched = true;
  }
};

var totalhits = 0;
track.Events.on("Hit", e => {
  TongueStretchedHit();
  totalhits += 1;
  let i = track.fullTrack.findIndex(x => e.detail == x);
  bugSprites[i].Stop();

});

track.Events.on("Miss", e => {  
  TongueStretchedHit(false);
  // console.log("Frog tongue stretched out, but nothing happened!");
});
//ending
track.Events.on("Ended", (e) => {
  // console.log("stuff has eneded!");
    
  if (totalhits == 0) {
    track.missSfx.play();
    spriteThing.setAnimation("Sad");
  } else {
    spriteThing.setAnimation("Happy");

  }
  //uhhh set a delay? or do some sort of sequence? 
  setTimeout(() => { startScorePanel();}, frogRoundSummaryDelay);
  
});

export const Stop = () => {

  // NOTE: not used! instead just doing a location.reload() from mouseup in scorepanel

  console.log("undo frog!");
}

// LESGOOOO
export const Start = () => {
  if(DEBUG_INSTANT_END_ROUND_FROG) {
    track.Events.emit("Ended", { detail: "bwaap bwaaaaaa" });
  } else {
    track.Start();
  }

  spriteThing.reset();
  
  bugSprites.map(sprite => {
    sprite.reset();
  });


  bugSprites.map((sprite, i) => {
    sprite.x = track.fullTrack[i] * 20;
    
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
    bugSprites.map(sprite => {
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