let lastPaintTime = 0;
let DRAGON_SPEED = 2;
let inputDirection = { x: 0, y: 0 };
let lastInputDirection = inputDirection;
let cheat = document.querySelector(".cheat-btn")
const EXPENTION_AMOUNT = 1;
let score = 0;
const dragonBody = [{ x: 8, y: 8 }];
let food = getFoodrandomPosition();
const gameBoard = document.querySelector("#game-board");
const scoreBox = document.getElementById("score");
function paint(currentTime) {
  let TimeSeconds = (currentTime - lastPaintTime) / 1000;
  requestAnimationFrame(paint);
  if (TimeSeconds < 1 / DRAGON_SPEED) return;
  lastPaintTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(paint);

function draw() {
  drawDragon();
  drawFood();
}

function update() {
  gameBoard.innerHTML = "";
  dragonMove();
  dragonEatFood();
}

function drawDragon() {
  dragonBody.forEach((segment, index) => {
    let dragonElement = document.createElement("div");
    dragonElement.style.gridColumnStart = segment.x;
    dragonElement.style.gridRowStart = segment.y;

    dragonElement.style.transform = "rotate(0deg)";
    if (index == 0) {
      dragonElement.classList.add("head");

      if (inputDirection.x == 1) {
        dragonElement.style.transform = "rotate(-90deg)";
      } else if (inputDirection.x == -1) {
        dragonElement.style.transform = "rotate(90deg)";
      } else if (inputDirection.y == -1) {
        dragonElement.style.transform = "rotate(180deg)";
      } else if (inputDirection.y == 1) {
        dragonElement.style.transform = "rotate(0deg)";
      }
    } else {
      dragonElement.classList.add("dragon");
    }
    gameBoard.appendChild(dragonElement);
  });
}

function drawFood() {
  let foodElement = document.createElement("div");
  foodElement.style.gridColumnStart = food.x;
  foodElement.style.gridRowStart = food.y;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

function dragonMove() {
  inputDirection = getInputDirection();

  for (i = dragonBody.length - 2; i >= 0; i--) {
    dragonBody[i + 1] = { ...dragonBody[i] };
  }
  dragonBody[0].x += inputDirection.x;
  dragonBody[0].y += inputDirection.y;
  checkGameOver();
}

function getInputDirection() {
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        if (lastInputDirection.y == 1) break;
        inputDirection = { x: 0, y: -1 };
        break;
      case "ArrowDown":
        if (lastInputDirection.y == -1) break;
        inputDirection = { x: 0, y: 1 };
        break;
      case "ArrowLeft":
        if (lastInputDirection.x == 1) break;
        inputDirection = { x: -1, y: 0 };
        break;
      case "ArrowRight":
        if (lastInputDirection.x == -1) break;
        inputDirection = { x: 1, y: 0 };
        break;
      default:
        inputDirection = { x: 0, y: 0 };
    }
  });
  lastInputDirection = inputDirection;
  return inputDirection;
}

function dragonEatFood() {
  if (isEat()) {
    score += 10;
    scoreBox.innerHTML = score;
    console.log("eated");
    food = getFoodrandomPosition();
    DRAGON_SPEED++;
    expendDragon();
  }
}

function isEat() {
  return dragonBody[0].x === food.x && dragonBody[0].y === food.y;
}

function getFoodrandomPosition() {
  let a,
    b,
    myCondition = true;
  while (myCondition) {
    a = Math.ceil(Math.random() * 21);
    b = Math.ceil(Math.random() * 21);

    myCondition = dragonBody.some((segment) => {
      return segment.x === a && segment.y === b;
    });
  }
  return { x: a, y: b };
}

function expendDragon() {
  for (i = 0; i < EXPENTION_AMOUNT; i++) {
    dragonBody.push(dragonBody[dragonBody.length - 1]);
  }
}

function checkGameOver() {
  if (dragonOutOfGrid() || dragonIntersection()) {
    location.reload();
    alert("Game Over : You Loose");
    alert = function () {};
  }
}

function dragonOutOfGrid() {
  return (
    dragonBody[0].x < 1 ||
    dragonBody[0].x > 21 ||
    dragonBody[0].y < 1 ||
    dragonBody[0].y > 21
  ); // the bug was here it was 0 not 1 and 16 not 21
}

function dragonIntersection() {
  for (i = 1; i < dragonBody.length; i++) {
    if (
      dragonBody[0].x === dragonBody[i].x &&
      dragonBody[0].y === dragonBody[i].y
    ) {
      return true;
    }
  }
}
// cheat button
cheat.addEventListener("click", function () {
     score += 10;  // add 10 points to the current score
     DRAGON_SPEED = 2; // reset the speed to the begining speed


})