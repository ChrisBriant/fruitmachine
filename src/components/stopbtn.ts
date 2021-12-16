 
export class StopButton {
    private btnImage:HTMLImageElement = new Image();

    constructor(private context: CanvasRenderingContext2D,private locationX:number,private locationY:number) {
        //Set up nine safes in a grid pattern
        //OFFSET INITIALLY SET TO x200 y169

        this.btnImage.src = '../../graphics/SpinA.png';
    }

    notifyClick(x:number,y:number,callBack:Function) {
        if( (x > this.locationX && x < (this.locationX + this.btnImage.width)) 
            && (y > this.locationY && y < (this.locationY + this.btnImage.height))
        ) {
            console.log('Button Clicked');
            callBack();
        } else {
            console.log('Not Clicked');
        } 
    }

    draw(currentTime:number):void {
        this.context.drawImage(this.btnImage,this.locationX,this.locationY);
    }

}