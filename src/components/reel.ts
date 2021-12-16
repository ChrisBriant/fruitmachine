import { getRandomIntInclusive } from '../helpers/helpers.js';


enum Images { APPLE, BANNANA, GRAPES, MELON,LEMON, ORANGE, CHERRY, BAR};
const IMG_HEIGHT = 140;

export class Reel {
    private reelImage:HTMLImageElement = new Image();
    //private context:CanvasRenderingContext2D;
    //private locationX:number;
    //private locationY:number;
    private imageOffset:number;
    private imageOffset2:number;
    //private startTime:number= 0;
    private slowTime:number= 0;
    private spinning:boolean = false;
    private stopAtValue:number = 0;
    private stopping:boolean = false;
    private reelSpeed:number = 10;
    private stopInitiated:boolean = false;
    private slowing:boolean = false;

    constructor(private context: CanvasRenderingContext2D,private locationX:number,private locationY:number,private stopPoint:number) {
        //Set up nine safes in a grid pattern
        //OFFSET INITIALLY SET TO x200 y169

        this.reelImage.src = '../../graphics/slot_reel_vert.png';
        console.log('Image dimensions',this.reelImage.width, this.reelImage.height);
        console.log('Canvas dimensions',this.context.canvas.width,this.context.canvas.height);
        this.imageOffset = (this.reelImage.height - this.context.canvas.height) / 2;
        this.imageOffset2 = this.imageOffset + this.reelImage.height;
    }

    stopSpin() {
        const enumValues = Object.keys(Images);
        console.log((enumValues.length /2) - 1);
        const selectedVal = getRandomIntInclusive(0,(enumValues.length / 2)-1);
        console.log('Selected value',selectedVal,Images[selectedVal]);
        this.stopAtValue = (selectedVal * IMG_HEIGHT) - (IMG_HEIGHT / 2);
        this.stopInitiated = true;
        //this.slowing = true;
        //this.stopping = true;
    }

    startSpin() {
        this.spinning = true;
    }

    private inRange(val:number,min:number,max:number):boolean {
        if(val >= min && val <= max) {
            return true;
        } 
        return false;
    }

    private imageAtTop():boolean {
        // if(this.stopping) {
            if( this.inRange((this.locationY - this.imageOffset) + (this.stopAtValue + IMG_HEIGHT),0,10)
                || this.inRange((this.locationY - this.imageOffset2) + (this.stopAtValue + IMG_HEIGHT),0,10)
            ) {
               return true; 
            }
        //}
        return false;
    }

    private slowSpin(currentTime) {
        if(this.imageAtTop() && this.stopInitiated) {
            console.log('Image at top');
            this.stopInitiated = false;
            this.slowing = true;
            
            this.stopping = true;
        }
        
        if(this.reelSpeed <= 1) {
            this.slowing = false;
            //this.stopping = true;
        }

        if(this.slowing) {
            if(Math.floor(currentTime / 500) > this.slowTime) {
                this.slowTime = Math.floor(currentTime / 500);
                this.reelSpeed = Math.floor(this.reelSpeed  / 1.5);
                //     this.imageOffset -= 30;
                //     this.imageOffset2 -= 30;
            }
        }
        //console.log('Slowing', this.reelSpeed);
    }

    private checkStop() {
        if(this.stopping && !this.slowing) {
            if( (this.locationY - this.imageOffset) + (this.stopAtValue + IMG_HEIGHT) === this.stopPoint
                || (this.locationY - this.imageOffset2) + (this.stopAtValue + IMG_HEIGHT) === this.stopPoint 
            ) {
                this.spinning = false;
                this.stopping = false;
            }
        }
    }

    draw(currentTime:number):void {
        //Control movement
        this.slowSpin(currentTime);
        this.checkStop();
        if(this.spinning) {
            // if(Math.floor(currentTime / 500) > this.startTime) {
            //     this.startTime = Math.floor(currentTime / 500);
            //     this.imageOffset -= 30;
            //     this.imageOffset2 -= 30;
            // }

            this.imageOffset -= this.reelSpeed;
            this.imageOffset2 -= this.reelSpeed;
            //Reset the image when off screen
            if(this.imageOffset <= this.context.canvas.height * -1) {
                this.imageOffset = this.imageOffset2 + this.reelImage.height;
            }
            if(this.imageOffset2 <= this.context.canvas.height * -1) {
                this.imageOffset2 = this.imageOffset + this.reelImage.height;
            }
        }
        //console.log('currentTime', Math.floor(currentTime / 1000), this.imageOffset, this.imageOffset2);
        this.context.drawImage(this.reelImage,this.locationX,this.locationY - this.imageOffset);
        this.context.drawImage(this.reelImage,this.locationX,this.locationY  - this.imageOffset2);
    }


}
