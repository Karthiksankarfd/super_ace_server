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
            let reel = reelService.getReel();
            grid.push(reel);
            current++;
        };
        //  here create an reusable mapped data so we can make use for the evaluation
        let mappedGrid = this.mapTheGrid(grid);
        let wins = this.evaluate(grid[0]!, mappedGrid.mg , mappedGrid.goldenMap);
        return { grid, mappedGrid, wins };
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
            const win_matrix = [];
            while (currentCol < 4) {
                let col = mappedGrid.get(cols[currentCol]!); // MAP VALUE OF FIRST COL OF GRID
                    if(!col?.has(base!)){
                        break;
                    }
                    match++;
                    currentCol++;
                    win_matrix.push(col.get(base!));
                    let occuranceOfBase = col.get(base!)?.length!
                    if(occuranceOfBase > 1){
                       ways = ways * occuranceOfBase;
                    };
            };
            if(match >= 3){
                if(goldenMap.has(base!) ){
                          
                }
                win_details.win = winsCategory?.[match]?.type || "NO WIN";
                win_details.char = base! ;
                win_details.ways = ( ways === 0 ) ? 1 : ways; 
                winMap.set(base, win_details);
                if(winMap.has("win_matrix")){
                  winMap.get(`win_matrix`).push([win_matrix]);
                }else{
                  winMap.set(`win_matrix` , [win_matrix]);           
                }
            }
        }
        return winMap ;
    };

    mapTheGrid(grid : any) {
        let current = 0; // this points to the reel in our grid
        const mappedGrid = new Map(); 
        const goldenMap = new Map();
        const goldenCards = [];
        while (current <= 4) {
            if (current >= 0) {
                let reel = grid[current];   
                let map = `col${current}map` // * dynamic key naming
                mappedGrid.set(map, new Map()); // * creation of map for col
                for (let j = 0; j < 4; j++) { // * heer the reel[j] is ppinting to the element in the particular reel
                    let col = mappedGrid.get(map);

                    if(reel[j].isGolden){
                        goldenCards.push([current , j]) 
                       if(goldenMap.get(reel[j])){
                          goldenMap.get(reel[j]).push([current , j])
                       }else{
                          goldenMap.set(reel[j] , [[current , j]])
                       }
                    };

                    if (col.has(reel[j].name)) {
                        col.get(reel[j].name).push([current, j])
                    } else {
                        col.set(reel[j].name, [[current, j]])
                    }
                }
            };
            current++;
        };
        let mg = structuredClone(mappedGrid);
        return { mg , goldenCards , goldenMap } ;
    };


}

export const gridService = new Grid();

