class Bot {
    constructor(ctx, cvs) {
        this.ctx = ctx;
        this.cvs = cvs;

        this.game = [];
        for (var i = 0; i < 20; i++) {
            var row = [];
            for (var j = 0; j < 20; j++) {
                row.push(0);
            }
            this.game.push(row);
        }

        this.x = 10;
        this.y = 10;
        this.game[this.y][this.x] = 2;
        this.fruitX = Math.floor(Math.random() * 20);
        this.fruitY = Math.floor(Math.random() * 20);
        this.game[this.fruitY][this.fruitX] = -1;
        this.body = [[this.x, this.y]];
        this.length = 1;

        this.velX = 0;
        this.velY = 1;

        this.fitness = 0;
        this.live = true;

        // From 400 to 1000
        this.wih = [];

        for (var i = 0; i < 1000; i++) {
            var a = [];
            for (var j = 0; j < 400; j++) {
                a.push(randomNumber(10000, -10000));
            }
            this.wih.push(a);
        }

        // From 1000 to 4
        this.who = [];

        for (var i = 0; i < 4; i++) {
            var a = [];
            for (var j = 0; j < 1000; j++) {
                a.push(randomNumber(10000, -10000));
            }
            this.who.push(a);
        }

    }

    draw() {
        for (var i = 0; i < 20; i++) {
            for (var j = 0; j < 20; j++) {
                if (this.game[i][j] == 0) {
                    ctx.fillStyle = "#ffffff";
                } else if (this.game[i][j] == 1) {
                    ctx.fillStyle = "#000000";
                } else if (this.game[i][j] == 2) {
                    ctx.fillStyle = "#0000ff";
                } else {
                    ctx.fillStyle = "#ff0000";
                }
                ctx.fillRect(j * 10, i * 10, 10, 10);
            }
        }
    }

    calculate() {

        // Input: this.game (20*20 = 400)
        // Output: the four directions
        var inputs = [];

        for (var i = 0; i < 20; i++) {
            for (var j = 0; j < 20; j++) {
                inputs.push([this.game[i][j]]);
            }
        }

        var hiddenOutput = matrixMultiply(this.wih, inputs);
        var hiddenResult = applySigmoid(hiddenOutput);
        var outputs = matrixMultiply(this.who, hiddenResult);
        var result = applySigmoid(outputs);

        if (result[0][0] > 0.5) {
            this.velY = -1;
            this.velX = 0;
        } else if (result[1][0] > 0.5) {
            this.velY = 1;
            this.velX = 0;
        } else if (result[2][0] > 0.5) {
            this.velY = 0;
            this.velX = -1;
        } else if (result[3][0] > 0.5) {
            this.velY = 0;
            this.velX = 1;
        } 
    }

    click() {

        // Set head as body piece
        this.game[this.y][this.x] = 1;

        // Remove end piece
        if (this.length == this.body.length) {
            var [oldX, oldY] = this.body.shift();
            this.game[oldY][oldX] = 0;
        }

        // Change velocity
        this.calculate();

        // Set new coordinate
        var newX = this.x + this.velX;
        var newY = this.y + this.velY;

        // Check for death
        if (newX < 0 || newX >= 20) {
            this.live = false;
            return;
        } else if (newY < 0 || newY >= 20) {
            this.live = false;
            return;
        } else if (this.game[newY][newX] > 0) {
            this.live = false;
            return;
        }

        // Check for fruit 
        if (this.game[newY][newX] == -1) {
            this.fitness += 20;
            this.fruitX = Math.floor(Math.random() * 20);
            this.fruitY = Math.floor(Math.random() * 20);
        }

        // Set new gird space as head
        this.game[newY][newX] = 2;
        this.body.push([newX, newY]);
        this.x = newX;
        this.y = newY;

        this.fitness += 1;

    }
}

function randomNumber(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}