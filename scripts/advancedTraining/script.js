import Player from './player.js';
import InputHandler from './input.js';
import {drawStatusText} from './utils.js'


window.addEventListener('load',function(){
const loading = this.document.getElementById('loading');
loading.style.display = 'none';

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');


const CANVAS_WIDTH = canvas.width = window.innerWidth;
const CANVAS_HEIGHT = canvas.height = window.innerHeight;

const player = new Player(canvas.width, canvas.height);
// console.log(player);

// player.draw(ctx);

const input = new InputHandler();


function animate(){
   // console.log(input.lastKey);
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   player.update(input.lastKey);
   player.draw(ctx);
   drawStatusText(ctx, input, player);
  requestAnimationFrame(animate);
};

animate();


});