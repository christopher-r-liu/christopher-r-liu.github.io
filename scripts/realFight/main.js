import {Player} from './player.js'
window.addEventListener('load',function(){
    const loading = this.document.getElementById('loading');
    loading.style.display = 'none';
    
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    
    
    const CANVAS_WIDTH = canvas.width = 500;
    const CANVAS_HEIGHT = canvas.height = 500;// window.innerHeight;

    class Game{
        constructor(width,height){
            this.width = width;
            this.height = height;
            this.player = new Player(this);
        }
        update(){

        }
        draw(context){
            this.player.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game);

    function animate(){
        game.draw(ctx);
        requestAnimationFrame(animate);

    }

    animate();

});
