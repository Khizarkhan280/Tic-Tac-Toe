let playerMoves = [];
let cpuMoves = [];

const winPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
];

const forks = [
  [0, 8], // opposite corners
  [2, 6], // opposite corners
  [0, 5],
  [2, 3],
  [6, 1],
  [8, 1]
];

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



































































const TrickPatterns = {
  // 1. Win opportunities
  win: {
    check: "winPositions", // rows, cols, diagonals
    action: "complete line to win"
  },

  // 2. Block opponent win
  blockWin: {
    check: "winPositions",
    action: "block opponent line"
  },

  // 3. Fork opportunities (CPU tries to create)
  forks: [
    {
      pattern: [0, 8],   // opposite corners
      response: "create fork with center or side"
    },
    {
      pattern: [2, 6],   // opposite corners
      response: "create fork with center or side"
    },
    {
      pattern: [0, 5],   // corner + side
      response: "play move to open 2 threats"
    },
    {
      pattern: [2, 3],
      response: "play move to open 2 threats"
    },
    {
      pattern: [6, 1],
      response: "play move to open 2 threats"
    },
    {
      pattern: [8, 1],
      response: "play move to open 2 threats"
    }
  ],

  // 4. Block opponent forks (CPU defends)
  blockForks: [
    {
      pattern: [0, 8],   // opposite corners
      response: "play any side (1, 3, 5, 7)"
    },
    {
      pattern: [2, 6],   // opposite corners
      response: "play any side (1, 3, 5, 7)"
    },
    {
      pattern: [1, 3],   // adjacent sides
      response: "play joining corner (0)"
    },
    {
      pattern: [1, 5],   // adjacent sides
      response: "play joining corner (2)"
    },
    {
      pattern: [5, 7],   // adjacent sides
      response: "play joining corner (8)"
    },
    {
      pattern: [3, 7],   // adjacent sides
      response: "play joining corner (6)"
    }
  ],

  // 5. Strategic priorities (if no immediate threat or win)
  strategic: [
    {
      pattern: [4],
      response: "take center if free"
    },
    {
      pattern: [0, 8],
      response: "take opposite corner"
    },
    {
      pattern: [2, 6],
      response: "take opposite corner"
    },
    {
      pattern: [0, 2, 8],
      response: "setup trap (two corners + center)"
    },
    {
      pattern: [2, 4, 6],
      response: "diagonal control"
    },
    {
      pattern: [0, 4, 8],
      response: "diagonal control"
    }
  ],

  // 6. Fallback moves
  fallback: {
    corners: [0, 2, 6, 8], // strong after center
    sides: [1, 3, 5, 7]    // last resort
  }
};
