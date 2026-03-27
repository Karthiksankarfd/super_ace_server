import mathservice from "./Math.services.js"
import { weightedSymbolReel } from "../game/repo/reel.js"
import { type Card } from "./Grid.services.js";

class Reel {
    constructor(readonly symbolReel: Array<Card>) { }
    getReel(): Array<Card> {
        let n = this.symbolReel.length;
        let stopIndex = mathservice.generateStopIndex(n);

        let reel: Card[] = [];

        for (let i = -3; i <= 0; i++) {
            let index = (stopIndex + i + n) % n; // wrap around
            reel.push(this.symbolReel[index]!);
        }

        console.log(reel, "The current Reel", stopIndex, n);
        return reel;
    }
}

export const reelService = new Reel(weightedSymbolReel)
