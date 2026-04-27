import chalk from "chalk";
import { reelService } from "./Reel.services.js";
import { payout } from "../game/repo/payouttable.js";
import PayoutService, { SymbolType } from "./Payout.services.js";
import { WinType, SymbolType as type } from "./Payout.services.js"

const scatterMultiplierReel = [2, 4, 6, 10]
const combomultiplier = [1, 2, 3, 5]

let winsCategory: Record<number, Record<string, string>> = {
    3: {
        type: "THREE-OF-KIND",
    },
    4: {
        type: "FOUR-OF-KIND",
    },
    5: {
        type: "FIVE-OF-KIND",
    }
}

export type Card = {
    name: string,
    isGolden: boolean
}

export default class Grid {

    public constructor() {};

    generateGrid() {
        let reelsCount = 5;
        let current = 1;
        let grid = [];
        while (current <= reelsCount) {
            let reel = reelService.getReel(current);
            grid.push(reel);
            current++;
        };
        return grid;
    };

    generatePartial(grid: any, winWays: []) {
        let clonedGrid = structuredClone(grid)
        let replacedCards = new Map();
        let replacementCards = []
        for (let i = 0; i < winWays.length; i++) {
            let reel = winWays[i]![0];
            let row = winWays[i]![1];
            if (clonedGrid[reel]![row]?.isGolden === false && !replacedCards.has(`${reel}{row}`)) {
                // if the current card is not a golden card then only replace by getting an random card from the reel 
                let card = reelService.getCard()
                let c = {
                    insertAt: winWays[i],
                    card
                };
                replacementCards.push(c);
                replacedCards.set(`${reel}${row}`, true);
            } else {
                console.log(chalk.yellow(`The reel ${reel} row ${row} is golden card So cannot generated the replacement card `))
                console.table(grid[reel]![row])
            }
        }
        console.log(chalk.red("----------------------------------------------------------------------------------------------------------------------------------------------------------------THESE ARE THE REPLACEMENT CARDS GENERATED"))
        console.table(replacementCards)
        return replacementCards;
    };

    // data required to
    evaluate(reelOne: Array<Card>, mappedGrid: Map<string, Map<string, Array<Array<number>>>>, goldenMap: Map<string, Array<Array<number>>>, betAmount: number, totalWinAmount = 0, multiplierReel: Array<number> = combomultiplier) {
        console.log(chalk.bgBlueBright("*/**----INSIDE THE EVALUATORE----**/*"))
        let multiplierIndexPointer = 0;
        let totalWinInthisEvaluation = 0
        let winMap = new Map();
        const hasSeenBase = new Set();
        const processedBase = new Set();
        const seenWilds = new Set();
        winMap.set("ways", []);
        winMap.set("wins", [])
        winMap.set("lockedCards", []);
        winMap.set("winCards", []);
        winMap.set("win_matrix", [])
        let cols = ["col0map", "col1map", "col2map", "col3map", "col4map"];
        for (let i = 0; i < reelOne.length; i++) {
            let win_matrix: any = [];
            let base = reelOne[i]?.name;
            if (processedBase.has(base) || base === "SCATTER") {
                console.log(chalk.red(`~~~~~~BASE ${base === "SCATTER" ? "SCATTER ARE NOT CONSIDERED AS NORMAL WINS" : "HAS BEEN ALREADY PROCESSED"} ~~~~~~~`))
                continue;
            };
            let currentCol = 0;
            let match = 1;
            let ways = 1;
            let win_details = {
                win: "",
                char: "",
                ways: 1,
                payout: 0
            };
            while (currentCol < 5) {

                processedBase.add(base)
                let col = mappedGrid.get(cols[currentCol]!); // MAPPED VALUE OF FIRST COL OF GRID
                let occuranceOfBase = col?.get(base!)?.length! || 1

                // here for every base check the scatter will be added duplicate sum
                if (currentCol === 0) {

                    if (occuranceOfBase > 1) {
                        ways = ways * occuranceOfBase;
                    };
                    win_matrix = [...win_matrix, ...col?.get(base!)!]
                    currentCol++;

                } else {

                    if (col?.has(base!) && (col?.has("BIG-JOKER-WILD") || col?.has("LITTLE-JOKER-WILD"))) {

                        match++;
                        currentCol++;

                        // calculate the number of win ways
                        let baseCount = col?.get(base)!?.length || 1;
                        let bigWildCount = col?.get("BIG-JOKER-WILD")!?.length || 1
                        let smallWildCount = col?.get("LITTLE-JOKER-WILD")!?.length || 1;

                        ways = ways * baseCount * bigWildCount * smallWildCount;
                        win_matrix = [...win_matrix, ...col?.get(base)!];

                        let wild = "BIG-JOKER-WILD";
                        let setValue = `${currentCol}`;

                        if (col?.has("LITTLE-JOKER-WILD")) {
                            wild = "LITTLE-JOKER-WILD"
                        }
                        // 
                        if (!seenWilds.has(setValue)) {
                            win_matrix = [...win_matrix, ...col?.get(wild)!];
                            seenWilds.add(setValue);
                            console.log(chalk.magentaBright("This wild has not seen beore", setValue))
                        }

                    }  // if any one of these below cards is present
                    else if (col?.has(base!) || col?.has("BIG-JOKER-WILD") || col?.has("LITTLE-JOKER-WILD")) {
                        match++;
                        currentCol++;
                        ways = ways * occuranceOfBase;

                        let cardPresent = "BIG-JOKER-WILD";
                        let setValue = `${currentCol}`;

                        // check which wild is present
                        // true and true
                        if (col?.has("LITTLE-JOKER-WILD")) {
                            cardPresent = "LITTLE-JOKER-WILD"
                        } else if (col.has(cardPresent)) {
                            cardPresent = "BIG-JOKER-WILD";
                        } else {
                            cardPresent = base;
                            win_matrix = [...win_matrix, ...col?.get(cardPresent)!];
                        }

                        // if its wild and seenWilds dont have the value add to win_matrix
                        if (!seenWilds.has(setValue) && (cardPresent === "BIG-JOKER-WILD" || cardPresent === "LITTLE-JOKER-WILD")) {
                            win_matrix = [...win_matrix, ...col?.get(cardPresent)!];
                            seenWilds.add(setValue)
                            console.log(chalk.magentaBright("This wild has not seen beore", setValue))
                        }

                    }
                    else {
                        break;
                        multiplierIndexPointer = 0;
                    }
                }
            };
            if (match >= 3) {
                // win details of a single card
                win_details.win = winsCategory?.[match]?.type || "NO WIN" as WinType;
                win_details.char = base!;
                win_details.ways = ways;
                let winDetails = { ...win_details, win: winsCategory?.[match]?.type as WinType, char: base as SymbolType, bet: betAmount, comboMultiplierLevel: multiplierReel[multiplierIndexPointer] }
                let payservice = new PayoutService(payout)
                let winPayout = payservice.payout(winDetails)
                totalWinInthisEvaluation += winPayout;
                win_details = { ...win_details, payout: winPayout }
                // store wins happened in this evaluation
                winMap.get("wins").push(win_details);
                winMap.get("winCards").push(win_details);
                winMap.get("ways").push(ways);
                winMap.set("totalWin", totalWinAmount + winPayout);
                // prevent duplicate matrix count in goldenMap
                if (!hasSeenBase.has(base) && goldenMap?.has(base!)!) {
                    winMap.set("lockedCards", [...winMap.get("lockedCards"), ...goldenMap?.get(base!)!]);
                    hasSeenBase.add(base)
                };
                if (winMap.has("win_matrix")) {
                    winMap.set("win_matrix", [...winMap.get("win_matrix"), ...win_matrix]);
                } else {
                    winMap.set(`win_matrix`, win_matrix);
                }
                multiplierIndexPointer++;
            };
        }
        winMap.set("totalWin", totalWinInthisEvaluation)
        return winMap;
    };

    getWildType(column: any) {
        let wildType = "LITTLE-JOKER-WILD"
        if (column.has("BIG-JOKER-WILD")) {
            wildType = "BIG-JOKER-WILD"
        }
        return wildType;
    }

    mapTheGrid(grid: any) {

        // this points to the reel in our grid
        let current = 0;
        const mappedGrid = new Map();
        const goldenMap = new Map();
        const goldenCards = [];
        const scatters = [];

        while (current <= 4) {
            // the reel current reel of length four 
            let reel = grid[current];

            // dynamic key naming
            let map = `col${current}map`

            // creation of map for col
            mappedGrid.set(map, new Map());
            let col = mappedGrid.get(map);

            // heer the reel[j] is pointing to the element in the particular reel
            for (let j = 0; j < 4; j++) {
                if (reel[j].name === "SCATTER") {
                    let tempcard = {
                        position: [current, j],
                        card: reel[j]
                    }
                    scatters.push(tempcard)
                }
                // * checking is the card is golden card 
                if (reel[j].isGolden) {
                    goldenCards.push([current, j])
                    if (goldenMap.get(reel[j].name)) {
                        // * the key value should be "ACE" :  Array<[col , row]>
                        goldenMap.get(reel[j].name).push([current, j])
                    } else {
                        goldenMap.set(reel[j].name, [[current, j]])
                    }
                };
                // * mapping the column
                if (col.has(reel[j].name)) {
                    col.get(reel[j].name).push([current, j])
                } else {
                    col.set(reel[j].name, [[current, j]])
                }
            }
            current++;
        };
        let mg = structuredClone(mappedGrid);
        // console.log(chalk.magentaBright("[-------------MAPPING OF THE CURRENT GRID-------------]"))
        // console.log(mg)
        // console.log(chalk.magentaBright("[-------------SCATTERS PRESEMT IN THE ABOVE GRID-------------]"))
        // console.table(scatters)
        return { mg, goldenCards, goldenMap, grid, scatters };

    };

    // * generic function to insert cards at particular points 
    replaceCardsInGrid(grid: any, replaceCards: any) {
        let replcedGrid = structuredClone(grid)
        for (let i = 0; i < replaceCards.length; i++) {
            let co_ordinates = replaceCards[i].insertAt
            let col = co_ordinates[0];
            replcedGrid[co_ordinates[0]][co_ordinates[1]] = replaceCards[i].card
        }
        return replcedGrid;
    }

    // * static methods for flipping the cards based on the little or big wild
    littleJokerWild(grid: any, replaceCards: any) {
        return this.replaceCardsInGrid(grid, replaceCards);
    }

    bigJokerWild(grid: any) {

        let extraWildTriggeredByBigJokerWild = []
        let extraWildsCreated = Math.floor(Math.random() * 4) + 1;
        let extraWildTriggeredByBigJokerWildCount = extraWildsCreated;

        console.log(chalk.bgRedBright("THE GRID RECIEVED INSIDE THE BIGK=JOKERWILD-------------------------------"))
        console.log(chalk.magenta("----------THESE MANY EXTRA FLIP HAS BEEN CREATED-----------", extraWildsCreated));

        let newGrid = structuredClone(grid);
        while (extraWildsCreated > 0) {
            extraWildsCreated -= 1;
            // only from col 2 to 5 that means 1st index to 4th index hasbe replaced
            let col = Math.floor(Math.random() * 4) + 1;

            if(col === 0) {
                console.log("-------------------------Zero has generated in the randon function-----------")
            }
            //row can go from 0th row to 3rd row
            let row = Math.floor(Math.random() * 4);

            let setKey = `${col}${row}`

            console.log(chalk.red("THE FIRST COL OF THE GRID***********************************************************"));
            // console.log(newGrid[0])

            console.log(chalk.redBright(setKey) , "THE SRING REPRESNT THE COL AND ROW OF WILD HAS TO INSERTED")
            // only change the non SCATTER and non JOKER cards
            if (newGrid[col][row].name !== "SCATTER" && newGrid[col][row].name !== "JOKER" ) {
                console.log("THIS CARD WILL BE REPLACED" , newGrid[col][row])
                // console.log(chalk.red("MANIPULATING THE GRID FROM NORMAL TO WILD" , col , row))
                console.log(newGrid[0]);
                let card = {name: "BIG-JOKER-WILD",  isGolden : false}
                newGrid[col][row] = card
                extraWildTriggeredByBigJokerWild.push(
                    {
                        insertAt: [col, row],
                        card: {
                            name: "BIG-JOKER-WILD",
                            isGolden: false
                        }
                    })
            };
        };

        console.log(chalk.yellowBright("**********************GRID AT THE END OF BIG JOKER RANDOM FLIP*************************************"))
        console.log(newGrid)
        console.log(chalk.magenta("----------THESE MANY EXTRA FLIP HAPPENED DUE TO THE BIG-JOKER-WILD-----------", extraWildTriggeredByBigJokerWild.length));
        return { extraWildTriggeredByBigJokerWild, newGrid, extraWildTriggeredByBigJokerWildCount };
    }

    handleGoldenCards(goldenCards: [], grid: any) {
        console.log(chalk.bgGreen("THESE ARE THE GOLDEN CARDS MATRIX PASSED TO GET FLIPPED CARD"))
        console.log(goldenCards)
        let { goldenToWild, wildType } = reelService.flipGoldenCard(goldenCards);
        let result = {
            actualWildCardsCount: goldenCards.length,
            actualWildCards: [...goldenCards],
            extraWildTriggeredByBigJokerWildCount: 0,
            extraWildTriggeredByBigJokerWild: [],
            wildFormed: wildType,
            cardsFlipedToWild: goldenToWild,
        };
        if (wildType === "BIG-JOKER-WILD") {
            // replace the cards in the grid
            let modGrid = this.replaceCardsInGrid( structuredClone(grid) , goldenToWild); // passingActual fliped cards from gold to wild

            let { extraWildTriggeredByBigJokerWild, newGrid, extraWildTriggeredByBigJokerWildCount } = this.bigJokerWild(modGrid);
            return {
                ...result,
                grid: newGrid,
                extraWildTriggeredByBigJokerWild,
                extraWildTriggeredByBigJokerWildCount,
            }
        }
        else {
            let littleWildGrid = this.littleJokerWild(structuredClone(grid), goldenToWild)
            return {
                ...result,
                grid: littleWildGrid,
                bigWildSubcards: null
            }
        }
    };

    startScatter(betAmount:number , freeSpin:number  = 10) : any[] {
        // data required - at start 10 spins sum of five will be added to the originall count if scatter happens in the scatter phase 
        // betamount , totalWinHappened in the cascade phase , scatterComboMultilierd
        let scatterPhaseResult:Array<any> = []
        let currentSpin = 0
        while(freeSpin > 0){
            currentSpin++;
            let scatterRootGrid = this.generateGrid();
            console.log(chalk.magenta("grid generated in scatter spahse" ))
            console.log(scatterRootGrid)
            let scatterCascadeResult = this.spin(scatterRootGrid , betAmount);
            if(scatterCascadeResult.triggerScatter){
                freeSpin += 5;
            }
            let scatterIndividualSpinWin = { currentSpin : structuredClone(scatterCascadeResult) }
            scatterPhaseResult.push(scatterIndividualSpinWin)
            freeSpin--;
        }
        return scatterPhaseResult ;
    };

    // pass the scatter count value and let themethid to return the freeSpins
    updateFreeSpin(scatterCards: any, freeSpinsCount = 0, scatterHappendInthisSpinCycle: number) {
        let freeSpins = freeSpinsCount > 0 ? 5 : 10;
        scatterHappendInthisSpinCycle += scatterCards.length >= 3 ? 1 : 0;
        freeSpinsCount += freeSpins
        return freeSpinsCount;
    }

    loggSpinResults(spinResult: any) {

        spinResult.forEach((result: any) => {

            console.log(chalk.greenBright("-------------GRID BEFORE EVALAUATION-------------------"))
            console.table(result.reelWindowBeforeEvaluation);

            console.log(chalk.green("-------------WINS FOUND-----------------"))
            console.table(result.wins)

            console.log(chalk.magentaBright("-------------GRID AFTER EVALAUATION AND REPLACING THE NON-GOLDEN CARDS-------------------"))
            console.table(result.reelWindowAfterEvaluation);

            if (result.isGoldenCardsPresentInWinWays) {
                console.log(chalk.yellowBright("-------------GRID AFTER EVALAUATION AND REPLACING THE GOLDEN CARDS-------------------"))
                console.table(result.reelWindowAfterWildFlip)
            } else {
                console.log(chalk.yellowBright("-------------NO GOLDEN CARDS PRESENT IN THE WINS WAYS SO GRIS REAMINS SAME AS reelWindowAfterEvaluation -------------------"))
                console.table(result.reelWindowAfterWildFlip)
            }

        })
    }

    spin(reelWindow: any, betAmount: number): any {
        let comboMultiplierArray = [1, 2, 4, 10]
        let comboMultiplieIndex = 0;
        let triggerScatter = false;
        let cascades: any[] = [];
        let currentGrid = reelWindow;
        let hasWin = true;
        let spinSessionTotal = 0;
        while (hasWin) {
            let result: any = {
                actualWildCardsCount: 0,
                actualWildCards: [],
                extraWildTriggeredByBigJokerWildCount: 0,
                extraWildTriggeredByBigJokerWild: [],
                wildFormed: "NO WILD FORMED",
                cardsFlipedToWild: []
            };
            let { mg, goldenCards, goldenMap, scatters } = this.mapTheGrid(currentGrid);

            let hasScatter = scatters.length >= 3;

            triggerScatter = (triggerScatter === false) && hasScatter === true ? true : triggerScatter;

            console.log(chalk.bgMagentaBright("the grid before passing to the evaluatore"))
            console.log(currentGrid);

            let evaluationResult = this.evaluate(currentGrid[0], mg, goldenMap, betAmount);

            result.wins = [...evaluationResult.get("wins")]

            result.totalWin = evaluationResult.get("totalWin")

            spinSessionTotal += result.totalWin

            result.isWinPresent = hasWin;

            result.reelWindowBeforeEvaluation = structuredClone(currentGrid);

            result.winningCoordinates = [...evaluationResult.get("win_matrix")]

            hasWin = result.winningCoordinates.length >= 3;

            // if no win just break
            if (!hasWin) break;

            let replacementCards = this.generatePartial(result.reelWindowBeforeEvaluation, result.winningCoordinates);

            let goldenWinnigCards = evaluationResult.get("lockedCards");

            let hasGodldenCards = goldenWinnigCards.length > 0;

            result.isGoldenCardsPresentInWinWays = goldenWinnigCards.length > 0;

            result.scatterFormed = hasScatter;

            result.replacementCards = replacementCards;

            // creating copy of the 
            let modifiedGrid = structuredClone(this.replaceCardsInGrid(result.reelWindowBeforeEvaluation, result.replacementCards));

            result.reelWindowAfterEvaluation = modifiedGrid;

            let  wildFlipedGrid = modifiedGrid;;

            if (hasGodldenCards) {
                let {
                    grid,
                    actualWildCardsCount,
                    actualWildCards,
                    extraWildTriggeredByBigJokerWildCount,
                    extraWildTriggeredByBigJokerWild,
                    wildFormed,
                    cardsFlipedToWild
                } = gridService.handleGoldenCards(goldenWinnigCards, modifiedGrid);
                    result.actualWildCardsCount = actualWildCardsCount,
                    result.actualWildCards = actualWildCards,
                    result.extraWildTriggeredByBigJokerWildCount = extraWildTriggeredByBigJokerWildCount,
                    result.extraWildTriggeredByBigJokerWild = extraWildTriggeredByBigJokerWild,
                    result.wildFormed = wildFormed,
                    result.cardsFlipedToWild = cardsFlipedToWild
                    wildFlipedGrid = grid
            };
            result.reelWindowAfterWildFlip = wildFlipedGrid;

            result.comboMultiplierLevel = comboMultiplierArray[comboMultiplieIndex];

            comboMultiplieIndex = comboMultiplieIndex === 3 ? 0 : comboMultiplieIndex += 1;

            cascades.push(structuredClone(result));

            currentGrid = wildFlipedGrid ;
        };
        return { cascades, triggerScatter, spinSessionTotal };
    }

}
export const gridService = new Grid();

;
