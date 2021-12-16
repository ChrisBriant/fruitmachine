var DrawScreen = /** @class */ (function () {
    function DrawScreen(context) {
        this.context = context;
        this.frameImage = new Image();
        this.frameImage.src = '../../graphics/frame.png';
    }
    DrawScreen.prototype.draw = function (currentTime) {
        this.context.drawImage(this.frameImage, 80, 200);
        this.context.drawImage(this.frameImage, 300, 200);
        this.context.drawImage(this.frameImage, 520, 200);
    };
    return DrawScreen;
}());
export { DrawScreen };
//# sourceMappingURL=drawscreen.js.map