export class DrawScreen {
    private frameImage:HTMLImageElement = new Image();

    constructor(private context: CanvasRenderingContext2D) {
        this.frameImage.src = '../../graphics/frame.png';
    }

    draw(currentTime:number):void {
        this.context.drawImage(this.frameImage,80,200);
        this.context.drawImage(this.frameImage,300,200);
        this.context.drawImage(this.frameImage,520,200);
    }
}