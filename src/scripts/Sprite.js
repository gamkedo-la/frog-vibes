import graphics, { addDraw, removeDraw } from "./graphicscommon";
import { addUpdate } from "./mainLoop";

// class for animations
export default class spriteClass {
  spriteSheet = document.createElement("img");
  x = 0;
  y = 0;
  frameX;
  frameY;
  frameWidth;
  frameHeight;
  columns;
  rows;
  frameTotal;
  frameIndex;
  loopFrames;
  drawFrame;
  currentTime;
  timePerFrame = 416.66; //(15 / 60) * 1000; // 15 frames every 60 seconds but in miliseconds
  timePerFrameSave = 0;
  secretCanvas = undefined;
  getImgData = undefined;
  animation = {};
  currentAnimation = "not set";
  hasFinishedLoop = false;
  stopped = false;

  constructor(path, col, row) {
    this.spriteSheet.onload = this.onLoad;
    this.addImage(path, col, row);
    this.drawFrame = false;
    this.timePerFrameSave = this.timePerFrame;
    this.animation["default"] = {
      startIndex: 0,
      totalFrames: this.columns * this.rows,
      speed: this.timePerFrame,
    };
    this.currentAnimation = "default";
    this.frameTotal = this.columns * this.rows;
    this.loopFrames = true;
    
    addDraw(this.draw);
    addUpdate(this.update);
  }
  Stop() {
    this.stopped = true;
    removeDraw(this.draw);
    this.timePerFrame = 0;
    this.drawFrame = false;
  }
  start() {
    this.stopped = false;
    addDraw(this.draw);
    this.timePerFrame = this.timePerFrameSave;
    this.drawFrame = true;
  }

  addImage(path, col, row) {
    // TODO: make a dictonary of added images, or some way to quicky switch between animations
    this.columns = col;
    this.rows = row;
    this.spriteSheet.src = path;
  }
  setAnimation = (name) => {
    if (this.animation[name]) {
      this.currentAnimation = name;
      this.frameTotal = this.animation[name].totalFrames + this.animation[name].startIndex;
      this.reset();
    } else {
      console.error(`aaay so like, there's no animation called ${name} registered`);
    }
  }
  registerAnimation = (name, startIndex, totalFrames) => {
      this.animation[name] = {
        startIndex: startIndex,
        totalFrames: totalFrames,
        speed: this.timePerFrame,
      };
    console.log(`current anim: ${this.currentAnimation}`);
  }
  onLoad = () => {
    this.frameWidth = this.spriteSheet.naturalWidth / this.columns;
    this.frameHeight = this.spriteSheet.naturalHeight / this.rows;
    console.log(`current anim: ${this.currentAnimation}`);

    if (!this.stopped) {
      this.reset();
    }
  };

  // set sprite sheet to draw from and defines animation speed
  setSprite(newSpriteSheet, newWidth, newHeight, newTotal, newSpeed, loop) {
    if (!newSpriteSheet) {
      throw "Missing spriiiiiiite";
    }
    hasFinishedLoop = false;
    this.spriteSheet = newSpriteSheet;
    this.frameX = 0;
    this.frameY = 0;
    this.frameWidth = newWidth;
    this.frameHeight = newHeight;
    this.frameTotal = newTotal;
    if (newSpeed > 0) {
      this.timePerFrame = 1 / newSpeed;
    } else {
      this.timePerFrame = 0;
    }
    loopFrames = loop;
    this.reset();
  }

  // sets a still frame from a sprite sheet, index goes left to right, top to bottom
  setFrame(index) {
    result = calculateFrameIndex(index);
    frameX = result.x;
    frameY = result.y;
    frameIndex = index % frameTotal;
    this.timePerFrame = 0;
    drawFrame = true;
  }

  getSpriteSheet() {
    return spriteSheet;
  }
  setSpeed(newSpeed) {
    if (newSpeed > 0) {
      this.timePerFrame = 1 / newSpeed;
    } else {
      this.timePerFrame = 0;
    }
  }

  reset() {
    this.currentTime = 0;
    this.frameIndex = this.animation[this.currentAnimation].startIndex;
    var pos = this.calculateFrameIndex(this.frameIndex);
    this.frameX = pos.x;
    this.frameY = pos.y;
    this.hasFinishedLoop = false;
    this.timePerFrame = this.timePerFrameSave;
    this.drawFrame = true;
  }
  // draws current sprite frame
  draw = () => {
    if (this.drawFrame) {
      // this version of drawImage is needed to point to different frames in sprite sheet
      graphics.drawFrame(
        this.spriteSheet,
        this.frameX,
        this.frameY,
        this.frameWidth,
        this.frameHeight,
        this.x,
        this.y,
        this.frameWidth,
        this.frameHeight
      );
    }
  };

  // cycles through sprite animations
  update = (e) => {
    if (this.frameTotal > 0 && this.timePerFrame > 0) {
      this.currentTime += e.detail;

      if (this.currentTime >= this.timePerFrame) {
        this.currentTime -= this.timePerFrame;

        if (this.frameIndex + 1 >= this.frameTotal) {
          this.hasFinishedLoop = true;
          if (this.loopFrames) {
            this.reset();
            return;
          } else {
            //this.setFrame(frameIndex);
            //drawFrame = false;
            return;
          }
        }
        this.frameIndex++;

        this.frameX += this.frameWidth;

        if (this.frameX >= this.spriteSheet.width) {
          this.frameX = 0;
          this.frameY += this.frameHeight;

          if (this.frameY >= this.spriteSheet.height) {
            this.frameY = 0;
            this.frameIndex = this.animation[this.currentAnimation].startIndex;
          }
        }
      }
    } else {
      //console.log(this.frameTotal + " " + this.timePerFrame);
    }
  };

  // helper function for setting still frames
  calculateFrameIndex(index) {
    var posX = (index * this.frameWidth) % this.spriteSheet.width;
    var posY =
      (Math.floor(index / (this.spriteSheet.width / this.frameWidth)) *
        this.frameHeight) %
      this.spriteSheet.height;
    return {
      x: posX,
      y: posY,
    };
  }
}
