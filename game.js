let tracksPos = { x: 0, y: 0 };

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
  entrance();
  pop();
}

function gameScreen() {
  trainStation();
  scoresAndLives();
}

function winScreen() {
  textSize(70);
  textAlign(CENTER);
  strokeWeight(0);
  fill(255);
  text("You won!", 300, 530);
  textSize(22);
  text("Press space to try again", 300, 590);
}

function lossScreen() {
  textSize(70);
  textAlign(CENTER);
  strokeWeight(0);
  fill(255);
  text("You lost!", 300, 530);
  textSize(22);
  text("Press space to try again", 300, 590);
}

function scoresAndLives() {
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

function entrance() {
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
  stroke(200);
  fill(104, 86, 78);
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

  trainTracks((tracksPos.x = 0), (tracksPos.y = 160));
  trainTracks((tracksPos.x = 0), (tracksPos.y = 290));
  trainTracks((tracksPos.x = 0), (tracksPos.y = 460));
  trainTracks((tracksPos.x = 0), (tracksPos.y = 620));
  trainTracks((tracksPos.x = 0), (tracksPos.y = 700));
  trainTracks((tracksPos.x = 0), (tracksPos.y = 860));
  entrance();
}

function trainTracks() {
  strokeWeight(7);
  stroke(70);
  strokeCap(PROJECT);
  for (let i = 0; i < 15; i++) {
    line(
      tracksPos.x + 25 + i * 50,
      tracksPos.y + 20,
      tracksPos.x + 25 + i * 50,
      tracksPos.y + 80
    );
  }
  for (let i = 0; i < 2; i++) {
    line(
      tracksPos.x + 0,
      tracksPos.y + 35 + i * 30,
      tracksPos.x + 1000,
      tracksPos.y + 35 + i * 30
    );
  }
}

function hoboCharacter(x, y) {
  fill(40, 188, 132);
  ellipse(x + 0, y + 0, 60, 20);
}

function trainCharacter(x, y) {
  fill(0, 0, 255);
  ellipse(x + 0, y + 0, 100, 100);
}

function mainCharacter(x, y) {
  fill(52, 56, 48);
  ellipse(x - 15, y - 20, 10, 10); // shoe front
  rect(x + 10, y + 20, 10, 5); // shoe back
  fill(4, 148, 172);
  quad(x - 20, y - 20, x - 10, y - 20, x + 0, y + 0, x - 20, y + 0); // leg front
  quad(x + 20, y + 20, x + 10, y + 20, x + 0, y + 0, x + 20, y + 0); // leg back
  fill(40, 188, 132);
  ellipse(x + 0, y + 0, 60, 20); // body
  ellipse(x + 27, y - 7, 10, 20); // front arm
  ellipse(x - 27, y + 7, 10, 20); // back arm
  fill(244, 196, 172);
  ellipse(x - 27, y + 15, 8, 5); // back hand
  ellipse(x + 27, y - 15, 8, 5); // front hand
  fill(244, 196, 172);
  ellipse(x - 12, y + 0, 5, 5); // left ear
  ellipse(x + 12, y + 0, 5, 5); // right ear
  fill(48, 44, 52);
  ellipse(x + 0, y + 0, 25, 25); // head
}

function callingStatesWithSpace() {
  //Using the spacebar lets you navigate game menus
  if (keyIsDown(32) && state === "start") {
    state = "game";
  } else if (keyIsDown(32) && state === "win") {
    state = "game";
  } else if (keyIsDown(32) && state === "loss") {
    state = "game";
  }
}

function draw() {
  background(30);
  callingStatesWithSpace();

  //What state = to what screens
  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    gameScreen();
    mainCharacter(400, 300);
    hoboCharacter(200, 200);
    trainCharacter(200, 300);
  } else if (state === "win") {
    gameScreen();
    winScreen();
  } else if (state === "loss") {
    gameScreen();
    lossScreen();
  }
}
