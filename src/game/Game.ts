import { gridService } from "../game.services/Grid.services.js";

type Card = {
    suite : string ,
    isGoldCard : boolean
}

// let grid = [
//   [
//     { suite: "A", isGoldCard: false },
//     { suite: "K", isGoldCard: true },
//     { suite: "Q", isGoldCard: false },
//     { suite: "J", isGoldCard: false },
//     { suite: "10", isGoldCard: true }
//   ],
//   [
//     { suite: "9", isGoldCard: false },
//     { suite: "8", isGoldCard: false },
//     { suite: "7", isGoldCard: true },
//     { suite: "6", isGoldCard: false },
//     { suite: "5", isGoldCard: false }
//   ],
//   [
//     { suite: "4", isGoldCard: true },
//     { suite: "3", isGoldCard: false },
//     { suite: "2", isGoldCard: false },
//     { suite: "A", isGoldCard: true },
//     { suite: "K", isGoldCard: false }
//   ],
//   [
//     { suite: "Q", isGoldCard: false },
//     { suite: "J", isGoldCard: true },
//     { suite: "10", isGoldCard: false },
//     { suite: "9", isGoldCard: false },
//     { suite: "8", isGoldCard: true }
//   ]
// ];
export default class Game{

    constructor(){};

    spin(){
        let result = gridService.generateGrid()
        return result
    };

    // evaluate(reelOne: Array<string>, mappedGrid: Map<string, Map<string, Array<Array<number>>>>) {
    //     let winMap = new Map();
    //     console.log("Inside the evaluator")
    //     // take an base from the reel 
    //     let cols = ["col1map", "col2map", "col3map", "col4map", "col5map"];
    //     for (let i = 0; i < reelOne.length; i++) {    
    //         let base = reelOne[i];
    //         let currentCol = 1
    //         let match = 1
    //         let win_details = {
    //             win: "",
    //             char: ""
    //         }
    //         while (currentCol < 5) {
    //             let col = mappedGrid.get(cols[currentCol]!)
    //             if (col && base !== "") {
    //                 if (col.has(base!)) {
    //                     match++;
    //                     currentCol++;
    //                 } else if (match > 4) {
    //                     win_details.win = "FIVE-OF-KIND",
    //                     win_details.char = base!
    //                 } else {
    //                     if (match < 3) {
    //                         currentCol++
    //                         break;
    //                     } else {
    //                         if (match === 3) {
    //                             win_details.win = "THREE-OF-KIND",
    //                                 win_details.char = base!
    //                         } else if (match === 4) {
    //                             win_details.win = "FOUR-OF-KIND",
    //                                 win_details.char = base!
    //                         }
    //                         winMap.set(base, win_details);
    //                         currentCol++
    //                         break;
    //                     }
    //                 }
    //             }else{
    //               console.log("THE REQUIRED PARAMS FOR EVALUATION ARE NOT PRESENT")
    //             }
    //         }
    //     }
    //     return winMap;
    // }

    generatePartial(){};

    espin(){ // how can you make the domain to tell this has happend ??
        let isWin = false ;
        let isWinHasGoldenCards = false ;
        do{
           let result = gridService.generateGrid() ;
           isWin = result.wins.get("win_matrix").length > 0 ;
           isWinHasGoldenCards = result.wins.get("lockedCards").length > 0 ;
           if(isWinHasGoldenCards){
               let win_co_ordinates = result.wins.get("win_matrix")
               let replaceMentCards = gridService.generatePartial(result.grid , win_co_ordinates) ; 
           }
        }while(isWin) ;
    };

};

