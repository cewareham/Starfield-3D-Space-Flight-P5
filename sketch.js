"use strict";

let game = null, mgr;
let thumbnail, spaceship;
let themeSong, laserSound;

function preload() {
  thumbnail = loadImage('assets/thumbnail.png');
  spaceship = loadImage('assets/spaceship.png')
  themeSong = new p5.SoundFile('assets/star wars.mp3');
  laserSound = new p5.SoundFile('assets/laser.wav');
}

function setup() {
  createCanvas(800, 600);
  mgr = new SceneManager();

  mgr.addScene ( Intro );
  //*** addScene(..) returns object with class instance called oScene ***
  game = mgr.addScene(Game).oScene;

  mgr.thumbnail = thumbnail;
  mgr.spaceship = spaceship;
  mgr.wire();
  mgr.showScene( Intro );

  //game = new Game();
}

function draw() {
  //game.update();
  //game.render();
}
