import { Gamestates } from "./GameState.js";
import { Events } from "./GameEvents.js";

export const eventMapping: Record<Events, Gamestates[]> = {
  [Events.INFO]: [
    Gamestates.HOME,
    Gamestates.LOBBY,
  ],

  [Events.JOIN_ROOM]: [Gamestates.HOME],
  [Events.PLACE_BET]: [Gamestates.LOBBY],
  [Events.REPLACE]: [Gamestates.DEAL],
  [Events.EVALUATED]: [Gamestates.DEAL],
  [Events.BACK_TO_LOBBY]: [Gamestates.RESULT],
};
