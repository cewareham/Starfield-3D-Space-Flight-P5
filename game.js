"use strict";

// Game class
class Game {
   //*** SceneManager calls the contructor & setup(..) one time ***
   constructor() {
      this.starfield = new StarField();
      this.lasers = new Lasers();
      this.halfWidth = width*0.5;
      this.halfHeight = height*0.5;
      // distToViewPlane is another way of setting field of view (fov) w/o using angle/trig calcs
      this.distToViewPlane = 100;
   }

   setup = () => {
      //game = this;   // set global var for easy access to Game object
      //console.log("Game class -> setup()");
   }

   //*** BEGIN SceneManager calls next functions continuously ***
   keyPressed = () => {
      if (keyCode == ESCAPE) {
         this.sceneManager.showScene( Intro );
      }
   }

   //mousePressed() {
   //   console.log("Game Class -> Mouse Pressed");
      //return false;
   //}

   draw = () => {
      if (themeSong.isLoaded() && !themeSong.isPlaying()) themeSong.loop();
      else if (themeSong.isPaused()) themeSong.play();   // play() continues where pause (in Intro) left off
      this.update();
      this.render();
      this.instructions();
   }
   //*** END SceneManager calls above functions continuously ***

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
      this.lasers.update();
   }

   render = () => {
      background(0);

      if (mouseIsPressed) {
         if (!this.lasers.firePressed)  {
            this.lasers.fire();
            this.lasers.firePressed = true;
         }   
      } else {
         this.lasers.firePressed = false;
      }

      this.starfield.render();
      this.lasers.render();
      //translate(-width*0.5, -height*0.5);
      image(spaceship, -this.halfWidth, -this.halfHeight, width, height, 0, 0);
   }
}
