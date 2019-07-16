var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var info = document.getElementById("num");
var infoNum = document.getElementById("bot");

var bots = [];
for (var i = 0; i < 100; i++) {
    bots.push(new Bot(ctx, cvs));
}

var num = 0;
var gen = 0;

function botCompare(a, b) {
    return b.fitness - a.fitness;
}

function evolve() {

    bots.sort(botCompare);
    generation += 1;

    var nextGen = [];

    for (var i = 0; i < 50; i++) {
        var newBot = new Bot(ctx, cvs);
        newBot.wih = bots[i].wih;
        newBot.who = bots[i].who;
        nextGen.push(newBot);
    }

    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 1; j++) {
            var newBot = new Bot(ctx, cvs);
            newBot.wih = crossover(bots[i].wih, bots[j].wih)[0];
            newBot.who = crossover(bots[i].who, bots[j].who)[0];
            nextGen.push(newBot);
        }
    }

    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 3; j++) {
            var r1 = Math.floor(Math.random() * 50);
            var newBot = new Bot(ctx, cvs);
            newBot.wih = crossover(bots[i].wih, bots[r1].wih)[0];
            newBot.who = crossover(bots[i].who, bots[r1].who)[0];
            nextGen.push(newBot);
        }
    }

    // for (var i = 0; i < 10; i++) {
    //     nextGen.push(new Bot(ctx, cvs));
    // }

    // for (var i = 0; i < 50; i++) {
    //     var r1 = Math.floor(Math.random() * 50);
    //     var r2 = Math.floor(Math.random() * 50);
    //     var newBot = new Bot(ctx, cvs);
    //     newBot.wih = crossover(bots[r1].wih, bots[r2].wih)[0];
    //     newBot.who = crossover(bots[r1].who, bots[r2].who)[0];
    //     nextGen.push(newBot);
    // }

    for (var i = 20; i < 100; i++) {
        if (Math.random() > 0.6) {
            nextGen[i].wih = mutate(nextGen[i].wih);
            nextGen[i].who = mutate(nextGen[i].who);
        }
    }

    num = 0;
    bots = nextGen;
}

function draw() {

    ctx.clearRect(0, 0, cvs.width, cvs.height);
    bots[num].draw();

}

function runner() {

    draw();
    bots[num].click();

    if (bots[num].live == false) {
        num += 1;
        if (num >= bots.length) {
            evolve();
            num = 0;
            gen += 1;
        }
    }

    requestAnimationFrame(runner);
}

runner();