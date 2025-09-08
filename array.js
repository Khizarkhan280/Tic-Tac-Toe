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
