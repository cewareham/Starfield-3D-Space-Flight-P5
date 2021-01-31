class Intro {
   constructor() { }

   draw = () => {
      themeSong.pause();

      image(this.sceneManager.thumbnail, 0, 0, width, height, 0, 0);

      textSize(30);
      fill("white");
      strokeWeight(7);
      stroke("black");
      textAlign(CENTER);
      text("Press any key to begin", width/2, height-10);
   }

   keyPressed = () => {
      this.sceneManager.showScene( Game );
      console.log("Intro class -> keyPressed()");
   }
}