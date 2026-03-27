import  { Events } from "../../stateMachine/GameEvents.js";
import  { Gamestates } from "../../stateMachine/GameState.js";

export default class GameFsm{
    // this owns the current state of the game in server 
    isEventAllowed(currentSate: Gamestates , event: Events):boolean{
        if(Gamestates[currentSate].includes(event)){
            return true;
        }
        return false ;
    }
    transition(user: any, event: Events): boolean {
        const currentState: Gamestates = user.game_state;
        // Check event allowed for current game state of user
        if (!this.isEventAllowed(currentState, event)) {
         console.log(`Event ${event} not allowed in state ${currentState}`);
         return false;
        }
        // next state based on event 
        let nextState: Gamestates | null = null;
        switch (event) {
        case Events.JOIN_ROOM:
            nextState = Gamestates.LOBBY;
            break;
        case Events.PLACE_BET:
            nextState = Gamestates.PLACE_BET;
            break;
        case Events.REPLACE:
            nextState = Gamestates.DEAL;
            break;
        case Events.EVALUATED:
            nextState = Gamestates.RESULT;
            break;
        case Events.BACK_TO_LOBBY:
            nextState = Gamestates.LOBBY;
            break;
        default:
            nextState = null;
        }
        if (!nextState) return false;
        // Check transition allowed
        // if (!this.isTransitionAllowed(currentState, nextState)) {
        //   console.log(`Transition not allowed: ${currentState} → ${nextState}`);
        //   return false;
        // }
        // Update user state
        user.game_state = nextState;
        console.log(`Transition success: ${currentState} → ${nextState}`);
        return true;
    }
}