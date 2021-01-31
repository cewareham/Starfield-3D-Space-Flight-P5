"use strict";

// Game class
class Game {
	constructor() {
      this.starfield = new StarField();
      this.halfWidth = width*0.5;
      this.halfHeight = height*0.5;
   }

   update = () => {
      this.starfield.update();
   }

   render = () => {
      background(0);
      this.starfield.render();
      //translate(-width*0.5, -height*0.5);
      image(spaceship, -this.halfWidth, -this.halfHeight, width, height, 0, 0);
   }
}
