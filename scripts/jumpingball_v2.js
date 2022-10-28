

$(document).ready(function () {



    startGame();


});


    var myGamePiece;
    var myObstacles = [];
var myScore;
var mySound;

function startGame() {
    myGameArea = new gamearea();
        myGamePiece = new component(20, 20, "red", 20, 75,"ball");
    myGamePiece.gravity = 0.05;
    myScore = new component("15px", "Consolas", "black", 220, 25, "text");
    mySound = new sound("../sounds/gameover.wav");
    myGameArea.start();
}

function gamearea()  {
   

    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth*0.75;;
    this.canvas.height = window.innerHeight*0.5;;
   // console.log(document.getElementById("canvascontainer"));
    document.getElementById("canvascontainer").appendChild(this.canvas);
    this.context = this.canvas.getContext("2d");
    this.pause = false;
    this.frameNo = 0;
    this.start = function () {
        this.interval = setInterval(updateGameArea, 20);
    }
    this.stop = function () {
        clearInterval(this.interval);
        this.pause = true;
    }
    this.clear = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
        this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.bounce = 0.6;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
        ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
        else if (this.type == "ball"){
            //ctx.fillStyle = color;
            //ctx.fillCircle(this.x, this.y, this.width, this.height);
            drawCircle(ctx, color, this.x+10, this.y, this.width, this.height);
        }
          else {
        ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
        this.hitTop();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
        this.y = rockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        }
    }
    this.hitTop = function() {
        var rocktop = this.height;
        if (this.y < rocktop) {
        this.y = rocktop;
        this.gravitySpeed = -(this.gravitySpeed);
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
        crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length;i++) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            mySound.play();
            myGameArea.stop();
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 100;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(20, height, "blue", x, 0));
        myObstacles.push(new component(20, x - height - gap, "blue", x, height + gap));
    }
    for (i = 0; i < myObstacles.length;i++) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
        myGamePiece.gravity = n;
}

function restartGame() {
    //document.getElementById("myfilter").style.display = "none";
    //document.getElementById("myrestartbutton").style.display = "none";

    myGameArea.stop();
    myGameArea.clear();
    myGameArea = {};
    myGamePiece = {};
    myObstacles = [];
    myscore = {};
    document.getElementById("canvascontainer").innerHTML = "";
    startGame()
}


function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}
//drawCircle(ctx, color, this.x, this.y, this.width, this.height));

function drawCircle(ctx,color, x, y, r,r) {
    //const canvas = document.getElementById('myCanvas');
    //const context = canvas.getContext('2d');
    //const centerX = canvas.width / 2;
    //const centerY = canvas.height / 2;
    //const radius = 70;

    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
}

