var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bots = [];
for (var i = 0; i < 20; i++) {
    bots.push(new Bot(ctx, cvs));
}
var num = 0;
var generation = 0;

var fruit = new Fruit(ctx, cvs);

function botCompare(a, b) {
    return b.fitness - a.fitness;
}

function evolve() {
    bots.sort(botCompare);
    generation += 1;

    var nextGen = [];
}

function runner() {

    ctx.clearRect(0, 0, cvs.width, cvs.height);
    bots[num].draw();
    fruit.draw();


    bots[num].click(fruit);
    if (bots[num].body[bots[num].body.length - 1][0] == fruit.x && bots[num].body[bots[num].body.length - 1][1] == fruit.y) {
        bots[num].fitness += 100;
        fruit = new Fruit(ctx, cvs);
        bots[num].length += 1;
    }

    if (bots[num].live == false) {
        num += 1;
        if (num >= bots.length) {
            evolve();
            return;
        }
    }

    requestAnimationFrame(runner);
}

runner();