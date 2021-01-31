import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";
//import { Project } from "./index.esm.js";

import Stage from "./Stage/Stage.js";
import SpaceGame from "./SpaceGame/SpaceGame.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  SpaceGame: new SpaceGame({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 2,
    size: 100,
    visible: true,
    layerOrder: 1
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
