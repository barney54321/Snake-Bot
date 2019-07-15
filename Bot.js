class Bot {
    constructor(ctx, cvs) {
        this.side = 10;
        this.ctx = ctx;
        this.cvs = cvs;
        this.velX = 1;
        this.velY = 0;
        this.body = [[0,0]];
        this.live = true;
        this.fitness = 0;
    }

    draw() {
        for (var i = this.body.length - 1; i >= 0; i--) { 
            this.ctx.fillStyle = "#000000";
            this.ctx.fillRect(this.body[i][0], this.body[i][1], this.side, this.side);
            // this.ctx.fillStyle = "#ffffff";
            // this.ctx.strokeRect(this.x + 20, this.y, this.side, this.side);
        }

    }

    calculate() {

    }

    click() {

        this.calculate();
        let currX = this.body[this.body.length - 1][0];
        let currY = this.body[this.body.length - 1][1];
        this.body.shift();
        var newBox = [];
        if (this.velX == 1) {
            newBox.push(currX + this.side);
            newBox.push(currY);
        } else if (this.velX == -1) {
            newBox.push(currX - this.side);
            newBox.push(currY);
        } else if (this.velY == 1) {
            newBox.push(currX);
            newBox.push(currY + this.side);
        } else {
            newBox.push(currX);
            newBox.push(currY - this.side);
        }

        for (var i = 0; i < this.body.length; i++) {
            if (this.body[i][0] == newBox[0] && this.body[i][1] == newBox[1]) {
                this.live = false;
                break;
            }
        }

        this.body.push(newBox);
        this.fitness += 1;
    }
}