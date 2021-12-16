import { getRandomIntInclusive } from '../helpers/helpers.js';
var Images;
(function (Images) {
    Images[Images["APPLE"] = 0] = "APPLE";
    Images[Images["BANNANA"] = 1] = "BANNANA";
    Images[Images["GRAPES"] = 2] = "GRAPES";
    Images[Images["MELON"] = 3] = "MELON";
    Images[Images["LEMON"] = 4] = "LEMON";
    Images[Images["ORANGE"] = 5] = "ORANGE";
    Images[Images["CHERRY"] = 6] = "CHERRY";
    Images[Images["BAR"] = 7] = "BAR";
})(Images || (Images = {}));
;
var IMG_HEIGHT = 140;
var Reel = /** @class */ (function () {
    function Reel(context, locationX, locationY, stopPoint) {
        //Set up nine safes in a grid pattern
        //OFFSET INITIALLY SET TO x200 y169
        this.context = context;
        this.locationX = locationX;
        this.locationY = locationY;
        this.stopPoint = stopPoint;
        this.reelImage = new Image();
        //private startTime:number= 0;
        this.slowTime = 0;
        this.spinning = true;
        this.stopAtValue = 0;
        this.stopping = false;
        this.reelSpeed = 10;
        this.stopInitiated = false;
        this.slowing = false;
        this.reelImage.src = '../../graphics/slot_reel_vert.png';
        console.log('Image dimensions', this.reelImage.width, this.reelImage.height);
        console.log('Canvas dimensions', this.context.canvas.width, this.context.canvas.height);
        this.imageOffset = (this.reelImage.height - this.context.canvas.height) / 2;
        this.imageOffset2 = this.imageOffset + this.reelImage.height;
    }
    Reel.prototype.stopSpin = function () {
        var enumValues = Object.keys(Images);
        console.log((enumValues.length / 2) - 1);
        var selectedVal = getRandomIntInclusive(0, (enumValues.length / 2) - 1);
        console.log('Selected value', selectedVal, Images[selectedVal]);
        this.stopAtValue = (selectedVal * IMG_HEIGHT) - (IMG_HEIGHT / 2);
        this.stopInitiated = true;
        //this.slowing = true;
        //this.stopping = true;
    };
    Reel.prototype.inRange = function (val, min, max) {
        if (val >= min && val <= max) {
            return true;
        }
        return false;
    };
    Reel.prototype.imageAtTop = function () {
        // if(this.stopping) {
        if (this.inRange((this.locationY - this.imageOffset) + (this.stopAtValue + IMG_HEIGHT), 0, 10)
            || this.inRange((this.locationY - this.imageOffset2) + (this.stopAtValue + IMG_HEIGHT), 0, 10)) {
            return true;
        }
        //}
        return false;
    };
    Reel.prototype.slowSpin = function (currentTime) {
        if (this.imageAtTop() && this.stopInitiated) {
            console.log('Image at top');
            this.stopInitiated = false;
            this.slowing = true;
            this.stopping = true;
        }
        if (this.reelSpeed <= 1) {
            this.slowing = false;
            //this.stopping = true;
        }
        if (this.slowing) {
            if (Math.floor(currentTime / 500) > this.slowTime) {
                this.slowTime = Math.floor(currentTime / 500);
                this.reelSpeed = Math.floor(this.reelSpeed / 1.5);
                //     this.imageOffset -= 30;
                //     this.imageOffset2 -= 30;
            }
        }
        //console.log('Slowing', this.reelSpeed);
    };
    Reel.prototype.checkStop = function () {
        if (this.stopping && !this.slowing) {
            if ((this.locationY - this.imageOffset) + (this.stopAtValue + IMG_HEIGHT) === this.stopPoint
                || (this.locationY - this.imageOffset2) + (this.stopAtValue + IMG_HEIGHT) === this.stopPoint) {
                this.spinning = false;
                this.stopping = false;
            }
        }
    };
    Reel.prototype.draw = function (currentTime) {
        //Control movement
        this.slowSpin(currentTime);
        this.checkStop();
        if (this.spinning) {
            // if(Math.floor(currentTime / 500) > this.startTime) {
            //     this.startTime = Math.floor(currentTime / 500);
            //     this.imageOffset -= 30;
            //     this.imageOffset2 -= 30;
            // }
            this.imageOffset -= this.reelSpeed;
            this.imageOffset2 -= this.reelSpeed;
            //Reset the image when off screen
            if (this.imageOffset <= this.context.canvas.height * -1) {
                this.imageOffset = this.imageOffset2 + this.reelImage.height;
            }
            if (this.imageOffset2 <= this.context.canvas.height * -1) {
                this.imageOffset2 = this.imageOffset + this.reelImage.height;
            }
        }
        //console.log('currentTime', Math.floor(currentTime / 1000), this.imageOffset, this.imageOffset2);
        this.context.drawImage(this.reelImage, this.locationX, this.locationY - this.imageOffset);
        this.context.drawImage(this.reelImage, this.locationX, this.locationY - this.imageOffset2);
    };
    return Reel;
}());
export { Reel };
//# sourceMappingURL=reel.js.map