"use strict";

// Game class
class Game {
	constructor() {
      this.numStars = 1000;
      this.worldSize = 1000;
      // distToViewPlane is another way of setting field of view (fov) w/o using angle/trig calcs
      this.distToViewPlane = 100;
      this.starX = [];
      this.starY = [];
      this.starZ = [];
      this.worldX;
      this.worldY;
      this.worldZ;
      this.screenX;
      this.screenY;
      this.halfWidth = width*0.5;
      this.halfHeight = height*0.5;
      this.initStars();
   }

   initStars = () => {
      this.starX = [];
      this.starY = [];
      this.starZ = [];
      this.prevScreenX = [];
      this.prevScreenY = [];

      for (let index=0; index<this.numStars; index++) {
         this.worldX = int(random(-this.worldSize, this.worldSize));
         this.worldY = int(random(-this.worldSize, this.worldSize));
         this.worldZ = int(random(0, this.worldSize));
         this.starX.push(this.worldX);
         this.starY.push(this.worldY);
         this.starZ.push(this.worldZ);
      }
   }

   drawStars = () => {
      let penColor = "#000000",
          penSize = 4,
          penNewColor;

      for (let index=0; index<this.numStars; index++) {
         this.worldX = this.starX[index];
         this.worldY = this.starY[index];
         this.worldZ = this.starZ[index];
         penNewColor = set_brightness(penColor, 100 * (1 - this.worldZ / this.worldSize));
         this.perspectiveTransform(this.worldX, this.worldY, this.worldZ);
         fill(penNewColor);
         rect(this.screenX, this.screenY, penSize, penSize);
      }
   }

   // convert worldX, worldY, worldZ to screen coords
   // simplified version of project(..) function in outrun cic code
   perspectiveTransform = (xx, yy, zz) => {
      let scale = this.distToViewPlane / zz;
      this.screenX = int(xx * scale);
      this.screenY = int(yy * scale);
   }

   update = () => {

   }

   render = () => {
      background(0);
      translate(this.halfWidth, this.halfHeight);   // set canvas origin (0, 0) to center
      this.drawStars();
   }
}
