"use strict";

let game;

function setup() {
  createCanvas(700, 700);
  game = new Game();
}

function draw() {
  game.update();
  game.render();
}