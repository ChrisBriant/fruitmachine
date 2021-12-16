var StopButton = /** @class */ (function () {
    function StopButton(context, locationX, locationY) {
        //Set up nine safes in a grid pattern
        //OFFSET INITIALLY SET TO x200 y169
        this.context = context;
        this.locationX = locationX;
        this.locationY = locationY;
        this.btnImage = new Image();
        this.btnImage.src = '../../graphics/SpinA.png';
    }
    StopButton.prototype.notifyClick = function (x, y, callBack) {
        if ((x > this.locationX && x < (this.locationX + this.btnImage.width))
            && (y > this.locationY && y < (this.locationY + this.btnImage.height))) {
            console.log('Button Clicked');
            callBack();
        }
        else {
            console.log('Not Clicked');
        }
    };
    StopButton.prototype.draw = function (currentTime) {
        this.context.drawImage(this.btnImage, this.locationX, this.locationY);
    };
    return StopButton;
}());
export { StopButton };
//# sourceMappingURL=stopbtn.js.map