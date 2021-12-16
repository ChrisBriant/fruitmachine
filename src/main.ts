import {Reel} from "./components/reel.js";
import { StopButton } from "./components/stopbtn.js";
import { DrawScreen } from './components/drawscreen.js';

export class FruitMachine
{
    private previousUpdateTime:number;
    //Track mouse position
    public mouseX: number;
    public mouseY: number;

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private backgroundImage: HTMLImageElement = new Image();

    //Graphical components
    private reel1: Reel;
    private reel2: Reel;
    private reel3: Reel;
    private stopBtn: StopButton;
    private drawScreen: DrawScreen;

    //SET THE FRAME RATE
    //SOURCE
    //https://stackoverflow.com/questions/38031790/smooth-animation-in-html5-canvas
    private FRAMES_PER_SECOND = 60;  // Valid values are 60,30,20,15,10
    // set the mim time to render the next frame
    private FRAME_MIN_TIME = (1000/60) * (60 / this.FRAMES_PER_SECOND) - (1000/60) * 0.5;

    constructor()
    {
        console.log('hello');
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d");

        //Will need to change this image
        this.backgroundImage.src = "graphics/background_safe_minigame.png";
        this.backgroundImage.onload = this.update.bind( this );

        this.canvas.addEventListener('mousemove', (evt) => {
            this.mouseX = evt.offsetX;
            this.mouseY = evt.offsetY;
        });
        
        this.reel1 = new Reel(this.context,105,0,this.canvas.height /2);
        this.reel2 = new Reel(this.context,325,0,this.canvas.height /2);
        this.reel3 = new Reel(this.context,555,0,this.canvas.height /2);
        this.stopBtn = new StopButton(this.context,300,200);
        this.drawScreen = new DrawScreen(this.context);

        //On click events
        this.canvas.addEventListener('click', () => {
            this.stopBtn.notifyClick(this.mouseX, this.mouseY, () => { this.reel1.stopSpin() } );
        });

    }

    // Main Game Loop
    public update( currentTime: number ): void
    {
        const deltaTime: number = currentTime - this.previousUpdateTime;
        
        // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the background image
        //this.context.drawImage( this.backgroundImage, 0, 0 );
        this.context.beginPath();
        this.context.moveTo(0,this.canvas.height / 2 );
        this.context.lineTo(this.canvas.width,this.canvas.height /2);
        this.context.strokeStyle = '#ff0000';
        this.context.stroke();

        this.reel1.draw(currentTime);
        this.reel2.draw(currentTime);
        this.reel3.draw(currentTime);
        this.stopBtn.draw(currentTime);
        this.drawScreen.draw(currentTime);

        if(currentTime - deltaTime < this.FRAME_MIN_TIME) {
            return;
        } else {
            window.requestAnimationFrame( this.update.bind( this ) );
        }
        this.previousUpdateTime = currentTime;
    }
}

console.log('hello');
new FruitMachine();

