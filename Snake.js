var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var info = document.getElementById("num");
var infoNum = document.getElementById("bot");

var bot = new Bot(ctx, cvs);

function draw() {

    ctx.clearRect(0, 0, cvs.width, cvs.height);
    bot.draw();
}

function runner() {

    draw();

    requestAnimationFrame(runner);
}

runner();