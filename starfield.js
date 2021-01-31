"use strict";

// StarField class
class StarField {
	constructor() {
      this.numStars = width * 2;
      this.worldSize = width * 2;
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
      this.prevScreenX = [];
      this.prevScreenY = [];
      this.halfWidth = width*0.5;
      this.halfHeight = height*0.5;
      this.speed = 0;
      this.speedOfRoll = 0;
      this.initStars();
   }

   initStars = () => {
      this.starX = [];
      this.starY = [];
      this.starZ = [];
      this.prevScreenX = [];
      this.prevScreenY = [];
 
      for (let index=0; index<this.numStars; index++) {
         this.starX.push(0);
         this.starY.push(0);
         this.starZ.push(0);
         this.prevScreenX.push(0);
         this.prevScreenY.push(0);
         this.placeNewStar(index, int(random(0, this.worldSize)));
      }
   }

   update = () => {
      this.updateStars();
   }

   render = () => {
      let xOffset = mouseX > width  ? width  : mouseX,   // limit rotation
          yOffset = mouseY > height ? height : mouseY;   // limit speed

      //if (xOffset > width)  xOffset = width;       // limit rotation
      //if (yOffset > height) yOffset = height;      // limit speed
      this.speed = (this.halfHeight-yOffset) / 10;
      this.speedOfRoll = (this.halfWidth-xOffset) / 100;

      translate(this.halfWidth, this.halfHeight);   // set canvas origin (0, 0) to center
      this.drawStars();
   }

   updateStars = () => {
      for (let index=0; index<this.numStars; index++) {
         this.worldZ = this.starZ[index] - this.speed;
         this.starZ[index] = this.worldZ;
         if (this.worldZ < 1) {  // going forward -> if star is behind us, put it at end of world
            this.placeNewStar(index, this.worldSize);
         } else {
            if (this.worldZ > this.worldSize) {    // going backward -> if star if past end of world, put it just behind us
               this.placeNewStar(index, 1);
            } else { // if star is in between 1 & end of world, rotate it, speedOfRoll=0 -> won't rotate
               this.zAxisRotation(index, this.speedOfRoll)
            }
         }
      }
   }

   drawStars = () => {
      let penColor = "#000000",
          penSize = 3,
          penNewColor;

      for (let index=0; index<this.numStars; index++) {
         this.worldX = this.starX[index];
         this.worldY = this.starY[index];
         this.worldZ = this.starZ[index];
         penNewColor = set_brightness(penColor, 100 * (1 - this.worldZ / this.worldSize));
         this.perspectiveTransform(this.worldX, this.worldY, this.worldZ);
         stroke(penNewColor);
         strokeWeight(penSize);
         line(this.screenX, this.screenY, this.prevScreenX[index], this.prevScreenY[index]);
         this.prevScreenX[index] = this.screenX;
         this.prevScreenY[index] = this.screenY;
      }
   }

   placeNewStar = (index, zz) => {
      this.worldX = int(random(-this.worldSize, this.worldSize));
      this.worldY = int(random(-this.worldSize, this.worldSize));
      this.worldZ = zz;
      this.starX[index] = this.worldX;
      this.starY[index] = this.worldY;
      this.starZ[index] = this.worldZ;
      this.perspectiveTransform(this.worldX, this.worldY, this.worldZ);
      this.prevScreenX[index] = this.screenX;
      this.prevScreenY[index] = this.screenY;
   }

   zAxisRotation = (index, angle) => {
      this.worldX = this.starX[index];
      this.worldY = this.starY[index];
      angleMode(DEGREES);
      this.starX[index] = int((this.worldX * cos(angle)) - (this.worldY * sin(angle)));
      this.starY[index] = int((this.worldX * sin(angle)) + (this.worldY * cos(angle)));
   }

   // convert worldX, worldY, worldZ to screen coords (screenX & screenY)
   // simplified version of project(..) function in outrun cic code
   perspectiveTransform = (xx, yy, zz) => {
      let scale = this.distToViewPlane / zz;
      this.screenX = int(xx * scale);
      this.screenY = int(yy * scale);
   }
}
