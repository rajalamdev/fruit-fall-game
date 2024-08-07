var music = new Audio();
var smashSound = new Audio();
smashSound.src = 'sounds/smash.mp3';
var bleepSound = new Audio();
bleepSound.src = 'sounds/bleep.wav';

var gameRunning = false;
var ctx,
    imgBg,
    s = 4,
    x = 0,
    y = 0,
    noOfDrops = 500,
    fallingDrops = [];

var img1 = "fruitcatcher/1.png",
    img2 = "fruitcatcher/2.png",
    img3 = "fruitcatcher/3.png",
    img4 = "fruitcatcher/4.png",
    img5 = "fruitcatcher/5.png",
    img6 = "fruitcatcher/6.png",
    img7 = "fruitcatcher/7.png",
    img8 = "fruitcatcher/8.png";    
    img9 = "fruitcatcher/9.png";    
var basket = new Image();
basket.src = "fruitcatcher/basket.png";
var time = new Image();
time.src = "fruitcatcher/time.png";
var coins = new Image();
coins.src = "fruitcatcher/coins.png";
var pauseIcon = new Image();
pauseIcon.src = "fruitcatcher/pause.png";
var close = new Image();
close.src = "fruitcatcher/close.png";
var score = 0,
    seconds = 60,
    highscore = localStorage.getItem("highscore");



function tick() {
    seconds--;
    if (seconds > 0) {
        setTimeout(tick, 1000);
    }
    else if(seconds <= 0) {
        seconds = 0
        alert("GAME OVER " + " YOUR SCORE IS: " + score);
        document.location.reload();
    }
}
function pause() {
    alert("GAME IS PAUSED! PRESS SPACE AGAIN TO CONTINUE!");
    draw();
}


function drawBackground() {
    ctx.drawImage(imgBg, 0, 0);
    ctx.drawImage(time, 3, 6);
    ctx.font = ("30px Comic Sans MS");
    ctx.fillStyle = "white";
    ctx.fillText(seconds + " sec", 50, 35);
    ctx.fillText(score, 250, 35);
    ctx.drawImage(coins, 200, 7);
    ctx.fillText("Highscore: " + highscore, 320, 35);
    ctx.drawImage(pauseIcon, 699, 11);
    ctx.drawImage(close, 756, 8);
    player.render();
}

function speedUp() {
    s+=3;
    console.log("SPEED UP")
}
setInterval(speedUp, 10000);





function Player() {
    this.x = 0, this.y = 0, this.w = 50, this.h = 50;
    this.render = function () {
        ctx.drawImage(basket, this.x, this.y);
    }
}


function setup() {
    var canvas = document.getElementById('my_canvas');
    ctx = canvas.getContext('2d');
    imgBg = new Image();
    imgBg.src = "fruitcatcher/bg.png";
    setInterval(draw, 36);
    for (var i = 0; i < noOfDrops; i++) {
        var fallingDr = [];
        fallingDr["image"] = new Image();
        var yourImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
        var randomImage = Math.floor(Math.random() * yourImages.length);
        fallingDr.image.src = yourImages[randomImage];
        fallingDr["x"] = Math.random() * 730;
        fallingDr["y"] = 50;
        fallingDr["speed"] = 1;
        fallingDrops.push(fallingDr);
    }
}


window.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        if (!gameRunning) {
            setup();
            tick();
            gameRunning = true;
            music.src = 'sounds/MarimbaBoy.wav';
            music.loop = true;
            music.play()
        }
    }
});

window.addEventListener('keyup', function (event) {
    if (event.keyCode === 32) {
        pause();
    }
});



var player = new Player();
player.x = 330;  //initial x
player.y = 510;  // initial y
player.velX = 0;
player.speed = 4;
player.friction = 0.6; // friction
player.keys = [];

function draw() {
    drawBackground();
    for (var i = 0; i < 1; i++) {
        ctx.drawImage(fallingDrops[i].image, fallingDrops[i].x, fallingDrops[i].y); //The rain drop
        fallingDrops[i].y += s; //Set the falling speed
        var b = fallingDrops,
            c = b[i].image.src,
            d = c.length,
            e = c.charAt(d-5);
            console.log(d, e)
        var random = Math.floor(Math.random() * fallingDrops.length);
        if (fallingDrops[i].y >= 600) {  //Repeat the raindrop when it falls out of view
            fallingDrops[i].image = fallingDrops[random].image;
            fallingDrops[i].y = 50;//Account for the image size
            fallingDrops[i].x = Math.random() * 600;    //Make it appear randomly along the width
            if (e != "9" && e != "8" && e != "7") {
                seconds -=3
                smashSound.play()
                if(seconds <= 0) {
                    seconds = 0
                }
            }
        }
        // console.log(fallingDrops[i].image.src);
        if (Math.abs(b[i].x - player.x) <= 80 && Math.abs(b[i].y - player.y) <= 50) {
            if (e === "1") {
                bleepSound.play()
                score++;
                b.splice([i], 1);
                seconds += 1
            }
            else if (e === "2") {
                bleepSound.play()
                score += 2;
                b.splice([i], 1);
                seconds += 1
            }
            else if (e === "3") {
                bleepSound.play()
                score += 3;
                b.splice([i], 1);
                seconds += 1
            }
            else if (e === "4") {
                bleepSound.play()
                score += 4;
                b.splice([i], 1);
                seconds += 1
            }
            else if (e === "5") {
                bleepSound.play()
                score += 5;
                b.splice([i], 1);
                seconds += 1
            }
            else if (e === "6") {
                bleepSound.play()
                score += 6;
                b.splice([i], 1);
                seconds += 1
            }
            else if (e === "7") {
                bleepSound.play()
                b.splice([i], 1);
                player.speed += 5
            }
            else if (e === "8") {
                bleepSound.play()
                b.splice([i], 1)
                seconds += 5;
            } else if (e === "9") {
                smashSound.play()
                b.splice([i], 1)
                seconds -= 5
                score -= 5
                if(seconds <= 0) {
                    seconds = 0
                }
            }
        }
    }
    if(highscore !== null){
        if (score > highscore) {
            localStorage.setItem("highscore", score);
        }
    }
    else{
        localStorage.setItem("highscore", score);
    }
    if (score >= highscore){
        document.getElementById("high").innerHTML = score
    }else {
        document.getElementById("high").innerHTML = highscore;
    }
}

function update() {
    requestAnimationFrame(update);

    // check the keys and do the movement.
    if (player.keys[39]) {
        if (player.velX < player.speed) {
            player.velX+=15;
        }
    }
    if (player.keys[37]) {
        if (player.velX > -player.speed) {
            player.velX-=15;
        }
    }
    // apply some friction to x velocity.
    player.velX *= player.friction;
    player.x += player.velX;

    // bounds checking
    if (player.x >= 675) {
        player.x = 675;
    } else if (player.x <= 5) {
        player.x = 5;
    }

    /*if (player.keys[32]){
        alert("GAME IS PAUSED!")
    }
*/
}

update();

// key events
document.addEventListener("keydown", function (e) {
    player.keys[e.keyCode] = true;
});
document.addEventListener("keyup", function (e) {
    player.keys[e.keyCode] = false;
});





