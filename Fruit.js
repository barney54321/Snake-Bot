class Fruit {
    constructor(ctx, cvs) {
        this.ctx = ctx;
        this.cvs = cvs;
        this.x = (Math.floor((Math.random() * cvs.width) / 10)) * 10;
        this.y = (Math.floor((Math.random() * cvs.height) / 10)) * 10;
    }

    draw() {
        this.ctx.fillStyle = "#ff0000";
        this.ctx.fillRect(this.x, this.y, 10, 10);
    }
}