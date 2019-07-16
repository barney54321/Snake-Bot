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

        // From 6 to 12
        this.wih = [];

        for (var i = 0; i < 12; i++) {
            var a = [];
            for (var j = 0; j < 6; j++) {
                a.push(randomNumber(100, -100));
            }
            this.wih.push(a);
        }

        // From 10 to 4
        this.who = [];

        for (var i = 0; i < 4; i++) {
            var a = [];
            for (var j = 0; j < 12; j++) {
                a.push(randomNumber(100, -100));
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
                ctx.fillRect(i * 10, j * 10, 10, 10);
            }
        }
    }

    calculate(fruit) {

    }

    click(fruit) {

    }
}

function randomNumber(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}