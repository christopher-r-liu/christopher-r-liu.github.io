var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");



const CANVAS_WIDTH = canvas.width = window.innerWidth*0.75;
const CANVAS_HEIGHT = canvas.height = window.innerHeight*0.75;


   
    var x = canvas.width/2;
    var y = canvas.height-100;
    var dx = 2;
    var dy = -2;
    var paddleHeight = 10;
    var paddleWidth = 150;
    var paddleX = (canvas.width-paddleWidth)/2;
    var rightPressed = false;
    var leftPressed = false;
    var flowerRowCount = 6;
    var flowerColumnCount = 4;
    var flowerWidth = 100;//flower radius
    var flowerHeight = 100;
    var flowerPadding = 10;
    var flowerOffsetTop = 100;
    var flowerOffsetLeft = (canvas.width-flowerColumnCount *(flowerWidth + flowerPadding))/2;
    var score = 0;
    var lives = 3;

    const playerImage = new Image();

//playerImage.src = '/image/shadow_dog.png';
playerImage.src = '../images/bees.png';
const spritWidth = 273;
const spritHeight = 282;
var beeFrame = 0;
let staggerFrames = 5;




var beeWidth = spritWidth/6;
var beeHeight = spritHeight/6;





    var flowers = [];
    for(var c=0; c<flowerColumnCount; c++) {
        flowers[c] = [];
        for(var r=0; r<flowerRowCount; r++) {
            flowers[c][r] = { x: 0, y: 0, status: 1 };
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
        for(var c=0; c<flowerColumnCount; c++) {
            for(var r=0; r<flowerRowCount; r++) {
                var b = flowers[c][r];
                if(b.status == 1) {
                    if(x+ beeWidth/2 > b.x && x + beeWidth/2 < b.x+flowerWidth && y + beeHeight/2 > b.y && y + beeHeight/2< b.y+flowerHeight) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if(score == flowerRowCount*flowerColumnCount) {
                           // draw();
                            //OU WIN, CONGRATS!");
                           //document.location.reload();
                        }
                    }
                }
            }
        }
    }

   

    function drawBee(){
        let position = Math.floor(beeFrame / staggerFrames) % 13;//spriteAnimations[actualState]
    //.loc.length;
let frameX = spritWidth * position;
let frameY = 0; //spriteAnimations[actualState].loc[position].y;

ctx.drawImage(playerImage, frameX , frameY, spritWidth,
    spritHeight, x, y, beeWidth, beeHeight)
beeFrame++;

    }

    function drawStaticBee(){
        let position = Math.floor(beeFrame / staggerFrames) % 13;//spriteAnimations[actualState]
    //.loc.length;
let frameX = 0;//spritWidth * position;
let frameY = 0; //spriteAnimations[actualState].loc[position].y;

ctx.drawImage(playerImage, spritWidth , frameY, spritWidth,
    spritHeight, x, y, beeWidth, beeHeight)
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
   

    function drawFlowers(){

        var colorArray = [];
                colorArray.push("red"); // 0
                colorArray.push("orange"); // 1
                colorArray.push("blue"); // 2
                colorArray.push("purple"); // 3

                var centerX = 120;
                var centerY = 200;
                var radius = 50;
              

        for(var c=0; c<flowerColumnCount; c++) {
            for(var r=0; r<flowerRowCount; r++) {
                if(flowers[c][r].status == 1) {
                    var flowerX = (r*(flowerWidth+flowerPadding))+flowerOffsetLeft;
                    var flowerY = (c*(flowerHeight+flowerPadding))+flowerOffsetTop;
                    flowers[c][r].x = flowerX;
                    flowers[c][r].y = flowerY;
                 

                    var colorIndex = Math.round(Math.random() * (colorArray.length - 1));
                    
                    var thisFlower = new Flower(ctx, flowerX, flowerY, radius, 5, colorArray[colorIndex]);
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

    function drawWin() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("You Win! ", CANVAS_WIDTH/2, CANVAS_HEIGHT*0.75);
    }

    function drawLose() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("You Lose! ", CANVAS_WIDTH/2, CANVAS_HEIGHT*0.75);
    }
    function drawLives() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: "+lives, canvas.width-65, 20);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
       // drawflowers();
       // drawBall();
       
       drawFlowers();
        drawPaddle();
        drawScore();
        drawLives();
        drawBee();
        if(lives>0) collisionDetection();

        if(score == flowerRowCount*flowerColumnCount) {
            dx=0;
            dy=0;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawFlowers();
            drawPaddle();
            drawScore();
            drawLives();
            drawBee();
         drawWin();
         document.getElementById("playButton").disabled = false;
         return;
         }
         
         if (lives == 0){
            dx=0;
            dy=0;
           
       
            drawLose();
            document.getElementById("playButton").disabled = false;
           return;
         }

        if(x + dx > canvas.width-beeWidth || x + dx< 0) {
            dx = -dx;
        }
       
        if(y + dy < beeHeight) {
            dy = - dy;
        }
        else if(y + dy > canvas.height-beeHeight*1.2) {
            console.log(y);
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = - dy;
            }
            else {
                
                // if(!lives) {
                //     alert("GAME OVER");
                //     document.location.reload();
                //     document.getElementById("playButton").disabled = false;
                // }
                if(lives >0) {
                    lives--;
                    x = canvas.width/2;
                    y = canvas.height-100;
                    dx = 5;
                    dy = -5;
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

        x +=  dx;
        y +=  dy;
        requestAnimationFrame(draw);
    }

    function Flower(context, centerX, centerY, radius, numPetals, color){
        this.context = context; 
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


function loadScene(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawFlowers();
     drawPaddle();
     drawScore();
     drawLives();
     //drawBee();
     drawStaticBee();

    
    // requestAnimationFrame(loadScene);

};

    loadScene();

    function startPlay(){
        document.getElementById("playButton").disabled = true;
       // document.location.reload();
        x = canvas.width/2;
     y = canvas.height-100;
    dx = 3;
     dy = -3;
     score =0;
     lives =3;

       flowers = [];
        for(var c=0; c<flowerColumnCount; c++) {
            flowers[c] = [];
            for(var r=0; r<flowerRowCount; r++) {
                flowers[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
       
        draw();

    }

    