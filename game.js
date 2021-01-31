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
      this.speed = 10;
      this.initStars();
   }

   initStars = () => {
      this.starX = [];
      this.starY = [];
      this.starZ = [];
 
      for (let index=0; index<this.numStars; index++) {
         this.starX.push(0);
         this.starY.push(0);
         this.starZ.push(0);
         this.placeNewStar(index, int(random(0, this.worldSize)));
      }
   }

   placeNewStar = (index, zz) => {
      this.worldX = int(random(-this.worldSize, this.worldSize));
      this.worldY = int(random(-this.worldSize, this.worldSize));
      this.worldZ = zz;
      this.starX[index] = this.worldX;
      this.starY[index] = this.worldY;
      this.starZ[index] = this.worldZ;
   }

   updateStars = () => {
      for (let index=0; index<this.numStars; index++) {
         this.worldZ = this.starZ[index] - this.speed;
         this.starZ[index] = this.worldZ;
         if (this.worldZ < 1) {
            this.placeNewStar(index, this.worldSize);
         }
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
      this.updateStars();
   }

   render = () => {
      background(0);
      translate(this.halfWidth, this.halfHeight);   // set canvas origin (0, 0) to center
      this.drawStars();
   }
}
