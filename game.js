let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".resetbtn");
let showMsg = document.querySelector(".resultMsg");
let showButton = document.querySelector(".buttons");
let winnerText = document.querySelector(".resultMsg");
let continueText = document.querySelector(".singleLine");
let turn = document.querySelector(".turn");
let plyr1Turn;
let firstTurnPlyr1 = true;
let player1Win = false;
let player2Win = false;
let drawWin = false;
let winnerFound = false;
let countTurn = 0;
let player1Score = document.querySelector(".player1Score");
let player2Score = document.querySelector(".player2Score");
let drawScore = document.querySelector(".drawScore");
let continueBtn = document.querySelector(".continueButton");
let underline = document.querySelector(".underline");
let homeBtn = document.querySelector(".homebtn");
let player1MarkColor = document.querySelector("#Player1MarkColor");
let drawMarkColor = document.querySelector("#drawMarkColor");
let player2MarkColor = document.querySelector("#Player2MarkColor");
let playerMark = sessionStorage.getItem("playerMark") || "X";
let CpubuttonPressed = sessionStorage.getItem("cpubutton");
let PlayerbuttonPressed = sessionStorage.getItem("playerbutton");
let cpuModeStarter = "player"; // Can be "player" or "cpu"

// Force to start from index.html

if (!sessionStorage.getItem("fromHome")) {
  window.location.replace("index.html");
} else {
  sessionStorage.removeItem("fromHome");
}

homeBtn.addEventListener("click", () => {
  window.location.replace("index.html");
  resetGame();
});

if (playerMark == "X") {
  player1MarkColor.classList.remove("player2ScoreColor");
  player2MarkColor.classList.remove("player1ScoreColor");
  plyr1Turn = true;
} else {
  player1MarkColor.classList.remove("player1ScoreColor");
  player2MarkColor.classList.remove("player2ScoreColor");
  plyr1Turn = false;
}

const checkDraw = () => {
  let spaceEmpty = false;
  let idx = 0;
  while (spaceEmpty == false && idx <= 8) {
    if (boxes[idx].innerHTML == "") {
      spaceEmpty = true;
    } else {
      idx = idx + 1;
    }
  }
  if (spaceEmpty == false && winnerFound == false) {
    drawWin = true;
    announceDraw();
  }
};

let checkWinner = () => {
  for (const position of winPosition) {
    let pos1 = boxes[position[0]].innerHTML;
    let pos2 = boxes[position[1]].innerHTML;
    let pos3 = boxes[position[2]].innerHTML;
    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 == pos2 && pos1 == pos3) {
        winnerFound = true;
        announceWinner(pos1);
        underline.classList.remove("visiblity");
        if (position[0] == 0 && position[1] == 1 && position[2] == 2) {
          underline.style.marginTop = "56px";
        } else if (position[0] == 3 && position[1] == 4 && position[2] == 5) {
          underline.style.marginTop = "161px";
        } else if (position[0] == 6 && position[1] == 7 && position[2] == 8) {
          underline.style.marginTop = "265px";
        } else if (position[0] == 0 && position[1] == 4 && position[2] == 8) {
          underline.style.width = "0";
          underline.style.top = "50%";
          underline.style.transform = "translate(-50%, -50%) rotate(45deg)";
          underline.style.transformOrigin = "center";
        } else if (position[0] == 2 && position[1] == 4 && position[2] == 6) {
          underline.style.width = "0";
          underline.style.top = "50%";
          underline.style.transform = "translate(-50%, -50%) rotate(-45deg)";
          underline.style.transformOrigin = "center";
        } else if (position[0] == 0 && position[1] == 3 && position[2] == 6) {
          underline.style.width = "0";
          underline.style.top = "49%";
          underline.style.left = "18.3%";
          underline.style.transform = "translateX(-50%) rotate(90deg)";
          underline.style.transformOrigin = "center";
        } else if (position[0] == 1 && position[1] == 4 && position[2] == 7) {
          underline.style.width = "0";
          underline.style.top = "49%";
          underline.style.transform = "translateX(-50%) rotate(90deg)";
          underline.style.transformOrigin = "center";
        } else if (position[0] == 2 && position[1] == 5 && position[2] == 8) {
          underline.style.width = "0";
          underline.style.top = "49%";
          underline.style.left = "82%";
          underline.style.transform = "translateX(-50%) rotate(90deg)";
          underline.style.transformOrigin = "center";
        }
        setTimeout(() => {
          animateUnderline(position);
        }, 10);
      }
    }
  }
};

let playerVsPlayer = () => {
  plyr1Turn = true;
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (box.disabled) return;

      if (plyr1Turn) {
        box.innerHTML = `<i class="fa-solid fa-xmark cross"></i>`;
        plyr1Turn = false;
        turn.innerHTML = `<i class="fa-regular fa-circle circle"></i> <span>Turn</span>`;
        turn.style.animation = "pulseCircle 2s infinite";
      } else {
        box.innerHTML = `<i class="fa-regular fa-circle circle"></i>`;
        plyr1Turn = true;
        turn.innerHTML = `<i class="fa-solid fa-xmark cross"></i> <span>Turn</span>`;
        turn.style.animation = "pulseCross 2s infinite";
      }

      box.disabled = true;
      box.classList.remove("animation");
      resetBtn.classList.add("resetAnimation");
      countTurn++;
      checkWinner();
      checkDraw();
    });
  });
};

// ---------- NEW: CPU HELPER FUNCTIONS ----------

function makeMove(index, symbol) {
  let box = boxes[index];
  if (!box.disabled) {
    if (symbol === "X") {
      box.innerHTML = `<i class="fa-solid fa-xmark cross"></i>`;
    } else {
      box.innerHTML = `<i class="fa-regular fa-circle circle"></i>`;
    }
    box.disabled = true;
    box.classList.remove("animation");
    countTurn++;
    resetBtn.classList.add("resetAnimation");
    checkWinner();
    checkDraw();
  }
}

function cpuMove() {
  let emptyBoxes = [];
  boxes.forEach((box, idx) => {
    if (!box.disabled) {
      emptyBoxes.push(idx);
    }
  });
  plyr1Turn = true;

  if (emptyBoxes.length === 0) {
    return;
  }

  let choice = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
  let cpuSymbol = playerMark === "X" ? "O" : "X";

  makeMove(choice, cpuSymbol);

  turn.innerHTML =
    playerMark === "X"
      ? `<i class="fa-solid fa-xmark cross"></i> <span>Turn</span>`
      : `<i class="fa-regular fa-circle circle"></i> <span>Turn</span>`;
  turn.style.animation =
    playerMark === "X" ? "pulseCross 2s infinite" : "pulseCircle 2s infinite";
}

function updateTurnIndicator() {
  if (plyr1Turn) {
    turn.innerHTML = playerMark === "X"
      ? `<i class="fa-solid fa-xmark cross"></i> <span>Turn</span>`
      : `<i class="fa-regular fa-circle circle"></i> <span>Turn</span>`;
    turn.style.animation = playerMark === "X"
      ? "pulseCross 2s infinite"
      : "pulseCircle 2s infinite";
  } else {
    const cpuSymbol = playerMark === "X" ? "O" : "X";
    turn.innerHTML = cpuSymbol === "X"
      ? `<i class="fa-solid fa-xmark cross"></i> <span>Turn</span>`
      : `<i class="fa-regular fa-circle circle"></i> <span>Turn</span>`;
    turn.style.animation = cpuSymbol === "X"
      ? "pulseCross 2s infinite"
      : "pulseCircle 2s infinite";
  }
}


let playerVsCpu = () => {
  // Determine who starts based on player mark and current round starter
  if (playerMark === "X") {
    plyr1Turn = (cpuModeStarter === "player");
  } else {
    plyr1Turn = (cpuModeStarter === "cpu");
  }

  // Update turn indicator
  updateTurnIndicator();

  // If CPU starts, make its move
  if (!plyr1Turn) {
    setTimeout(cpuMove, 500);
  }

  boxes.forEach((box, idx) => {
    box.addEventListener("click", () => {
      // Prevent clicking during CPU's turn or when game is over
      if (!plyr1Turn || box.disabled || winnerFound) return;

      // Player move
      makeMove(idx, playerMark);

      // Check if game is over after player's move
      if (!winnerFound && !drawWin) {
        plyr1Turn = false;
        updateTurnIndicator();

        // CPU moves after a short delay
        setTimeout(cpuMove, 500);
      }
    });
  });
};

// ---------- Mode Selection ----------

if (CpubuttonPressed === "cpu") {
  playerVsCpu();
} else if (PlayerbuttonPressed === "player") {
  playerVsPlayer();
}
function animateUnderline(position) {
  underline.style.animation = "none";
  underline.offsetHeight;
  if (
    (position[0] === 0 && position[1] === 4 && position[2] === 8) ||
    (position[0] === 2 && position[1] === 4 && position[2] === 6)
  ) {
    underline.style.animation = "diagonalGrow 0.5s forwards";
  } else if (
    (position[0] === 0 && position[1] === 3 && position[2] === 6) ||
    (position[0] === 1 && position[1] === 4 && position[2] === 7) ||
    (position[0] === 2 && position[1] === 5 && position[2] === 8)
  ) {
    underline.style.animation = "verticalGrow 0.5s forwards";
  } else {
    underline.style.animation = "underlineGrow 0.5s forwards";
  }
}

let RestartReset = () => {
  if (countTurn == 0) {
    resetBtn.classList.remove("resetAnimation");
  }
};

let resetGame = () => {
  plyr1Turn = true;
  showButton.classList.add("visiblity");
  showMsg.classList.add("visiblity");

  boxes.forEach((box) => {
    box.classList.add("animation");
    box.innerHTML = "";
    box.disabled = false;
  });

  winnerText.classList.add("winColor", "lossColor", "drawColor");
  turn.innerHTML = `<i class="fa-solid fa-xmark cross"></i> <span>Turn</span>`;
  turn.style.animation = "pulseCross 2s infinite";
  winnerFound = false;
  player1Win = false;
  player2Win = false;
  drawWin = false;
  player1MarkColor.innerText = 0;
  player2MarkColor.innerText = 0;
  drawMarkColor.innerText = 0;
  countTurn = 0;
  RestartReset();
  underline.classList.add("visiblity");
  underline.style.transform = "translateX(-50%)";
  underline.style.top = "";
  underline.style.left = "50%";
  underline.style.width = "0";
  underline.style.marginTop = "";
  underline.classList.remove("crossColor", "circleColor");
  underline.style.animation = "none";

  // Reset the starting turn for CPU mode
  if (CpubuttonPressed === "cpu") {
    cpuModeStarter = "player"; // Reset to player starting

    if (playerMark === "X") {
      plyr1Turn = true; // Player (X) goes first
    } else {
      plyr1Turn = false; // CPU (X) goes first
    }

    updateTurnIndicator();

    // If CPU starts, make its move
    if (!plyr1Turn) {
      setTimeout(cpuMove, 500);
    }
  } else {
    // Player vs Player logic
    plyr1Turn = true;
    firstTurnPlyr1 = true;
    turn.innerHTML = `<i class="fa-solid fa-xmark cross"></i> <span>Turn</span>`;
    turn.style.animation = "pulseCross 2s infinite";
  }
};

resetBtn.addEventListener("click", () => {
  if (countTurn === 0) {
    resetBtn.classList.remove("resetAnimation");
    return;
  }
  resetGame();
});

const disableBox = () => {
  for (const box of boxes) {
    box.disabled = true;
    box.classList.remove("animation");
  }
};

let announceWinner = (pos1) => {
  showMsg.classList.remove("visiblity");
  showButton.classList.remove("visiblity");
  disableBox();
  continueText.innerHTML = `${pos1} <h1>Takes The Round</h1>`;
  if (pos1.includes("fa-xmark")) {
    if (playerMark === "X") {
      player1Win = true;
      player2Win = false;
      underline.classList.add("crossColor");
      winnerText.innerHTML = `<h1><span>Player1</span> <span>Won!</span></h1>`;
      winnerText.classList.remove("lossColor", "drawColor");
    } else {
      player1Win = false;
      player2Win = true;
      underline.classList.add("crossColor");
      winnerText.innerHTML = `<h1><span>Player2</span> <span>Won!</span></h1>`;
      winnerText.classList.remove("lossColor", "drawColor");
    }
  } else if (pos1.includes("fa-circle")) {
    if (playerMark === "O") {
      player1Win = true;
      player2Win = false;
      underline.classList.add("circleColor");
      winnerText.innerHTML = `<h1><span>Player1</span> <span>Won!</span></h1>`;
      winnerText.classList.remove("winColor", "drawColor");
    } else {
      player2Win = true;
      player1Win = false;
      underline.classList.add("circleColor");
      winnerText.innerHTML = `<h1><span>Player2</span> <span>Won!</span></h1>`;
      winnerText.classList.remove("winColor", "drawColor");
    }
  }

  if (player1Win) {
    player1MarkColor.innerText = Number(player1MarkColor.innerText) + 1;
  } else {
    if (player2Win) {
      player2MarkColor.innerText = Number(player2MarkColor.innerText) + 1;
    }
  }
};

let announceDraw = () => {
  showMsg.classList.remove("visiblity");
  showButton.classList.remove("visiblity");
  disableBox();
  continueText.innerHTML = `<h1>The Round Ends in a Draw</h1>`;
  winnerText.innerHTML = `<h1>It's a Draw!</h1>`;
  winnerText.classList.remove("lossColor", "winColor");
  if (drawWin) {
    drawMarkColor.innerText = Number(drawMarkColor.innerText) + 1;
  }
};

let continueRound = () => {
  showButton.classList.add("visiblity");
  showMsg.classList.add("visiblity");

  for (const box of boxes) {
    box.classList.add("animation");
    box.innerHTML = "";
    box.disabled = false;
  }

  winnerText.classList.add("winColor", "lossColor", "drawColor");
  winnerFound = false;
  player1Win = false;
  player2Win = false;
  drawWin = false;

  underline.classList.add("visiblity");
  underline.style.transform = "translateX(-50%)";
  underline.style.top = "";
  underline.style.left = "50%";
  underline.style.width = "0";
  underline.style.marginTop = "";
  underline.classList.remove("crossColor", "circleColor");
  underline.style.animation = "none";

  // Reset turn based on game mode and player mark
  if (CpubuttonPressed === "cpu") {
    // Alternate who starts each round
    cpuModeStarter = cpuModeStarter === "player" ? "cpu" : "player";

    if (playerMark === "X") {
      plyr1Turn = (cpuModeStarter === "player");
    } else {
      plyr1Turn = (cpuModeStarter === "cpu");
    }

    updateTurnIndicator();

    // If CPU starts, make its move
    if (!plyr1Turn) {
      setTimeout(cpuMove, 500);
    }
  } else {
    // Player vs Player logic (keep existing)
    if (firstTurnPlyr1) {
      plyr1Turn = false;
      firstTurnPlyr1 = false;
      turn.innerHTML = `<i class="fa-regular fa-circle circle"></i> <span>Turn</span>`;
      turn.style.animation = "pulseCircle 2s infinite";
    } else {
      plyr1Turn = true;
      firstTurnPlyr1 = true;
      turn.innerHTML = `<i class="fa-solid fa-xmark cross"></i> <span>Turn</span>`;
      turn.style.animation = "pulseCross 2s infinite";
    }
  }
};

continueBtn.addEventListener("click", continueRound);
