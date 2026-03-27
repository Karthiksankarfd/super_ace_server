import Grid from "../game.services/Grid.services.js";

// const game = new Game()
const gridService = new Grid()

// const testCases = [

//   {
//     grid: [
//       [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
//       [{ name: "ACE", isGolden: true }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
//       [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: true }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
//       [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: true }, { name: "JOKER", isGolden: false }],
//       [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: true }]
//     ],
//     wins: {
//       "ACE": { win: "FIVE-OF-KIND", char: "ACE" },
//       "KING": { win: "FIVE-OF-KIND", char: "KING" },
//       "QUEEN": { win: "FIVE-OF-KIND", char: "QUEEN" },
//       "JOKER": { win: "FIVE-OF-KIND", char: "JOKER" }
//     }
//   },

//   {
//     grid: [
//       [{ name: "ACE", isGolden: true }, { name: "SPADE", isGolden: false }, { name: "CLUBS", isGolden: false }, { name: "DIAMOND", isGolden: false }],
//       [{ name: "ACE", isGolden: false }, { name: "SPADE", isGolden: true }, { name: "CLUBS", isGolden: false }, { name: "DIAMOND", isGolden: false }],
//       [{ name: "ACE", isGolden: false }, { name: "SPADE", isGolden: false }, { name: "CLUBS", isGolden: true }, { name: "DIAMOND", isGolden: false }],
//       [{ name: "ACE", isGolden: false }, { name: "SPADE", isGolden: false }, { name: "CLUBS", isGolden: false }, { name: "DIAMOND", isGolden: true }],
//       [{ name: "ACE", isGolden: false }, { name: "SPADE", isGolden: false }, { name: "CLUBS", isGolden: false }, { name: "DIAMOND", isGolden: false }]
//     ],
//     wins: {
//       "ACE": { win: "FIVE-OF-KIND", char: "ACE" }
//     }
//   },

//   {
//     grid: [
//       [{ name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }, { name: "ACE", isGolden: false }],
//       [{ name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }, { name: "ACE", isGolden: false }],
//       [{ name: "KING", isGolden: true }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }, { name: "ACE", isGolden: false }],
//       [{ name: "KING", isGolden: false }, { name: "QUEEN", isGolden: true }, { name: "JOKER", isGolden: false }, { name: "ACE", isGolden: false }],
//       [{ name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: true }, { name: "ACE", isGolden: false }]
//     ],
//     wins: {
//       "KING": { win: "FIVE-OF-KIND", char: "KING" },
//       "QUEEN": { win: "FIVE-OF-KIND", char: "QUEEN" },
//       "JOKER": { win: "FIVE-OF-KIND", char: "JOKER" },
//       "ACE": { win: "FIVE-OF-KIND", char: "ACE" }
//     }
//   },

//   {
//     grid: [
//       [{ name: "SPADE", isGolden: false }, { name: "SPADE", isGolden: true }, { name: "SPADE", isGolden: false }, { name: "SPADE", isGolden: false }],
//       [{ name: "SPADE", isGolden: false }, { name: "SPADE", isGolden: false }, { name: "SPADE", isGolden: true }, { name: "SPADE", isGolden: false }],
//       [{ name: "SPADE", isGolden: false }, { name: "SPADE", isGolden: false }, { name: "SPADE", isGolden: false }, { name: "SPADE", isGolden: true }],
//       [{ name: "SPADE", isGolden: false }, { name: "SPADE", isGolden: false }, { name: "SPADE", isGolden: false }, { name: "SPADE", isGolden: false }],
//       [{ name: "SPADE", isGolden: true }, { name: "SPADE", isGolden: false }, { name: "SPADE", isGolden: false }, { name: "SPADE", isGolden: false }]
//     ],
//     wins: {
//       "SPADE": { win: "FIVE-OF-KIND", char: "SPADE" }
//     }
//   },

//   {
//     grid: [
//       [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "SPADE", isGolden: false }],
//       [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "SPADE", isGolden: false }],
//       [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: true }, { name: "QUEEN", isGolden: false }, { name: "SPADE", isGolden: false }],
//       [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: true }, { name: "SPADE", isGolden: false }],
//       [{ name: "ACE", isGolden: true }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "SPADE", isGolden: true }]
//     ],
//     wins: {
//       "ACE": { win: "FIVE-OF-KIND", char: "ACE" },
//       "KING": { win: "FIVE-OF-KIND", char: "KING" },
//       "QUEEN": { win: "FIVE-OF-KIND", char: "QUEEN" },
//       "SPADE": { win: "FIVE-OF-KIND", char: "SPADE" }
//     }
//   }

// ];
const testCases = [

  /* ---------- 1 ---------- */
  // All 5 reels identical → four FIVE-OF-KIND wins
  {
    grid: [
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "ACE", isGolden: true }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "ACE", isGolden: true }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "ACE", isGolden: true}, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "ACE", isGolden: true }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }]
    ],
    wins: {
      ACE: { win: "FIVE-OF-KIND", char: "ACE" },
      KING: { win: "FIVE-OF-KIND", char: "KING" },
      QUEEN: { win: "FIVE-OF-KIND", char: "QUEEN" },
      JOKER: { win: "FIVE-OF-KIND", char: "JOKER" }
    }
  },

  /* ---------- 2 ---------- */
  // ACE present in reels 0,1,2,3,4 → FIVE-OF-KIND; others break at reel 2 → no win
  {
    grid: [
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }]
    ],
    wins: {
      ACE: { win: "FIVE-OF-KIND", char: "ACE" }
    }
  },

  /* ---------- 3 ---------- */
  // ACE in reels 0,1,2 only → THREE-OF-KIND; KING in reels 0,1,2,3 → FOUR-OF-KIND
  {
    grid: [
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "KING", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }]
    ],
    wins: {
      ACE: { win: "THREE-OF-KIND", char: "ACE" },
      KING: { win: "FOUR-OF-KIND", char: "KING" }
    }
  },

  /* ---------- 4 ---------- */
  // No symbol repeats across even 3 consecutive reels → no wins
  {
    grid: [
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }]
    ],
    wins: {}
  },

  /* ---------- 5 ---------- */
  // QUEEN in all 5 reels → FIVE-OF-KIND; ACE only in reel 0 → no win
  {
    grid: [
      [{ name: "ACE", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }]
    ],
    wins: {
      QUEEN: { win: "FIVE-OF-KIND", char: "QUEEN" }
    }
  },

  /* ---------- 6 ---------- */
  // JOKER in reels 0,1,2 → THREE-OF-KIND; stops at reel 3
  {
    grid: [
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JACK", isGolden: false }]
    ],
    wins: {
      ACE: { win: "FIVE-OF-KIND", char: "ACE" },
      KING: { win: "FIVE-OF-KIND", char: "KING" },
      QUEEN: { win: "FIVE-OF-KIND", char: "QUEEN" },
      JOKER: { win: "THREE-OF-KIND", char: "JOKER" }
    }
  },

  /* ---------- 7 ---------- */
  // Golden symbols — ACE golden across all reels → FIVE-OF-KIND (golden)
  {
    grid: [
      [{ name: "ACE", isGolden: true }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "ACE", isGolden: true }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "ACE", isGolden: true }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "ACE", isGolden: true }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "ACE", isGolden: true }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }]
    ],
    wins: {
      ACE: { win: "FIVE-OF-KIND", char: "ACE", isGolden: true },
      KING: { win: "FIVE-OF-KIND", char: "KING" },
      QUEEN: { win: "FIVE-OF-KIND", char: "QUEEN" },
      JOKER: { win: "FIVE-OF-KIND", char: "JOKER" }
    }
  },

  /* ---------- 8 ---------- */
  // ACE in reels 0,1,2,3 → FOUR-OF-KIND; missing reel 4
  {
    grid: [
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }]
    ],
    wins: {
      ACE: { win: "FOUR-OF-KIND", char: "ACE" }
    }
  },

  /* ---------- 9 ---------- */
  // KING in reels 0,1 only → no win (minimum 3); ACE THREE-OF-KIND
  {
    grid: [
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }]
    ],
    wins: {
      ACE: { win: "THREE-OF-KIND", char: "ACE" }
    }
  },

  /* ---------- 10 ---------- */
  // Every reel has all four different symbols → multiple FIVE-OF-KIND
  {
    grid: [
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "JOKER", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "KING", isGolden: false }, { name: "ACE", isGolden: false }],
      [{ name: "QUEEN", isGolden: false }, { name: "ACE", isGolden: false }, { name: "JOKER", isGolden: false }, { name: "KING", isGolden: false }],
      [{ name: "KING", isGolden: false }, { name: "JOKER", isGolden: false }, { name: "ACE", isGolden: false }, { name: "QUEEN", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }]
    ],
    wins: {
      ACE: { win: "FIVE-OF-KIND", char: "ACE" },
      KING: { win: "FIVE-OF-KIND", char: "KING" },
      QUEEN: { win: "FIVE-OF-KIND", char: "QUEEN" },
      JOKER: { win: "FIVE-OF-KIND", char: "JOKER" }
    }
  },

  /* ---------- 11 ---------- */
  // Only QUEEN appears in 3 consecutive reels (0,1,2) → THREE-OF-KIND
  {
    grid: [
      [{ name: "ACE", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }]
    ],
    wins: {
      QUEEN: { win: "THREE-OF-KIND", char: "QUEEN" }
    }
  },

  /* ---------- 12 ---------- */
  // ACE golden FOUR-OF-KIND; KING non-golden FOUR-OF-KIND
  {
    grid: [
      [{ name: "ACE", isGolden: true }, { name: "KING", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "ACE", isGolden: true }, { name: "KING", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "ACE", isGolden: true }, { name: "KING", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "ACE", isGolden: true }, { name: "KING", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }]
    ],
    wins: {
      ACE: { win: "FOUR-OF-KIND", char: "ACE", isGolden: true },
      KING: { win: "FOUR-OF-KIND", char: "KING" }
    }
  },

  /* ---------- 13 ---------- */
  // Alternating symbols — none get 3 consecutive → no wins
  {
    grid: [
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "JOKER", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "KING", isGolden: false }, { name: "ACE", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "JOKER", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "KING", isGolden: false }, { name: "ACE", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }]
    ],
    wins: {}
  },

  /* ---------- 14 ---------- */
  // JOKER golden FIVE-OF-KIND; rest non-golden FIVE-OF-KIND
  {
    grid: [
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: true }],
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: true }],
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: true }],
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: true }],
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: true }]
    ],
    wins: {
      ACE: { win: "FIVE-OF-KIND", char: "ACE" },
      KING: { win: "FIVE-OF-KIND", char: "KING" },
      QUEEN: { win: "FIVE-OF-KIND", char: "QUEEN" },
      JOKER: { win: "FIVE-OF-KIND", char: "JOKER", isGolden: true }
    }
  },

  /* ---------- 15 ---------- */
  // ACE THREE-OF-KIND (reels 0,1,2); KING THREE-OF-KIND (reels 0,1,2)
  {
    grid: [
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }]
    ],
    wins: {
      ACE: { win: "THREE-OF-KIND", char: "ACE" },
      KING: { win: "THREE-OF-KIND", char: "KING" }
    }
  },

  /* ---------- 16 ---------- */
  // Mixed golden: ACE golden THREE-OF-KIND; QUEEN non-golden FOUR-OF-KIND
  {
    grid: [
      [{ name: "ACE", isGolden: true }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "ACE", isGolden: true }, { name: "JACK", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "ACE", isGolden: true }, { name: "JACK", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }]
    ],
    wins: {
      ACE: { win: "THREE-OF-KIND", char: "ACE", isGolden: true },
      QUEEN: { win: "FOUR-OF-KIND", char: "QUEEN" }
    }
  },

  /* ---------- 17 ---------- */
  // All reels contain only ACE → FIVE-OF-KIND for ACE only
  {
    grid: [
      [{ name: "ACE", isGolden: false }, { name: "ACE", isGolden: false }, { name: "ACE", isGolden: false }, { name: "ACE", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "ACE", isGolden: false }, { name: "ACE", isGolden: false }, { name: "ACE", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "ACE", isGolden: false }, { name: "ACE", isGolden: false }, { name: "ACE", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "ACE", isGolden: false }, { name: "ACE", isGolden: false }, { name: "ACE", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "ACE", isGolden: false }, { name: "ACE", isGolden: false }, { name: "ACE", isGolden: false }]
    ],
    wins: {
      ACE: { win: "FIVE-OF-KIND", char: "ACE" }
    }
  },

  /* ---------- 18 ---------- */
  // Symbol present in reel 0 but absent in reels 1,2 → no wins for any
  {
    grid: [
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }]
    ],
    wins: {}
  },

  /* ---------- 19 ---------- */
  // QUEEN golden FIVE-OF-KIND; ACE non-golden THREE-OF-KIND
  {
    grid: [
      [{ name: "ACE", isGolden: false }, { name: "QUEEN", isGolden: true }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "QUEEN", isGolden: true }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "QUEEN", isGolden: true }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "QUEEN", isGolden: true }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "QUEEN", isGolden: true }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }]
    ],
    wins: {
      ACE: { win: "THREE-OF-KIND", char: "ACE" },
      QUEEN: { win: "FIVE-OF-KIND", char: "QUEEN", isGolden: true }
    }
  },

  /* ---------- 20 ---------- */
  // Each symbol hits exactly 3 reels → all THREE-OF-KIND
  {
    grid: [
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "ACE", isGolden: false }, { name: "KING", isGolden: false }, { name: "QUEEN", isGolden: false }, { name: "JOKER", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }],
      [{ name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }, { name: "JACK", isGolden: false }]
    ],
    wins: {
      ACE: { win: "THREE-OF-KIND", char: "ACE" },
      KING: { win: "THREE-OF-KIND", char: "KING" },
      QUEEN: { win: "THREE-OF-KIND", char: "QUEEN" },
      JOKER: { win: "THREE-OF-KIND", char: "JOKER" }
    }
  }

];
function testEvaluator(cases: any) {
  let result = []
  for (let i = 0; i < cases.length ; i++) {
    // console.log(i)
    let mappedGrid = gridService.mapTheGrid(cases[i].grid);
    console.table(mappedGrid.goldenMap)
    let evaluation = gridService.evaluate(cases[i].grid[0], mappedGrid.mg , mappedGrid.goldenMap);
    let data = structuredClone(evaluation);
    result.push(data , mappedGrid.goldenCards);
  }
  console.log("TESTCASE COUNT", result.length,)
  return result
}

console.log("THE TESTCASES RRESULT", testEvaluator(testCases))