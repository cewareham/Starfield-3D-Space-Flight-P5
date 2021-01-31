"use strict";

let game;

function setup() {
  createCanvas(800, 800);
  game = new Game();
}

function draw() {
  game.update();
  game.render();
}