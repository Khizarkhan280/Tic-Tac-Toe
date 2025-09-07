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


const trickPatterns = {
  winPosition: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]

    // Win : Any 2 and opponent dont have last one
    // Block : any 2 
  ],

  // Fork opportunities (create 2 winning threats at once)
  forks: [
    // Opposite corners taken
    [0, 8], // top-left & bottom-right
    [2, 6], // top-right & bottom-left
    // Corner + side that leads to fork
    [0, 5], // top-left + mid-right
    [2, 3], // top-right + mid-left
    [6, 1], // bottom-left + top-middle
    [8, 1], // bottom-right + top-middle
  ],

  // Blocking opponent's tricks
  blockForks: [
    [0, 8], // if opponent has opposite corners
    [2, 6], // if opponent has opposite corners
    [1, 3], // if opponent starts with two adjacent sides

    // call blockForkMove
  ],
  blockForkMove: [
    //Random
    [1],
    [3],
    [5],
    [7]
  ],

  // Strong positions to prioritize
  strategic: [
    [4],       // center control
    [0, 8], [2, 6],    // opposite corners
    [0, 2, 8], // 2 corners + center (deadly trap setup)
    [2, 4, 6], // diagonal + corner
    [0, 4, 8], // diagonal + corner

    //Random
  ],
  EmptyBox: [
    [0, 2, 6, 8],
    [1, 3, 5, 7]

    // Random
  ]
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
