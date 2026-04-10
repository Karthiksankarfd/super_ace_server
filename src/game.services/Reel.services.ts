import mathservice from "./Math.services.js"
import { weightedSymbolReel, weightedSymbolReelNoGold, wildReel } from "../game/repo/reel.js"
import { type Card } from "./Grid.services.js";

class Reel {
    constructor(readonly symbolReel: Array<Card> , readonly symbolReelNoGolden: Array<Card> , readonly wildReel: Array<Card>) { }
    
    getReel(current : number): Array<Card> {
        let n = this.symbolReel.length;
        let reelToUse  ;
        if(current === 1 || current === 5){
            n = this.symbolReelNoGolden.length ;
            reelToUse = this.symbolReelNoGolden
        }else{
            n = this.symbolReel.length 
            reelToUse = this.symbolReel 
        }
        
        let stopIndex = mathservice.generateStopIndex(n);
        let reel: Card[] = [];

        for (let i = -3; i <= 0; i++) {
            let index = (stopIndex + i + n) % n; // wrap around
            reel.push(reelToUse![index]!);
        }

        console.log(reel, "The current Reel", stopIndex, n);
        return reel;
    }

    getCard(){
        let index = Math.floor( Math.random() * this.symbolReelNoGolden.length);
        return this.symbolReelNoGolden[index] ;
    }

    flipGoldenCard(goldenCards: Array<Array<number>>){
        let bigOrSmall = "" ; 
        let result = [];
        for(let i = 0 ; i < goldenCards.length ; i++ ){
            let index = Math.floor(Math.random() * this.wildReel.length);
            let card = this.wildReel[index];
            if(bigOrSmall === ""){
                if(card.name === "BIG-JOKER-WILD"){
                    bigOrSmall = "BIG-JOKER-WILD"
                }else{
                    bigOrSmall = "LITTLE-JOKER-WILD"
                };
            }else{
                card.name = bigOrSmall
            }
            let data = {
                insertAt :goldenCards[i] ,
                card
            }
            result.push(data)
        }
        return result ;
    }
    
}

export const reelService = new Reel(weightedSymbolReel , weightedSymbolReelNoGold , wildReel)
