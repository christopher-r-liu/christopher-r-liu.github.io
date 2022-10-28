const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');


console.log(ctx);

const CANVAS_WIDTH = canvas.width = window.innerWidth*0.75;
const CANVAS_HEIGHT = canvas.height = window.innerHeight*0.75;

var playerState = 'fly';
var actualState = '';

const playerImage = new Image();
//playerImage.src = '/image/shadow_dog.png';
playerImage.src = '../images/bees.png';


let gameFrame = 0;
let staggerFrames = 5;
const spriteAnimations = [];
const animationStates = [
    {
        name: 'fly',
        frames:13,
    }]


const spritWidth = 273;
const spritHeight = 282;



var beeSize = spritWidth/6;
var x = spritWidth/3;
var y = canvas.height-spritHeight/3;
var dx = spritWidth/50;
var dy = -spritHeight/30;

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //ctx.fillRect(x, 50, 100, 100);
   // x++;
    //alert(spriteAnimations[playerState]
    //    .loc.length);

if(playerState=="fly"){
    //console.log(gameFrame);
   
    if(actualState == "") actualState = playerState;
    
    let position = Math.floor(gameFrame / staggerFrames) % 13;//spriteAnimations[actualState]
    //.loc.length;
let frameX = spritWidth * position;
let frameY = 0; //spriteAnimations[actualState].loc[position].y;

ctx.drawImage(playerImage, frameX , frameY, spritWidth,
    spritHeight, x, y, spritWidth/5, spritHeight/5)
gameFrame++;

if(x + dx > canvas.width-beeSize || x + dx < beeSize) {
  //  actualState='dizzle';
   // x -= spritWidth/5;
    dx = -dx;
}
if(y + dy < beeSize) {
    dy = -dy;
}
else if(y + dy > canvas.height- beeSize) {
    dy = -dy;
    
}

x += dx;
y += dy;

requestAnimationFrame(animate)


}
 

};

animate();