let state = "game";

function setup() {
  createCanvas(600, 1100);
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
  translate(-600, -2200);
  scale(3);
  stationEntrance();
  pop();
}

function gameScreen() {
  trainStation();

  for (let trackObject of track) {
    trackObject.draw();
  }
  for (let trainObject of train) {
    trainObject.draw();
    trainObject.update();
  }

  player.draw();
  player.playerMovement();

  for (let hoboObject of hobo) {
    hoboObject.draw();
    hoboObject.hoboMovement();

    if (dist(player.x, player.y, hoboObject.x, hoboObject.y) < 50) {
      headsUpDisplay.livesLeft--; // Lose a life
      player.x = 300;            
      player.y = 980;
      break;
  }}
  
  stationEntrance();
  headsUpDisplay.draw();
  headsUpDisplay.playerResetAndScoreGiven();
  headsUpDisplay.zeroLivesLeft();
}

class HeadsUpDisplay {
  constructor(livesLeft = 3, score = 0, circleSize = 25) {
    this.livesLeft = livesLeft;
    this.score = score;
    this.circleSize = circleSize;
  }

  draw() {
    strokeWeight(0);
    textAlign(LEFT);
    fill(0);
    rect(0, 0, 600, 40);
    fill(255);
    textSize(20);
    text("LIVES LEFT:", 22, 28);
    text("SCORE:", 455, 28);
    textSize(35);
    text(this.score, 540, 33);

    if (this.livesLeft <= 3) {
      for (let i = 0; i < this.livesLeft; i++) {
        fill(255, 0, 0);
        ellipse(160 + i * 30, 21, this.circleSize);
      }
    }
  }
  playerResetAndScoreGiven() {
    if (player.y <= 125 && player.x >= 230 && player.x <= 370) {
      this.score = this.score + 1;
      player.y = 990;
      player.x = 200;
    }
  }
  zeroLivesLeft() {
    if (this.livesLeft < 1) {
      state = "loss";
    }
  }
}

class ScreenText {
  constructor(topText, bottomText) {
    this.topText = topText;
    this.bottomText = bottomText;
  }

  draw() {
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

class Traintracks {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    let x = this.x;
    let y = this.y;
    strokeWeight(7);
    stroke(122, 95, 78);
    strokeCap(PROJECT);
    for (let i = 0; i < 21; i++) {
      line(x + 0 + i * 30, y + 30, x + 0 + i * 30, y + 70);
    }
    for (let i = 0; i < 2; i++) {
      stroke(200);
      line(x + 0, y + 40 + i * 20, x + 1000, y + 40 + i * 20);
    }
  }
}

class Train {
  constructor(x, y, trainColor, carAmount, velocity, resetPos) {
    this.x = x;
    this.y = y;
    this.trainColor = trainColor;
    this.carAmount = carAmount;
    this.velocity = velocity;
    this.resetPos = resetPos;
  }

  draw() {
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
      rect(x - 50, y - 4, 50, 8); //Thing connecting the train
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

  update() {
    this.x += this.velocity;
    if (this.x > width + 200) {
      this.x = this.resetPos;
    }
  }
}

class Character {
  constructor(
    x,
    y,
    shirtColor,
    skinColor,
    pantsColor,
    beerCan,
    direction,
    flipped,
    rotation,
    velocity = 7
  ) {
    this.x = x;
    this.y = y;
    this.shirtColor = shirtColor;
    this.skinColor = skinColor;
    this.pantsColor = pantsColor;
    this.beerCan = beerCan;
    this.direction = direction;
    this.flipped = flipped;
    this.rotation = rotation;
    this.velocity = velocity;
  }

  draw() {
    let x = this.x;
    let y = this.y;

    if (this.flipped) {
      push();
      translate(x, y);
      rotate(this.rotation * this.direction);

      strokeWeight(0);
      fill(52, 56, 48);
      ellipse(-15, -20, 10, 10); // shoe front
      rect(10, 20, 10, 5); // shoe back
      fill(this.pantsColor);
      quad(-20, -20, -10, -20, 0, 0, -20, 0); // leg front
      quad(20, 20, 10, 20, 0, 0, 20, 0); // leg back
      fill(this.shirtColor);
      ellipse(0, 0, 60, 20); // body
      ellipse(27, -7, 10, 20); // front arm
      ellipse(-27, 7, 10, 20); // back arm
      fill(this.skinColor);
      ellipse(-27, 15, 8, 5); // back hand
      ellipse(27, -15, 8, 5); // front hand
      ellipse(-12, 0, 5, 5); // left ear
      ellipse(12, 0, 5, 5); // right ear
      fill(48, 44, 52);
      ellipse(0, 0, 25, 25); // head

      if (this.beerCan) {
        fill(64, 156, 52);
        rect(20, -20, 10, 6);
        rect(26, -19, 10, 3);
        fill(9, 88, 36);
        rect(22, -19, 6, 4);
        rect(35, -20, 2, 5);
        fill(212, 18, 23);
        ellipse(26, -17, 2, 2);
      }

      pop();
    } else {
      push();
      translate(x, y);
      rotate(this.rotation * this.direction);

      strokeWeight(0);
      fill(52, 56, 48);
      ellipse(15, -20, 10, 10); // shoe front
      rect(-20, 20, 10, 5); // shoe back
      fill(this.pantsColor);
      quad(20, -20, 10, -20, 0, 0, 20, 0); // leg front
      quad(-20, 20, -10, 20, 0, 0, -20, 0); // leg back
      fill(this.shirtColor);
      ellipse(0, 0, 60, 20); // body
      ellipse(-27, -7, 10, 20); // front arm
      ellipse(27, 7, 10, 20); // back arm
      fill(this.skinColor);
      ellipse(27, 15, 8, 5); // back hand
      ellipse(-27, -15, 8, 5); // front hand
      ellipse(12, 0, 5, 5); // left ear
      ellipse(-12, 0, 5, 5); // right ear
      fill(48, 44, 52);
      ellipse(0, 0, 25, 25); // head

      if (this.beerCan) {
        fill(64, 156, 52);
        rect(20, 14, 10, 6);
        rect(26, 15, 10, 3);

        fill(9, 88, 36);
        rect(22, 15, 6, 4);
        rect(35, 14, 2, 5);

        fill(212, 18, 23);
        ellipse(26, 17, 2, 2);
      }

      pop();
    }
  }
  playerMovement() {
    if (keyIsDown(38) && !keyIsDown(39) && !keyIsDown(37)) {
      this.y -= this.velocity;
      this.rotation = 0;
      if (frameCount % 6 === 0) {
        this.flipped = !this.flipped;
      }
    }
    if (keyIsDown(40) && !keyIsDown(39) && !keyIsDown(37)) {
      this.y += this.velocity;
      this.rotation = HALF_PI * 2;
      if (frameCount % 6 === 0) {
        this.flipped = !this.flipped;
      }
    }
    if (keyIsDown(39) && !keyIsDown(40) && !keyIsDown(38)) {
      this.x += this.velocity;
      this.rotation = HALF_PI;
      if (frameCount % 6 === 0) {
        this.flipped = !this.flipped;
      }
    }
    if (keyIsDown(37) && !keyIsDown(40) && !keyIsDown(38)) {
      this.x -= this.velocity;
      this.rotation = HALF_PI * 3;
      if (frameCount % 6 === 0) {
        this.flipped = !this.flipped;
      }
    }
  }
  hoboMovement() {
    this.x += this.velocity * this.direction;

    if (this.x > width + 40) {
      this.x = -40;
    }

    if (this.x < -40) {
      this.x = width + 40;
    }
    // written with help from chatGPT, then moved around a bit (https://chatgpt.com/share/673e82da-4f54-8000-b19f-0b1f423cbfbe)
    if (frameCount % 6 === 0) {
      this.flipped = !this.flipped;
      //End of help (https://chatgpt.com/share/673e82da-4f54-8000-b19f-0b1f423cbfbe)
    }
  }
  hoboHitbox() {
    //
  }
}

function stationEntrance() {
  push();
  translate(0, 100);
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
  rect(-10, 150, 620, 60);
  rect(-10, 400, 620, 60);
  rect(-10, 960, 620, 60);

  //Your tent
  push();
  translate(-239, -11);
  scale(1.8);
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

function draw() {
  background(30);

  if (keyIsDown(32) && state === "start") {
    state = "game";
  } else if (keyIsDown(32) && state === "win") {
    state = "game";
  } else if (keyIsDown(32) && state === "loss") {
    state = "game";
  }

  //What state = to what screens
  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    gameScreen();
  } else if (state === "win") {
    gameScreen();
    win.draw();
  } else if (state === "loss") {
    gameScreen();
    loss.draw();
  }
}

let headsUpDisplay = new HeadsUpDisplay();

let win = new ScreenText("You won!", "Press space to try again");
let loss = new ScreenText("You lost!", "Press space to try again");

let player = new Character(
  200,
  990,
  "rgb(40, 188, 132)",
  "rgb(244, 196, 172)",
  "rgb(4, 148, 172)",
  false,
  1,
  true,
  0,
  15
  /*
    x,
    y,
    shirtColor,
    skinColor,
    pantsColor,
    beerCan,
    direction,
    flipped,
    rotation,
    velocity
    */
);

let track = [
  new Traintracks(0, 210),
  new Traintracks(0, 290),
  new Traintracks(0, 460),
  new Traintracks(0, 620),
  new Traintracks(0, 700),
  new Traintracks(0, 860),
  //              x,y
];

let train = [
  new Train(300, 260, "rgb(40, 188, 132)", 2, 5, -400),
  new Train(100, 340, "rgb(120, 36, 36)", 2, 5, -400),
  new Train(600, 510, "rgb(120, 136, 0)", 2, 5, -400),
  new Train(700, 670, "rgb(40, 188, 132)", 2, 5, -400),
  new Train(800, 750, "rgb(120, 36, 36)", 2, 5, -400),
  new Train(200, 910, "rgb(120, 136, 0)", 2, 5, -400),
  //        x, y, trainColor, carAmount, velocity, resetPos
];

let hobo = [
  new Character(
    0,
    180,
    "rgb(120, 36, 36)",
    "rgb(140, 112, 98)",
    "rgb(66, 40, 27)",
    true,
    -1,
    false,
    HALF_PI
  ),

  new Character(
    0,
    430,
    "rgb(120, 36, 36)",
    "rgb(140, 112, 98)",
    "rgb(66, 40, 27)",
    true,
    1,
    true,
    HALF_PI
  ),
  new Character(
    0,
    590,
    "rgb(120, 36, 36)",
    "rgb(140, 112, 98)",
    "rgb(66, 40, 27)",
    true,
    -1,
    true,
    HALF_PI
  ),
  new Character(
    0,
    830,
    "rgb(120, 36, 36)",
    "rgb(140, 112, 98)",
    "rgb(66, 40, 27)",
    true,
    1,
    true,
    HALF_PI

    /*
    x,
    y,
    shirtColor,
    skinColor,
    pantsColor,
    beerCan,
    direction,
    flipped,
    rotation,
    velocity
    */
  ),
];
