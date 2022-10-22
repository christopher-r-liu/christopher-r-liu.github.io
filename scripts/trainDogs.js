const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');


console.log(ctx);

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
//playerImage.src = '/image/shadow_dog.png';
playerImage.src = '../images/shadow_dog.png';

let x = 0;
const spritWidth = 575;
const spritHeight = 523;



let playerState = "idle";
const dropdown = document.getElementById("trainSubject");
dropdown.addEventListener("change", function(e) {
    playerState=e.target.value;
})
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
    }, {
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

if(playerState=="jump"){
    //console.log(gameFrame);
    if(gameFrame%1000==0){
        let playerState="fall";
    }
    
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState]
    .loc.length;
let frameX = spritWidth * position;
let frameY = spriteAnimations[playerState].loc[position].y;



ctx.drawImage(playerImage, frameX , frameY, spritWidth,
    spritHeight, 0, 0, spritWidth, spritHeight)
gameFrame++;
requestAnimationFrame(animate)


}
else{
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState]
        .loc.length;
    let frameX = spritWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;



    ctx.drawImage(playerImage, frameX , frameY, spritWidth,
        spritHeight, 0, 0, spritWidth, spritHeight)
    gameFrame++;
   //x++;

    requestAnimationFrame(animate)

}
    

};

animate();