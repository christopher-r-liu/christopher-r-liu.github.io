const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');


console.log(ctx);

const CANVAS_WIDTH = canvas.width = window.innerWidth*0.75;
const CANVAS_HEIGHT = canvas.height = window.innerHeight*0.75;

const playerImage = new Image();
//playerImage.src = '/image/shadow_dog.png';
playerImage.src = '../images/shadow_dog.png';


const spritWidth = 575;
const spritHeight = 523;



var dogSize = spritWidth/10;
var x = spritWidth/5;
var y = canvas.height-spritHeight/5;
var dx = 0;
var dy =0;
var down = false;
var touchDown = false;




let playerState = "idle";
var actualState = "";
const dropdown = document.getElementById("trainSubject");
dropdown.addEventListener("change", function(e) {
    playerState=e.target.value;
    x = spritWidth/5;
    y = canvas.height-spritHeight/5;
    actualState = "";
    dx=5;
    dy= -8;
    down = false;
    touchDown = false;
   
});

let gameFrame = 0;
let staggerFrames = 5;
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames:7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    }, 
    {
        name: 'dizzle',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    },
];

animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spritWidth;
        let positionY = index * spritHeight;
        frames.loc.push({ x: positionX, y: positionY });

    }
    spriteAnimations[state.name] = frames;


});
console.log(spriteAnimations);



function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //ctx.fillRect(x, 50, 100, 100);
   // x++;
    //alert(spriteAnimations[playerState]
    //    .loc.length);

if(playerState=="run"){
    //console.log(gameFrame);
  
   
    if(actualState == "") actualState = playerState;

    drawDog(actualState);
    




if(x + dx > canvas.width-dogSize) {
    actualState='dizzle';
    x -= dogSize*1.2;
    dx = 0;
    //return;
}
if(y + dy < dogSize) {
    dy = -dy;
}
else if(y + dy > canvas.height- dogSize) {
    dy = -dy;
    
}

x += dx;
//y += dy;

requestAnimationFrame(animate)


}

else 
if(playerState=="jump"){
    //console.log(gameFrame);
 
   
    if(actualState == "") actualState = playerState;
    
    drawDog(actualState);


if(y + dy < dogSize) {
    actualState='fall';
    dy = -dy;
}
else if(y + dy > canvas.height- dogSize) {
    actualState='bite';
    y -= dogSize*0.75;
    dy=0;
    dx=0;
   
}

x += dx;
y += dy;

requestAnimationFrame(animate)


}

else if(playerState=="roll"){
    //console.log(gameFrame);
 
   
    if(actualState == "") actualState = "run";
    
    drawDog(actualState);
if(x + dx > canvas.width*0.2) {
    actualState='roll';
   
}

if(x + dogSize> canvas.width ) {
    actualState='roll';
    dx = -dx;
}
if( x  < 0) {
    actualState = "dizzle";
    x  = spritWidth/5;
    dx = 0;
}


x += dx;
//y += dy;

requestAnimationFrame(animate)


}
else if(playerState=="hurdles"){
    //console.log(gameFrame);


 
    drawPaddle(canvas.width/4, 200, 300, "red");
   // drawPaddle(canvas.width*0.6, 100, 100, "blue");

   
    if(actualState == "") actualState = "run";

    
    drawDog(actualState);

if(x + dx > canvas.width*0.18 && x + dx <= canvas.width*0.3) {
    actualState='jump';
    
   
   
}
if(x + dx > canvas.width*0.3  && !touchDown) {
    actualState='fall';
   down = true;
   
}
if(y - dy > canvas.height- dogSize) {
    actualState='run';
    y -= dogSize*0.75;
    dy=0;
    dx= 2;
    touchDown = true;
   
}

if(x + dx > canvas.width*0.9) {
    actualState='sit';
   // y -= dogSize/2;
    dy=0;
    dx= 0;
    touchDown = true;
   
}

// if(x + dx > canvas.width-dogSize ) {
//     actualState='roll';
//     dx = -dx;
// }
// if( x + dx < dogSize) {
//     actualState = "dizzle";
//     x  = spritWidth/5;
//     dx = 0;
// }


x += dx;

if(down == true) y -= dy;
else y += dy;

requestAnimationFrame(animate)


}


else{
    drawDog(playerState);
  

    requestAnimationFrame(animate)

}
    

};

animate();

function drawDog(currentState){

    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[currentState]
    .loc.length;
let frameX = spritWidth * position;
let frameY = spriteAnimations[currentState].loc[position].y;

ctx.drawImage(playerImage, frameX , frameY, spritWidth,
    spritHeight, x, y, spritWidth/5, spritHeight/5)
gameFrame++;


}

function drawPaddle(position,  width, height, color) {
    ctx.beginPath();
    ctx.rect(position, canvas.height- height, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}