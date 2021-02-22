// class for animations
function spriteClass() {
	var spriteSheet;
	var frameX;
	var frameY;
	var frameWidth;
	var frameHeight;
	var frameTotal;
	var frameIndex;
	var loopFrames;
	var drawFrame;
	var currentTime;
	var timePerFrame;
	var secretCanvas = undefined;
	var getImgData = undefined;
	var hasThrown = undefined;
	var tintThisFrame = false;
	var playerSpriteWidth = 14;
	var playerSpriteHeight = 26;
	var playerSpriteCanvasX = 9;
	var playerSpriteCanvasY = 3;
	var hasFinishedLoop = false;

	// set sprite sheet to draw from and defines animation speed
	this.setSprite = function(newSpriteSheet,
						newWidth, newHeight,
						newTotal, newSpeed,
						loop) {
		if(!newSpriteSheet){
			throw "YO, what are you doing. Missing spriiiiiiite";
		}
		hasFinishedLoop = false;
		spriteSheet = newSpriteSheet;
		frameX = 0;
		frameY = 0;
		frameWidth = newWidth;
		frameHeight = newHeight;
		frameTotal = newTotal;
		if (newSpeed > 0) {
			timePerFrame = 1/newSpeed;
		} else {
			timePerFrame = 0;
		}
		loopFrames = loop;
		drawFrame = true;
		this.reset();
	};

	// sets a still frame from a sprite sheet, index goes left to right, top to bottom
	this.setFrame = function(index) {
		result = calculateFrameIndex(index);
		frameX = result.x;
		frameY = result.y;
		frameIndex = index % frameTotal;
		timePerFrame = 0;
		drawFrame = true;
	};

	this.getSpriteSheet = function (){
		return spriteSheet;
	};
	
	this.getFrame = function() {
		return frameIndex;
	};

	this.isDone = function(){
		return hasFinishedLoop;
	};

	this.setSpeed = function (newSpeed) {
		if (newSpeed > 0) {
			timePerFrame = 1/newSpeed;
		} else {
			timePerFrame = 0;
		}
	};

	this.reset = function() {
		currentTime = 0;
		frameIndex = 0;
		frameX = 0;
		frameY = 0;
	};

	// draws current sprite frame
	this.draw = function(x, y) {
		var leftEdge = Math.floor(x - frameWidth/2);
		var topEdge = Math.floor(y - frameHeight/2);

		if (drawFrame) {
			// this version of drawImage is needed to point to different frames in sprite sheet
			if(getImgData && tintThisFrame) {
				canvasContext.drawImage(secretCanvas,player.x - (playerSpriteWidth/2)-50, player.y - (playerSpriteHeight/2)-50);
				tintThisFrame = false;
				return;
			} else {
			canvasContext.drawImage(spriteSheet,
				frameX, frameY,
				frameWidth, frameHeight,
				leftEdge, topEdge,
				frameWidth, frameHeight);
			}
		}
	};


	// cycles through sprite animations
	this.update = function() {
		if (frameTotal > 0 && timePerFrame > 0) {
			currentTime += TIME_PER_TICK;

			if (currentTime >= timePerFrame) {
				currentTime -= timePerFrame;

				if (frameIndex+1 >= frameTotal) {
					hasFinishedLoop = true;
					if (loopFrames) {
						this.reset();
						return;
					} else {
						//this.setFrame(frameIndex);
						//drawFrame = false;
						return;
					}
				}
				frameIndex++;

				frameX += frameWidth;

				if (frameX >= spriteSheet.width) {
					frameX = 0;
					frameY += frameHeight;

					if (frameY >= spriteSheet.height) {
						frameY = 0;
						frameIndex = 0;
					}
				}
			}
		}
	};

	// helper function for setting still frames
	function calculateFrameIndex(index) {
		var posX = (index * frameWidth) % spriteSheet.width;
		var posY = (Math.floor(index / (spriteSheet.width / frameWidth)) * frameHeight) % spriteSheet.height;
		return {
			x: posX,
			y: posY
		};
	}
}