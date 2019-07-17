var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var info = document.getElementById("num");
var infoNum = document.getElementById("bot");

var bots = [];
for (var i = 0; i < 100; i++) {
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

    for (var i = 0; i < 25; i++) {
        var newBot = new Bot(ctx, cvs);
        newBot.wih = bots[i].wih;
        newBot.who = bots[i].who;
        nextGen.push(newBot);
    }

    for (var i = 0; i < 5; i++) {
        for (var j = i + 1; j < i + 6; j++) {
            var newBot = new Bot(ctx, cvs);
            var newBot2 = new Bot(ctx, cvs);
            [newBot.wih, newBot2.wih] = crossover(bots[i].wih, bots[j].wih);
            [newBot.who, newBot2.who] = crossover(bots[i].who, bots[j].who);
            nextGen.push(newBot);
            nextGen.push(newBot2);
        }
    }

    for (var i = 0; i < 25; i++) {
        var r1 = Math.floor(Math.random() * 25);
        var r2 = Math.floor(Math.random() * 25);
        var newBot = new Bot(ctx, cvs);
        newBot.wih = crossover(bots[r1].wih, bots[r2].wih)[0];
        newBot.who = crossover(bots[r1].who, bots[r2].who)[0];
        nextGen.push(newBot);
    }

    for (var i = 0; i < 100; i++) {
        if (Math.random() > 0.7) {
            nextGen[i].wih = mutate(nextGen[i].wih);
            nextGen[i].who = mutate(nextGen[i].who);
        }
    }

    num = 0;
    bots = nextGen;
}

function runner() {

    ctx.clearRect(0, 0, cvs.width, cvs.height);
    bots[num].draw();
    fruit.draw();


    bots[num].click(fruit);
    if (bots[num].body[bots[num].body.length - 1][0] == fruit.x && bots[num].body[bots[num].body.length - 1][1] == fruit.y) {
        bots[num].fitness += 200;
        fruit = new Fruit(ctx, cvs);
        bots[num].length += 1;
        bots[num].timeLeft += 1000;
    }

    if (bots[num].live == false) {
        fruit = new Fruit(ctx, cvs);
        num += 1;
        return;
        if (num >= bots.length) {
            evolve();
            num = 0;
        }
    }

    info.innerHTML = generation;
    infoNum.innerHTML = num;

    requestAnimationFrame(runner);
}

runner();