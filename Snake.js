var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bot = new Bot(ctx, cvs);
var fruit = new Fruit(ctx, cvs);

function runner() {

    ctx.clearRect(0, 0, cvs.width, cvs.height);
    bot.draw();
    fruit.draw();
    bot.click(fruit);
    requestAnimationFrame(runner);
}

runner();