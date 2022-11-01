export  class InputHandler{
    constructor(game){
        this.game = game;

        this.keys = [];
        window.addEventListener('keydown', (e) => {
           if((e.key === 'ArrowDown' ||
              e.key === 'ArrowUp' ||
              e.key === 'ArrowLeft' ||
              e.key === 'ArrowRight' ||
              e.key === 'Enter' )
           
           && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
           }
           else if (e.key === 'd') this.game.debug = !this.game.debug;
          //console.log(e.key, this.keys);

        });

        window.addEventListener('keyup', (e) => {
            if(e.key === 'ArrowDown' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight' ||
            e.key === 'Enter'  ){
                 this.keys.splice(this.keys.indexOf(e.key),1);
            }
            console.log(e.key, this.keys);
 
         });

        // this.lastKey = '';
        // window.addEventListener('keydown', (e) => {
        //    console.log(e.key);
        //     switch(e.key){
        //         case "ArrowLeft" :
        //             this.lastKey = "PRESS left";
        //             break;
        //         case "ArrowRight" :
        //             this.lastKey = "PRESS right";
        //             break;
        //        case "ArrowDown" :
        //                 this.lastKey = "PRESS down";
        //                 break;
        //      case "ArrowUp" :
        //                     this.lastKey = "PRESS up";
        //                     break;

        //     }
        // });
        // window.addEventListener('keyup', (e) => {
        //     switch(e.key){
        //         case "ArrowLeft" :
        //             this.lastKey = "RELEASE left";
        //             break;
        //         case "ArrowRight" :
        //            this.lastKey = "RELEASE right";     
        //            break;
        //         case "ArrowDown" :
        //             this.lastKey = "RELEASE down";
        //             break;
        //         case "ArrowUp" :
        //                 this.lastKey = "RELEASE up";
        //             break;            
        //     }
        // });
    }
}