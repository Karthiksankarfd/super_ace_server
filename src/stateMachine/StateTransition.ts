import { Gamestates } from "./GameState.js";

export const stateMapping: Record<Gamestates, Gamestates[]> = {
  [Gamestates.HOME]: [Gamestates.LOBBY],
  [Gamestates.LOBBY]: [Gamestates.PLACE_BET],
  [Gamestates.PLACE_BET]: [Gamestates.DEAL],
  [Gamestates.DEAL]: [Gamestates.RESULT],
  [Gamestates.RESULT]: [Gamestates.LOBBY],
};
