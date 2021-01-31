"use strict";

// Lasers class
class Lasers {
	constructor() {
      this.laserX;
      this.laserY;
      this.laserZ;
      this.firePressed;
      this.worldX;
      this.worldY;
      this.worldZ;
      this.screenX;
      this.screenY;
      this.worldSize = width * 2;
      this.speedOfRoll = 0;
      this.halfWidth = width*0.5;
      this.halfHeight = height*0.5;

      this.initLasers();
      //game = this.sceneManager.findScene( Game ).oScene;
   }

   initLasers = () => {
      this.laserX = [];
      this.laserY = [];
      this.laserZ = [];
      this.firePressed = true;
   }

   update = () => {
      let index = this.laserX.length-1;
      for (let ii=0; ii<this.laserX.length; ii++) {
         this.worldZ = this.laserZ[index] + 40;
         this.laserZ[index] = this.worldZ;
         if (this.worldZ > this.worldSize) {
            this.laserX.splice(index, 1);    // remove 1 element @ index position
            this.laserY.splice(index, 1);
            this.laserZ.splice(index, 1);    
         } else {
            this.zAxisRotation(index, this.speedOfRoll)
         }
         index--;
      }
   }

   render = () => {
      let xOffset = mouseX > width  ? width  : mouseX;   // limit rotation
          //yOffset = mouseY > height ? height : mouseY;   // limit speed

      //if (xOffset > width)  xOffset = width;       // limit rotation
      //if (yOffset > height) yOffset = height;      // limit speed
      //this.speed = (this.halfHeight-yOffset) / 10;
      this.speedOfRoll = (this.halfWidth-xOffset) / 100;

      //translate(this.halfWidth, this.halfHeight);   // set canvas origin (0, 0) to center
      this.draw();
   }

   draw = () => {
      let penColor = "#ff0000",
          penSize,
          penNewColor;

      for (let ii=0; ii<this.laserX.length; ii++) {
         this.worldX = this.laserX[ii];
         this.worldY = this.laserY[ii];
         this.worldZ = this.laserZ[ii];
   
         this.perspectiveTransform(0, 20, this.worldZ);
         penSize = this.screenY*2.5;
         penNewColor = set_brightness(penColor, 50 * (1 - this.worldZ / this.worldSize));
         this.perspectiveTransform(3*this.worldX, -3*this.worldY, this.worldZ);
         stroke(penNewColor);
         strokeWeight(penSize);
         point(this.screenX, this.screenY);
      }
   }

   fire = () => {
      laserSound.play();
      this.worldX = -122;
      this.worldY = -82;
      this.worldZ = game.distToViewPlane;
      this.laserX.push(this.worldX);
      this.laserY.push(this.worldY);
      this.laserZ.push(this.worldZ);

      this.worldX = 122;
      this.laserX.push(this.worldX);
      this.laserY.push(this.worldY);
      this.laserZ.push(this.worldZ);

      //console.log("Lasers class -> Lasers fired");
   }
   
   zAxisRotation = (index, angle) => {
      this.worldX = this.laserX[index];
      this.worldY = this.laserY[index];
      angleMode(DEGREES);
      this.laserX[index] = int((this.worldX * cos(angle)) - (this.worldY * sin(angle)));
      this.laserY[index] = int((this.worldX * sin(angle)) + (this.worldY * cos(angle)));
   }

   // convert worldX, worldY, worldZ to screen coords (screenX & screenY)
   // simplified version of project(..) function in outrun cic code
   perspectiveTransform = (xx, yy, zz) => {
      if (game) {
         let scale = game.distToViewPlane / zz;
         this.screenX = int(xx * scale);
         this.screenY = int(yy * scale);
      }
   }
}
