"use strict";

let game;
let thumbnail, spaceship;
let themeSong, laserSound;

function preload() {
  thumbnail = loadImage('assets/thumbnail.png');
  spaceship = loadImage('assets/spaceship.png')
  themeSong = new p5.SoundFile('assets/star wars.mp3', themeSongLoaded);
  laserSound = new p5.SoundFile('assets/laser.wav');
}

function setup() {
  createCanvas(700, 700);
  game = new Game();
}

function draw() {
  game.update();
  game.render();
}

function themeSongLoaded() {
  themeSong.loop(); // loop()->play continuously, play()->plays once & quits
}