"use strict";

// Game class
class Game {
   //*** SceneManager calls the contructor & setup(..) one time ***
   constructor() {
      this.starfield = new StarField();
      this.halfWidth = width*0.5;
      this.halfHeight = height*0.5;
   }

   setup = () => {
      console.log("Game class -> setup()");
   }

   //*** BEGIN SceneManager calls next 2 functions continuously ***
   keyPressed = () => {
      if (keyCode == ESCAPE) {
         this.sceneManager.showScene( Intro );
      }
   }

   draw = () => {
      if (themeSong.isLoaded() && !themeSong.isPlaying()) themeSong.loop();
      // play() continues where pause (in Intro) left off &
      //  continues looping if song was looped before
      else if (themeSong.isPaused()) themeSong.play();
      this.update();
      this.render();
      this.instructions();
   }
   //*** END SceneManager calls above 2 functions continuously ***

   instructions = () => {
      textSize(11);
      fill("white");
      strokeWeight(1);
      stroke("black");
      textAlign(CENTER);
      text("Move mouse-stars change   Left btn-fire lasers   ESC-quit", 0, this.halfHeight-10);
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
