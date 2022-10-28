import { StandingLeft, StandingRight, SittingLeft, SittingRight,
RunningLeft, RunningRight } from "./state.js";

export  class Player {
 constructor(game){
    this.game=game;

  
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.image = document.getElementById("player");
    // this.frameX = 0;
    // this.frameY = 0;
    // this.speed =0;
    // this.maxSpeed =10;


 }

//  draw(context){
//     context.drawImage(this.image, this.width * this.frameX, this.height * this.frameY,
//         this.width, this.height, this.x, this.y, this.width, this.height);
//  }

draw(context){
    context.fillStyle = 'red';
    context.fillRect(this.x, this.y, this.width, this.height);
        // context.drawImage(this.image, this.width * this.frameX, this.height * this.frameY,
        // this.width, this.height, this.x, this.y, this.width, this.height);

        context.drawImage(this.image, this.x, this.y);

}
 
 update(input){
this.currentState.handleInput(input);
this.x = this.speed;
if(this.x <= 0){
    this.x =0;
}
else if (this.x >= this.gameWidth-this.width)
this.x = this.gameWidth - this.width;
 }

 setState(state){
    this.currentState = this.states[state];
    this.currentState.enter();
 }

}