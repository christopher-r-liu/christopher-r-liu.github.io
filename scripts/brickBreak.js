var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var ballRadius = 10;
    var x = canvas.width/2;
    var y = canvas.height-30;
    var dx = 2;
    var dy = -2;
    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (canvas.width-paddleWidth)/2;
    var rightPressed = false;
    var leftPressed = false;
    var brickRowCount = 5;
    var brickColumnCount = 3;
    var brickWidth = 75;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 30;
    var score = 0;
    var lives = 3;

    const playerImage = new Image();

//playerImage.src = '/image/shadow_dog.png';
playerImage.src = '../images/bees.png';
const spritWidth = 273;
const spritHeight = 282;
var beeFrame = 0;
let staggerFrames = 5;



var beeSize = spritWidth/6;





    var bricks = [];
    for(var c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(var r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

    function keyDownHandler(e) {
        if(e.code  == "ArrowRight") {
            rightPressed = true;
        }
        else if(e.code == 'ArrowLeft') {
            leftPressed = true;
        }
    }
    function keyUpHandler(e) {
        if(e.code == 'ArrowRight') {
            rightPressed = false;
        }
        else if(e.code == 'ArrowLeft') {
            leftPressed = false;
        }
    }
    function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth/2;
        }
    }
    function collisionDetection() {
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                var b = bricks[c][r];
                if(b.status == 1) {
                    if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if(score == brickRowCount*brickColumnCount) {
                            alert("YOU WIN, CONGRATS!");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#0000FF";
        ctx.fill();
        ctx.closePath();
    }

    function drawBee(){
        let position = Math.floor(beeFrame / staggerFrames) % 13;//spriteAnimations[actualState]
    //.loc.length;
let frameX = spritWidth * position;
let frameY = 0; //spriteAnimations[actualState].loc[position].y;

ctx.drawImage(playerImage, frameX , frameY, spritWidth,
    spritHeight, x, y, spritWidth/5, spritHeight/5)
beeFrame++;

    }

    function drawMonster(){

    }


    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0000FF";
        ctx.fill();
        ctx.closePath();
    }
    function drawBricks() {
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                if(bricks[c][r].status == 1) {
                    var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#800000";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    function drawFlowers(){

        var colorArray = [];
                colorArray.push("red"); // 0
                colorArray.push("orange"); // 1
                colorArray.push("blue"); // 2
                colorArray.push("purple"); // 3

                var centerX = 120;
                var centerY = 200;
                var radius = 50;
                // var colorIndex = Math.round(Math.random() * (colorArray.length - 1));
                    
                // var thisFlower = new Flower(context, centerX, centerY, radius, 5, colorArray[colorIndex]);
                // thisFlower.draw();

        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                if(bricks[c][r].status == 1) {
                    var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    // ctx.beginPath();
                    // ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    // ctx.fillStyle = "#800000";
                    // ctx.fill();
                    // ctx.closePath();

                    var colorIndex = Math.round(Math.random() * (colorArray.length - 1));
                    
                    var thisFlower = new Flower(ctx, brickX, brickY, radius, 5, colorArray[colorIndex]);
                thisFlower.draw();


                }
            }
        }        
    }


    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: "+score, 8, 20);
    }
    function drawLives() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: "+lives, canvas.width-65, 20);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
       drawBricks();
       drawBall();
       //drawFlowers();
        drawPaddle();
        drawScore();
        drawLives();
       //drawBee();
        collisionDetection();

        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if(y + dy < ballRadius) {
            dy = -dy;
        }
        else if(y + dy > canvas.height-ballRadius) {
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                lives--;
                if(!lives) {
                    alert("GAME OVER");
                    document.location.reload();
                }
                else {
                    x = canvas.width/2;
                    y = canvas.height-30;
                    dx = 2;
                    dy = -2;
                    paddleX = (canvas.width-paddleWidth)/2;
                }
            }
        }

        if(rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 7;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        x += dx;
        y += dy;
        requestAnimationFrame(draw);
    }

    function Flower(context, centerX, centerY, radius, numPetals, color){
        this.context = context;/*  ww  w  .  j a v  a 2  s .  c  o m*/
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
        this.numPetals = numPetals;
        this.color = color;
    }
    
    // Define Flower draw method
    Flower.prototype.draw = function(){
        var context = this.context;
        context.beginPath();
        
        // draw petals
        for (var n = 0; n < this.numPetals; n++) {
            var theta1 = ((Math.PI * 2) / this.numPetals) * (n + 1);
            var theta2 = ((Math.PI * 2) / this.numPetals) * (n);
            
            var x1 = (this.radius * Math.sin(theta1)) + this.centerX;
            var y1 = (this.radius * Math.cos(theta1)) + this.centerY;
            var x2 = (this.radius * Math.sin(theta2)) + this.centerX;
            var y2 = (this.radius * Math.cos(theta2)) + this.centerY;
            
            context.moveTo(this.centerX, this.centerY);
            context.bezierCurveTo(x1, y1, x2, y2, this.centerX, this.centerY);
        }
        
        context.closePath();
        context.fillStyle = this.color;
        context.fill();
        
        // draw yellow center
        context.beginPath();
        context.arc(this.centerX, this.centerY, this.radius / 5, 0, 2 * Math.PI, false);
        context.fillStyle = "yellow";
        context.fill();
    };

    draw();