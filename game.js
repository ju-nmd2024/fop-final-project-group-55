let tracksPos = { x: 0, y: 0 };
let x = -400;
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
  trainTracksCall();
  gameScreen();
  entrance();

  textSize(70);
  textAlign(CENTER);
  strokeWeight(0);
  fill(255);
  text("You won!", 300, 530);
  textSize(22);
  text("Press space to try again", 300, 590);
}

function lossScreen() {
  trainTracksCall();
  gameScreen();
  entrance();

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

function trainTracksCall() {
  trainTracks((tracksPos.x = 0), (tracksPos.y = 160));
  trainTracks((tracksPos.x = 0), (tracksPos.y = 290));
  trainTracks((tracksPos.x = 0), (tracksPos.y = 460));
  trainTracks((tracksPos.x = 0), (tracksPos.y = 620));
  trainTracks((tracksPos.x = 0), (tracksPos.y = 700));
  trainTracks((tracksPos.x = 0), (tracksPos.y = 860));
}

function hoboCharacter(x, y) {
  push();
  rotate(HALF_PI);
  fill(52, 56, 48);
  ellipse(x - 15, y - 20, 10, 10); // shoe front
  rect(x + 10, y + 20, 10, 5); // shoe back
  fill(66, 40, 27);
  quad(x - 20, y - 20, x - 10, y - 20, x + 0, y + 0, x - 20, y + 0); // leg front
  quad(x + 20, y + 20, x + 10, y + 20, x + 0, y + 0, x + 20, y + 0); // leg back
  fill(120, 36, 36);
  ellipse(x + 0, y + 0, 60, 20); // body
  ellipse(x + 27, y - 7, 10, 20); // front arm
  ellipse(x - 27, y + 7, 10, 20); // back arm
  fill(140, 112, 98);
  ellipse(x - 27, y + 15, 8, 5); // back hand
  ellipse(x + 27, y - 15, 8, 5); // front hand
  ellipse(x - 12, y + 0, 5, 5); // left ear
  ellipse(x + 12, y + 0, 5, 5); // right ear
  fill(48, 44, 52);
  ellipse(x + 0, y + 0, 25, 25); // head
  fill(64, 156, 52);
  rect(x + 20, y - 20, 10, 6);
  rect(x + 26, y - 19, 10, 3);
  fill(9, 88, 36);
  rect(x + 22, y - 19, 6, 4);
  rect(x + 35, y - 20, 2, 5);
  fill(212, 18, 23);
  ellipse(x + 26, y - 17, 2, 2);

  pop();
}

function trainCharacterLong(x, y) {
  strokeWeight(0);
  fill(50);
  rect(x - 120, y - 4, 300, 8); //Thing connecting the train
  fill(228, 204, 91);
  ellipse(x + 250, y + 12, 10, 10);
  ellipse(x + 250, y - 12, 10, 10);
  fill(228, 204, 91, 127);
  quad(x + 250, y - 15, x + 370, y - 20, x + 370, y + 20, x + 250, y + 15);

  fill(64, 108, 52);
  rect(x + 0, y - 30, 125, 60, 5); // middle train car
  rect(x - 140, y - 30, 125, 60, 5); // Back train car
  ellipse(x + 210, y + 0, 95, 60); // Train front body
  fill(20);

  ellipse(x + 210, y + 0, 65, 40); // Glass
  rect(x + 12, y - 25, 100, 50, 5); // electric connection middle car back
  rect(x - 127, y - 25, 100, 50, 5); // electric connection back car front

  fill(64, 108, 52);
  rect(x + 140, y - 30, 70, 60, 5); // Train back body
  rect(x + 185, y - 22, 40, 44); // Glass cover
}

function trainCharacterShort(x, y) {
  fill(50);
  rect(x + 120, y - 4, 30, 8); //Thing connecting the train
  fill(228, 204, 91);
  ellipse(x + 250, y + 12, 10, 10);
  ellipse(x + 250, y - 12, 10, 10);
  fill(228, 204, 91, 127);
  quad(x + 250, y - 15, x + 370, y - 20, x + 370, y + 20, x + 250, y + 15);

  fill(64, 108, 52);
  rect(x + 0, y - 30, 125, 60, 5); // middle train car
  //rect(x - 140, y - 30, 125, 60, 5); // Back train car
  ellipse(x + 210, y + 0, 95, 60); // Train front body

  fill(20);
  ellipse(x + 210, y + 0, 65, 40); // Glass
  rect(x + 12, y - 25, 100, 50, 5); // inside of car
  //rect(x - 127, y - 25, 100, 50, 5); // inside of car

  fill(64, 108, 52);
  rect(x + 140, y - 30, 70, 60, 5); // Train back body
  rect(x + 185, y - 22, 40, 44); // Glass cover
}

function trainCall() {
  trainCharacterLong(x, 210);
  trainCharacterLong(x, 510);
  trainCharacterLong(x, 670);
  trainCharacterLong(x, 910);
  trainCharacterShort(x, 340);
  trainCharacterShort(x, 750);
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
    trainTracksCall();
    trainCall();
    gameScreen();
    mainCharacter(300, 820);
    hoboCharacter(430, -200);
    entrance();

    x = x + 8;
    if (x >= 800) {
      x = -400;
    }
  } else if (state === "win") {
    winScreen();
  } else if (state === "loss") {
    lossScreen();
  }
}
