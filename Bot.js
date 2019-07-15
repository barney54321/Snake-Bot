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

        // From 6 to 8
        this.wih = [];

        for (var i = 0; i < 8; i++) {
            var a = [];
            for (var j = 0; j < 6; j++) {
                a.push(randomNumber(1000, -1000));
            }
            this.wih.push(a);
        }

        // From 8 to 4
        this.who = [];

        for (var i = 0; i < 4; i++) {
            var a = [];
            for (var j = 0; j < 8; j++) {
                a.push(randomNumber(1000, -1000));
            }
            this.who.push(a);
        }

    }

    draw() {
        for (var i = this.body.length - 1; i >= 0; i--) { 
            this.ctx.fillStyle = "#000000";
            this.ctx.fillRect(this.body[i][0], this.body[i][1], this.side, this.side);
            // this.ctx.fillStyle = "#ffffff";
            // this.ctx.strokeRect(this.x + 20, this.y, this.side, this.side);
        }

    }

    calculate(fruit) {

        // INPUTS: up, down, left, right, fruit, fruit
        var up = this.body[this.body.length - 1][1];
        var down = this.cvs.height - this.body[this.body.length - 1][1] - this.side;
        var left = this.body[this.body.length - 1][0];
        var right = this.cvs.width - this.body[this.body.length - 1][0] - this.side;
        var fruitX = fruit.x - this.body[this.body.length - 1][0];
        var fruitY = fruit.y - this.body[this.body.length - 1][1];

        var inputs = transpose([up, down, left, right, fruitX, fruitY]);
        var hiddenOutput = matrixMultiply(this.wih, inputs);
        var hiddenResult = applySigmoid(hiddenOutput);
        var outputs = matrixMultiply(this.who, hiddenResult);
        var result = applySigmoid(outputs);

        if (result[0][0] > 0.5) {
            this.velX = 1;
            this.velY = 0;
        } else if (result[1][0] > 0.5) {
            this.velX = -1;
            this.velY = 0;
        } else if (result[2][0] > 0.5) {
            this.velX = 0;
            this.velY = 1;
        } else if (result[3][0] > 0.5) {
            this.velX = 0;
            this.velY = -1;
        }

    }

    click(fruit) {

        this.calculate(fruit);
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

function randomNumber(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}