class Bot {
    constructor(ctx, cvs) {
        this.side = 10;
        this.ctx = ctx;
        this.cvs = cvs;
        this.velX = 0;
        this.velY = 0;
        this.body = [[(Math.floor((Math.random() * cvs.width) / 10)) * 10, (Math.floor((Math.random() * cvs.height) / 10)) * 10]];
        this.live = true;
        this.fitness = 0;
        this.length = 2;
        this.timeLeft = 200;

        // From 6 to 12
        this.wih = [];

        for (var i = 0; i < 12; i++) {
            var a = [];
            for (var j = 0; j < 6; j++) {
                a.push(randomNumber(100000, -100000));
            }
            this.wih.push(a);
        }

        // From 10 to 4
        this.who = [];

        for (var i = 0; i < 4; i++) {
            var a = [];
            for (var j = 0; j < 12; j++) {
                a.push(randomNumber(100000, -100000));
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

        var x = this.body[this.body.length - 1][0];
        var y = this.body[this.body.length - 1][1];

        // INPUTS: up, down, left, right, fruit, fruit
        var up = y;
        for (var i = 0; i < this.body.length - 1; i++) {
            if (this.body[i][0] == x && this.body[i][1] < y) {
                var oldUp = up;
                up = y - (this.body[i][1] + this.side);
                if (oldUp < up) {
                    up = oldUp;
                }
            }
        }

        var down = this.cvs.height - y - this.side;
        for (var i = 0; i < this.body.length - 1; i++) {
            if (this.body[i][0] == x && this.body[i][1] > y) {
                var oldUp = up;
                up = this.body[i][1] + this.side - y;
                if (oldUp < up) {
                    up = oldUp;
                }
            }
        }

        var left = x;
        for (var i = 0; i < this.body.length - 1; i++) {
            if (this.body[i][1] == y && this.body[i][0] < x) {
                var oldLeft = left;
                left = x - (this.body[i][0] + this.side);
                if (oldLeft < left) {
                    left = oldLeft;
                }
            }
        }

        var right = this.cvs.width - x - this.side;
        for (var i = 0; i < this.body.length - 1; i++) {
            if (this.body[i][1] == y && this.body[i][0] > x) {
                var oldLeft = left;
                left = this.body[i][0] + this.side - x;
                if (oldLeft < left) {
                    left = oldLeft;
                }
            }
        }

        var fruitX = fruit.x - this.body[this.body.length - 1][0];
        if (fruitX > 0) {
            fruitX = 1;
        } else if (fruitX < 0) {
            fruitX = -1;
        }
        var fruitY = fruit.y - this.body[this.body.length - 1][1];
        if (fruitY > 0) {
            fruitY = 1;
        } else if (fruitY < 0) {
            fruitY = -1;
        }

        var inputs = transpose([up, down, left, right, fruitX, fruitY]);
        var hiddenOutput = matrixMultiply(this.wih, inputs);
        var hiddenResult = applySigmoid(hiddenOutput);
        var outputs = matrixMultiply(this.who, hiddenResult);
        var result = applySigmoid(outputs);

        console.table(inputs)

        if (result[0][0] > 0.5) {
            if (this.velX == -1) {
                this.live = false;
            } else {
                this.velX = 1;
                this.velY = 0;
                this.fitness += 10;
            }
        } else if (result[1][0] > 0.5) {
            if (this.velX == 1) {
                this.live = false;
            } else {
                this.velX = -1;
                this.velY = 0;
                this.fitness += 10;
            }
        } else if (result[2][0] > 0.5) {
            if (this.velY == -1) {
                this.live = false;
            } else {
                this.velX = 0;
                this.velY = 1;
                this.fitness += 10;
            }
        } else if (result[3][0] > 0.5) {
            if (this.velY == 1) {
                this.live = false;
            } else {
                this.velX = 0;
                this.velY = -1;
                this.fitness += 10;
            }            
        }

    }

    click(fruit) {

        this.calculate(fruit);
        let currX = this.body[this.body.length - 1][0];
        let currY = this.body[this.body.length - 1][1];
        if (this.length == this.body.length) {
            this.body.shift();
        }
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

        if (newBox[0] < 0 || newBox[0] >= this.cvs.width) {
            this.live = false;
        }

        if (newBox[1] < 0 || newBox[1] >= this.cvs.height) {
            this.live = false;
        }

        this.timeLeft -= 1;
        if (this.timeLeft < 0) {
            this.live = false;
        }

        this.body.push(newBox);
        this.fitness += 1;
    }
}

function randomNumber(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}