let tracksPos = { x: 0, y: 0 };
let x = 0;
let state = "game";

function setup() {
  createCanvas(600, 1030);
}

function startScreen() {
  fill(255);
  textAlign(CENTER);
  textSize(55);
  text("Survive Nässjö Station", 300, 300);
  textSize(27);
  text("Objective: Get home to your tent safely", 300, 350);
  textSize(15);
  text("Use your arrows to play", 300, 390);
  text("Press space to start", 300, 420);

  //Adds Station entrance to startScreen
  push();
  translate(-600, -2060);
  scale(3);
  stationEntrance();
  pop();
}

function gameScreen() {
  hud();

  trainStation();

  trainTracks((tracksPos.x = 0), (tracksPos.y = 160));
  trainTracks((tracksPos.x = 0), (tracksPos.y = 290));
  trainTracks((tracksPos.x = 0), (tracksPos.y = 460));
  trainTracks((tracksPos.x = 0), (tracksPos.y = 620));
  trainTracks((tracksPos.x = 0), (tracksPos.y = 700));
  trainTracks((tracksPos.x = 0), (tracksPos.y = 860));

  player.character();
  hobo1.character();
  hobo2.character();
  hobo3.character();
  hobo4.character();
  hobo5.character();

  train1.train();
  train2.train();
  train3.train();
  train4.train();
  train5.train();
  train6.train();

  stationEntrance();
}

function hud() {
  strokeWeight(0);
  textAlign(LEFT);
  fill(0);
  rect(0, 0, 600, 40);
  fill(256, 12, 12);
  ellipse(100, 20, 20, 20);
  ellipse(130, 20, 20, 20);
  ellipse(160, 20, 20, 20);
  fill(255);
  textSize(10);
  text("LIVES LEFT:", 22, 24);
  text("SCORE:", 470, 25);
}

function callingStatesWithSpaceBar() {
  //Using the spacebar lets you navigate game menus
  if (keyIsDown(32) && state === "start") {
    state = "game";
  } else if (keyIsDown(32) && state === "win") {
    state = "game";
  } else if (keyIsDown(32) && state === "loss") {
    state = "game";
  }
}

class ScreenText {
  constructor(topText, bottomText) {
    this.topText = topText;
    this.bottomText = bottomText;
  }

  screenText() {
    textSize(70);
    textAlign(CENTER);
    strokeWeight(0);
    stroke(0);
    //text shadow
    fill(40);
    text(this.topText, 301, 531);
    textSize(22);
    text(this.bottomText, 301, 591);
    //regular text
    textSize(70);
    fill(255);
    text(this.topText, 300, 530);
    textSize(22);
    text(this.bottomText, 300, 590);
  }
}

class Train {
  constructor(x, y, trainColor, carAmount) {
    this.x = x;
    this.y = y;
    this.trainColor = trainColor;
    this.carAmount = carAmount;
  }

  train() {
    let x = this.x;
    let y = this.y;
    strokeWeight(0);

    fill(228, 204, 91);
    ellipse(x + 250, y + 12, 10, 10);
    ellipse(x + 250, y - 12, 10, 10);
    fill(228, 204, 91, 127);
    quad(x + 250, y - 15, x + 370, y - 20, x + 370, y + 20, x + 250, y + 15);
    fill(this.trainColor);
    ellipse(x + 210, y + 0, 95, 60); // Train front body

    if (this.carAmount >= 1) {
      fill(50);
      rect(x - 0, y - 4, 200, 8); //Thing connecting the train
      fill(this.trainColor);
      rect(x + 0, y - 30, 125, 60, 5); // middle train car
      fill(20);
      rect(x + 12, y - 25, 100, 50, 5); // coal middle train
    }
    if (this.carAmount >= 2) {
      fill(50);
      rect(x - 300, y - 4, 300, 8); //Thing connecting the train
      fill(this.trainColor);
      rect(x - 140, y - 30, 125, 60, 5); // Back train car
      fill(20);
      rect(x - 127, y - 25, 100, 50, 5); // coal back train
    }

    fill(20);
    ellipse(x + 210, y + 0, 65, 40); // Glass

    fill(this.trainColor);
    rect(x + 140, y - 30, 70, 60, 5); // Train back body
    rect(x + 185, y - 22, 40, 44); // Glass cover
  }
}

class Character {
  constructor(x, y, shirtColor, skinColor, pantsColor, beerCan) {
    this.x = x;
    this.y = y;
    this.shirtColor = shirtColor;
    this.skinColor = skinColor;
    this.pantsColor = pantsColor;
    this.beerCan = beerCan;
  }

  character() {
    let x = this.x;
    let y = this.y;
    strokeWeight(0);
    fill(52, 56, 48);
    ellipse(x - 15, y - 20, 10, 10); // shoe front
    rect(x + 10, y + 20, 10, 5); // shoe back
    fill(this.pantsColor);
    quad(x - 20, y - 20, x - 10, y - 20, x + 0, y + 0, x - 20, y + 0); // leg front
    quad(x + 20, y + 20, x + 10, y + 20, x + 0, y + 0, x + 20, y + 0); // leg back
    fill(this.shirtColor);
    ellipse(x + 0, y + 0, 60, 20); // body
    ellipse(x + 27, y - 7, 10, 20); // front arm
    ellipse(x - 27, y + 7, 10, 20); // back arm
    fill(this.skinColor);
    ellipse(x - 27, y + 15, 8, 5); // back hand
    ellipse(x + 27, y - 15, 8, 5); // front hand
    ellipse(x - 12, y + 0, 5, 5); // left ear
    ellipse(x + 12, y + 0, 5, 5); // right ear
    fill(48, 44, 52);
    ellipse(x + 0, y + 0, 25, 25); // head

    if (this.beerCan) {
      fill(64, 156, 52);
      rect(x + 20, y - 20, 10, 6);
      rect(x + 26, y - 19, 10, 3);
      fill(9, 88, 36);
      rect(x + 22, y - 19, 6, 4);
      rect(x + 35, y - 20, 2, 5);
      fill(212, 18, 23);
      ellipse(x + 26, y - 17, 2, 2);
    }
  }
}

function stationEntrance() {
  push();
  translate(0, 30);
  strokeWeight(0);
  fill(200, 176, 160);
  rect(300 - 85, 920, 170, 80); //main house
  rect(0, 950, 600, 50); //extension of house
  fill(108, 102, 101);
  rect(0, 940, 215, 10); //roof of extension of house left
  rect(385, 940, 215, 10); //roof of extension of house right

  fill(28, 70, 114);
  rect(300 - 60, 950, 120, 50); // middle blue part
  rect(90 - 60, 970, 140, 40); // left blue part
  rect(490 - 60, 970, 140, 40); // right blue part

  fill(108, 102, 101);
  triangle(214, 920, 300, 890, 386, 920);

  fill(30);
  rect(275, 975, 50, 25); //front door

  for (let i = 0; i < 7; i++) {
    rect(35 + i * 20, 975, 10, 25); // left windows
  }
  for (let i = 0; i < 7; i++) {
    rect(435 + i * 20, 975, 10, 25); // right windows
  }

  fill(200, 176, 160);
  rect(300 - 15, 880, 30, 30); //clock base
  fill(108, 102, 101);
  triangle(284, 880, 300, 860, 316, 880); //clock top
  fill(148, 124, 92);
  ellipse(300, 895, 20, 20); //clock itself
  stroke(255);
  strokeWeight(1);
  line(300, 895, 300, 887); //clock hand up
  line(300, 895, 305, 890); //clock hand side
  pop();
}

function trainStation() {
  //Railway platforms
  strokeWeight(10);
  stroke(255, 255, 255);
  fill(170);
  rect(-10, 560, 620, 60);
  rect(-10, 800, 620, 60);
  rect(-10, 100, 620, 60);
  rect(-10, 400, 620, 60);

  //Your tent
  push();
  translate(0, 11);
  fill(226, 194, 92);
  strokeWeight(0);
  triangle(300, 45, 260, 82, 340, 82);

  fill(120, 76, 68);
  triangle(300, 45, 320, 82, 280, 82);

  strokeWeight(4);
  stroke(200);
  line(290, 35, 340, 80);
  line(310, 35, 260, 80);
  pop();
}

function trainTracks() {
  strokeWeight(7);
  stroke(122, 95, 78);
  strokeCap(PROJECT);
  for (let i = 0; i < 21; i++) {
    line(
      tracksPos.x + 0 + i * 30,
      tracksPos.y + 30,
      tracksPos.x + 0 + i * 30,
      tracksPos.y + 70
    );
  }
  for (let i = 0; i < 2; i++) {
    stroke(200);
    line(
      tracksPos.x + 0,
      tracksPos.y + 40 + i * 20,
      tracksPos.x + 1000,
      tracksPos.y + 40 + i * 20
    );
  }
}

function draw() {
  background(30);
  callingStatesWithSpaceBar();

  //What state = to what screens
  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    gameScreen();
  } else if (state === "win") {
    gameScreen();
    win.screenText();
  } else if (state === "loss") {
    gameScreen();
    loss.screenText();
  }
}

let win = new ScreenText("You won!", "Press space to try again");
let loss = new ScreenText("You lost!", "Press space to try again");

let train1 = new Train(100, 210, "rgb(40, 188, 132)", 1);
let train2 = new Train(100, 340, "rgb(120, 36, 36)", 2);
let train3 = new Train(100, 510, "rgb(120, 136, 0)", 2);
let train4 = new Train(100, 670, "rgb(40, 188, 132)", 0);
let train5 = new Train(100, 750, "rgb(120, 36, 36)", 1);
let train6 = new Train(100, 910, "rgb(120, 136, 0)", 2);

let player = new Character(
  50,
  780,
  "rgb(40, 188, 132)",
  "rgb(244, 196, 172)",
  "rgb(4, 148, 172)",
  false
);
let hobo1 = new Character(
  100,
  130,
  "rgb(120, 36, 36)",
  "rgb(140, 112, 98)",
  "rgb(66, 40, 27)",
  true
);
let hobo2 = new Character(
  100,
  270,
  "rgb(120, 36, 36)",
  "rgb(140, 112, 98)",
  "rgb(66, 40, 27)",
  true
);
let hobo3 = new Character(
  100,
  430,
  "rgb(120, 36, 36)",
  "rgb(140, 112, 98)",
  "rgb(66, 40, 27)",
  true
);

let hobo4 = new Character(
  100,
  590,
  "rgb(120, 36, 36)",
  "rgb(140, 112, 98)",
  "rgb(66, 40, 27)",
  true
);
let hobo5 = new Character(
  100,
  830,
  "rgb(120, 36, 36)",
  "rgb(140, 112, 98)",
  "rgb(66, 40, 27)",
  true
);
