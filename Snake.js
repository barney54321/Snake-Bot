var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var info = document.getElementById("num");
var infoNum = document.getElementById("bot");

var bots = [];
for (var i = 0; i < 200; i++) {
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
    for (var i = 0; i < 100; i++) {
        var newBot = new Bot(ctx, cvs);
        newBot.wih = bots[i].wih;
        newBot.who = bots[i].who;
        nextGen.push(newBot);
    }

    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var r1 = Math.floor(Math.random() * 50);
            var newBot = new Bot(ctx, cvs);
            newBot.wih = crossover(bots[i].wih, bots[r1].wih)[0];
            newBot.who = crossover(bots[i].who, bots[r1].who)[0];
            nextGen.push(newBot);
        }
    }

    // for (var i = 0; i < 50; i++) {
    //     var r1 = Math.floor(Math.random() * 50);
    //     var r2 = Math.floor(Math.random() * 50);
    //     var newBot = new Bot(ctx, cvs);
    //     newBot.wih = crossover(bots[r1].wih, bots[r2].wih)[0];
    //     newBot.who = crossover(bots[r1].who, bots[r2].who)[0];
    //     nextGen.push(newBot);
    // }

    for (var i = 20; i < 200; i++) {
        if (Math.random() > 0.6) {
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
        bots[num].fitness += 1000;
        fruit = new Fruit(ctx, cvs);
        bots[num].length += 1;
        bots[num].timeLeft += 1000;
    }

    if (bots[num].live == false) {
        fruit = new Fruit(ctx, cvs);
        num += 1;
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