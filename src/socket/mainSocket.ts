import { Server, Socket } from "socket.io";
import chalk from "chalk";
import { getUserDataFromSource } from "../services/userInfo";
import { deleteCache, getCache, redis, setCache } from "../connections/redisService";
import { updateBalanceFromAccount } from "../services/Admin.service";
import Game from "../game/Game";
import { gridService } from "../game.services/Grid.services";
import { reelService } from "../game.services/Reel.services";
import { time } from "node:console";

const game = new Game();
export const initializeSocket = (io: Server) => {
    io.on('connection', async (socket: Socket) => {
        console.log(chalk.gray("User Connected: ", socket.id));
        // const { token, game_id } = socket.handshake.query as { token?: string, game_id?: string };
        // console.log("Token and Game Id: ", token, game_id);

        // if (!token || !game_id) {
        //     socket.disconnect(true);
        //     console.log("Mandatory params are missing ", token);
        //     return;
        // }

        // const userData = await getUserDataFromSource(token, game_id);
        // if (!userData) {
        //     console.log('Invalid token ', token);
        //     socket.disconnect(true);
        //     return;
        // }

        // const oldSocketId = await getCache(userData.id);
        // console.log(oldSocketId, chalk.red("This is from mainScoktet"))
        // if (oldSocketId) {
        //     const oldSocket = io.sockets.sockets.get(oldSocketId);
        //     console.log(oldSocket)
        //     console.log(oldSocket!?.rooms, "THIS IS FROM OLDSOCKET");
        //     // const rooms = Array.from(oldSocket!?.rooms).filter(room => room !== socket.id);
        //     // console.log(rooms); // Output: [ 'someRoom' ]

        //     if (oldSocket) {
        //         oldSocket.emit('message', {
        //             eventName: 'forceLogout',
        //             data: { message: 'User connected from another source' },
        //         });
        //         // join player to that room 
        //         // if gametste is execpr home push delete
        //         await deleteCache(oldSocketId);
        //         oldSocket.disconnect(true);
        //     }
        // };
        const grid = [
            ["A", "K", "Q", "Joker", "Spade"],
            ["A", "K", "Q", "Joker", "Spade"],
            ["A", "K", "Q", "Joker", "Spade"],
            ["A", "K", "Q", "Joker", "Spade"]
        ];
        const multiplier = ["x1", "x2", "x3", "x5"];

        // socket.emit('info',
        //     {
        //         user_id: userData.user_id,
        //         operator_id: userData.operatorId,
        //         balance: userData.balance,
        //         token: userData.token,
        //         grid,
        //         min_bet: 25,
        //         max_bet: 25000,
        //         multiplier
        //     },
        // );

        socket.on("spin", () => {
                console.log(chalk.bgGreen("--------------------------THE SPIN CYCLE HAS STARTED---------------------------"));
                let multiplier  = 1  ;
                let isWin = false ;
                let maxReLoop = 5 ;
                let timer =  3000 ;
                let data = structuredClone(game.spin()) ;
                socket.emit("gridGenerated", { data, grid: data?.grid, win_ways: data?.wins.get("win_matrix"), locked_cards: data?.wins.get("lockedCards") });
                {
                // console.log(chalk.bgBlue("--GENERATED MATRIX--"))
                // console.table(data?.grid)
                // console.log(chalk.bgBlue("--THE GOLDEN CARDS MATRIX CO-ORDINATES--"))
                // console.table(data?.mappedGrid.goldenCards)
                // console.log(chalk.bgBlue("--THE WINS FROM THE MATRIX--"))
                // console.table(data?.wins)
                // console.table(data?.wins.get("win_matrix"))
                // console.log(chalk.bgBlue("--THIS IS THE GOLDEN CARD MATRIX CO-ORDINATES PER REELS"))
                // console.table(data?.mappedGrid.goldenMap)
                // console.log(chalk.bgBlue("LOCKED GOLDEN CARDS"));
                // console.log(data?.wins.get("lockedCards"));
                // console.log(chalk.bgBlue("WIN MATRIX IN THE GRID"));
                // console.log(data?.wins.get("win_matrix"));
                // console.log(chalk.bgBlue("TOTAL NUMBER OF WAYS THE WINS CAN HAPPEN"));
                // console.table(data?.wins.get("ways"))
                // console.log(chalk.blue("------------------------THE WIN MAP-----------------------"));
                // console.table(data?.wins)
                }

                if(data?.wins.get("win_matrix")?.length > 0){
                    isWin = true ; 
                }
                while(isWin){
                    {
                        console.log(chalk.yellow("-----------[WINS HAPPEND IN THIS MATRIX START]-----------"))
                        console.log(data.wins.get("ACE"))
                        console.log(data.wins.get("SPADE"))
                        console.log(data.wins.get("QUEEN"))
                        console.log(data.wins.get("DIAMOND"))
                        console.log(data.wins.get("JOKER"));
                        console.log(data.wins.get("CLUBS"));
                        console.log(data.wins.get("KING"));
                        console.log(chalk.yellow("-----------[WINS HAPPEND IN THIS MATRIX END]-----------"))
                    }
                    isWin =  false ; // setting the flag  immediatley false ; 
                    maxReLoop--;
                    // console.log(chalk.bgRed("INSIDE THE LOOP FOR RE EVALUATING AND " , maxReLoop))
                    console.log(chalk.bgBlue("--GENERATED MATRIX--"))
                    console.table(data?.grid) 
                    // console.log(chalk.greenBright("WIN IS THERE SO REMOVE AND PROVIDE REPLACE"));
                    let regeneratedCards = gridService.generatePartial(data?.grid, data?.wins.get("win_matrix"));
                    // console.log(chalk.greenBright("THE REPLACEMENT CARDS FOR THE CURRENT MATRIX"));
                    // console.log(regeneratedCards);

                    let flipedCards = reelService.flipGoldenCard(data.wins.get("lockedCards"));

                    setTimeout(() => {
                        socket.emit("REPLACE-CARDS", { regeneratedCards, locked_cards: data?.wins.get("lockedCards")});
                        if (data?.wins.get("lockedCards")?.length) {
                            socket.emit("FLIP-GOLDENCARDS", flipedCards)
                        }; 
                    }, timer); // loop does it jobs and schedule the callback when call back timer exceeds itsires at an time
                    timer += 3000 ;

                    //inserting the new generatedCards after elimination
                    let modified_grid = gridService.replaceCardsInGrid(data?.grid , regeneratedCards) ; 
                    console.log(chalk.bgBlue("--[GRID AFTER REPLACING THE FOLLOWING WINNING CARDS]--") , data.wins.get("win_matrix"))
                    console.table(modified_grid) 

                    // passing the modified grid and fliping the goldenCards
                    let flipedGrid = gridService.replaceCardsInGrid(modified_grid , flipedCards);
                    data.grid = flipedGrid ; // refactoring the same data object

                    console.log(chalk.bgBlue("--[GRID AFTER FLIPPING THE FOLLOWING GOLDEN CARDS THAT MAKES WIN" , data.wins.get("lockedCards")))
                    console.table(flipedGrid);

                    let gridMap = gridService.mapTheGrid(flipedGrid);
                    data.mappedGrid = gridMap ; // refactoring the same data object
                    console.log(chalk.bgBlack("[-------------MAPPING OF THE CURRENT GRID-------------]"))
                    console.log(data.mappedGrid)

                    let winPhaseResult = gridService.evaluate(data!.grid[0], gridMap.mg , gridMap.goldenMap);
                    data?.wins.set("win_matrix" , winPhaseResult.get("win_matrix")) // refactoring the same data object

                    if(!winPhaseResult.get("win_matrix")){
                        isWin = false
                    }
                    if(winPhaseResult.get("win_matrix")?.length > 0){
                        console.log(chalk.greenBright("win found again"))
                        isWin = true ;
                    }else{
                        {
                            console.log(chalk.yellow("-----------[WINS HAPPEND IN THIS MATRIX START]-----------"))
                            console.log(data.wins.get("ACE"))
                            console.log(data.wins.get("SPADE"))
                            console.log(data.wins.get("QUEEN"))
                            console.log(data.wins.get("DIAMOND"))
                            console.log(data.wins.get("JOKER"));
                            console.log(data.wins.get("CLUBS"));
                            console.log(data.wins.get("KING"));
                            console.log(chalk.yellow("-----------[WINS HAPPEND IN THIS MATRIX END]-----------"))
                        }
                        console.log(chalk.redBright("NO WINS"))
                    }
                } 
                console.log("The number of call backs scheduled is " , 5 - maxReLoop)
                console.log(chalk.bgRed("|--------------------------THE SPIN CYCLE HAS ENDED---------------------------|"))
        })

        socket.on('error', (error: Error) => {
            console.log(`Socket Error: ${socket.id}, Error: ${error.message}`);
        });

    });
}