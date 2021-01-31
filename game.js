"use strict";

// Game class
class Game {
	constructor() {
      this.starfield = new StarField();
   }

   update = () => {
      this.starfield.update();
   }

   render = () => {
      background(0);
      this.starfield.render();
   }
}
