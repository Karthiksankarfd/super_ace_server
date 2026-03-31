import chalk from "chalk";
import { reelService } from "./Reel.services.js";

let winsCategory :Record<number , Record<string , string>> = {
    3 :{
        type : "THREE-OF-KIND",
    },
    4 :{
        type : "FOUR-OF-KIND",
    },
    5:{
        type : "FIVE-OF-KIND",
    }
}

export type Card ={
    name : string,
    isGolden : boolean
}
export default class Grid {

    public constructor() { };

    generateGrid() {
        let reelsCount = 5;
        let current = 1;
        let grid = [];
        while (current <= reelsCount) {
            let reel = reelService.getReel(current);
            grid.push(reel);
            current++;
        };
        //  here create an reusable mapped data so we can make use for the evaluation
        let mappedGrid = this.mapTheGrid(grid);
        let wins = this.evaluate(grid[0]!, mappedGrid.mg , mappedGrid.goldenMap);
        return { grid, mappedGrid, wins };
    };

    generatePartial(grid :any , winWays :[]){
        // replace the ceils by generating new cards based on the winWays matrix
        // ? winWays also contains the golden cards so we should not give replacement for goldcards 
        // ? inorder to check is the card is golden we can make use of the grid it self 
        // TODO: if(grid[winWays[0]][winWays[1]].isGolden) then dont replace 
        let replacedCards = []        
        for(let i = 0 ; i < winWays.length ; i++){
             let reel = winWays[i]![0] ;
             let row  = winWays[i]![1] ;
             if(!(grid[reel]![row]?.isGolden)){
                // then only replace by getting an random card from the reel 
                let card =  reelService.getCard()
                console.log("card" , card)
                let c = { 
                    insertAt : winWays[i] ,
                    card
                };
                replacedCards.push(c);
             }
        }
        return replacedCards ;
    };

    evaluate(reelOne: Array<Card>, mappedGrid: Map<string, Map<string, Array<Array<number>>>> , goldenMap : Map<string ,  Array<Array<number>>>) {
        let winMap = new Map();
        let cols = ["col1map", "col2map", "col3map", "col4map"];
        for (let i = 0; i < reelOne.length; i++) {    
            let base = reelOne[i]?.name; 
            let currentCol = 0; 
            let match =  1;
            let ways = 1;
            const win_details = {
                win: "",
                char: "",
                ways : 1,
            };
            let win_matrix : any = [];
            while (currentCol < 4) {
                let col = mappedGrid.get(cols[currentCol]!); // MAP VALUE OF FIRST COL OF GRID
                    // ? wild substitute or base are considered 
                    if(col?.has(base!) || col?.has("JOKER-WILD-BIG") || col?.has("JOKER-WILD-SMALL")){ // only consider when the flip happend
                        match++;
                        currentCol++; // 
                        console.log(chalk.red("THIS IS THE MAPPED ITEMS FOR THE CURRENT COLUMN" , currentCol))
                        console.log(col!?.get(base!)! , "THE BASE COUNT IN THE CURRENT COLUMN")
                        let passedCard ;
                        if(col?.has("JOKER-WILD-BIG")){
                            passedCard = "JOKER-WILD-BIG"
                        }else if(col?.has("JOKER-WILD-SMALL")){
                            passedCard = "JOKER-WILD-SMALL"
                        }else{
                            passedCard = base!
                        }
                        win_matrix = [...win_matrix ,  ...col?.get(passedCard)!] ;
                        let occuranceOfBase = col?.get(base!)?.length!
                        if(occuranceOfBase > 1){
                             ways = ways * occuranceOfBase;
                        };
                    }else{
                        break ;
                    }
            };

            if(match >= 3){
                win_details.win = winsCategory?.[match]?.type || "NO WIN";
                win_details.char = base! ;
                win_details.ways = ( ways === 0 ) ? 1 : ways; 
                winMap.set(base, win_details);
                winMap.set("lockedCards" , goldenMap.has(base!) ? [...goldenMap.get(base!)!] : [])
                // console.log(chalk.red("THE WIN MATRIX FROM THE GRID SERVICES "))
                if(winMap.has("win_matrix")){ 
                    // spread the current win_matrix 
                    winMap.set("win_matrix", [...winMap.get("win_matrix") , ...win_matrix]);
                }else{
                  console.log(chalk.red("THE WIN MATRIX FROM THE GRID SERVICES "))
                  console.log(win_matrix);
                  winMap.set(`win_matrix` , win_matrix);           
                }
            }; 

            // if(winMap.get("lockedCards")?.length){
            //     canFlip = true ;
            // }
        }
        
        return winMap ;
    };

    mapTheGrid(grid : any) { 
        let current = 0; // this points to the reel in our grid
        const mappedGrid = new Map(); 
        const goldenMap = new Map();
        const goldenCards = [];
        while (current <= 4) {
                let reel = grid[current];   
                let map = `col${current}map` // * dynamic key naming
                mappedGrid.set(map, new Map()); // * creation of map for col
                let col = mappedGrid.get(map);
                for (let j = 0; j < 4; j++) { // * heer the reel[j] is ppinting to the element in the particular ree
                    if(reel[j].isGolden){
                        // let data = {
                        //     name : reel[j].name,
                        //     co_ordinates :{col:current ,  row : j}
                        // }; 
                        goldenCards.push([current , j]) 
                       if(goldenMap.get(reel[j].name)){
                          goldenMap.get(reel[j].name).push([current , j])  // the array should be [{name:"ace" , co-ordinate :  {col:current, row:j}}]
                       }else{
                          goldenMap.set(reel[j].name , [[current , j]])
                       }
                    };
                    if (col.has(reel[j].name)) {
                        col.get(reel[j].name).push([current, j])
                    } else {
                        col.set(reel[j].name, [[current, j]])
                    }
                }
            current++;
        };
        let mg = structuredClone(mappedGrid);
        // todo:  returns the mapped grid , goldenCards , 
        return { mg , goldenCards , goldenMap , grid } ;
    };

}

export const gridService = new Grid();

