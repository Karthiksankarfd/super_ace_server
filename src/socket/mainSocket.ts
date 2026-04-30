// import { Server, Socket } from "socket.io";
// import chalk from "chalk";
// import { getUserDataFromSource } from "../services/userInfo";
// import { deleteCache, getCache, redis, setCache } from "../connections/redisService";
// import { updateBalanceFromAccount } from "../services/Admin.service";
// // import Game from "../game/Game";
// import { gridService } from "../game.services/Grid.services";
// import { reelService } from "../game.services/Reel.services";
// import { time } from "node:console";

// // const game = new Game();
// export const initializeSocket = (io: Server) => {
//     io.on('connection', async (socket: Socket) => {
//         console.log(chalk.gray("User Connected: ", socket.id));
//         // const { token, game_id } = socket.handshake.query as { token?: string, game_id?: string };
//         // console.log("Token and Game Id: ", token, game_id);

//         // if (!token || !game_id) {
//         //     socket.disconnect(true);
//         //     console.log("Mandatory params are missing ", token);
//         //     return;
//         // }

//         // const userData = await getUserDataFromSource(token, game_id);
//         // if (!userData) {
//         //     console.log('Invalid token ', token);
//         //     socket.disconnect(true);
//         //     return;
//         // }

//         // const oldSocketId = await getCache(userData.id);
//         // console.log(oldSocketId, chalk.red("This is from mainScoktet"))
//         // if (oldSocketId) {
//         //     const oldSocket = io.sockets.sockets.get(oldSocketId);
//         //     console.log(oldSocket)
//         //     console.log(oldSocket!?.rooms, "THIS IS FROM OLDSOCKET");
//         //     // const rooms = Array.from(oldSocket!?.rooms).filter(room => room !== socket.id);
//         //     // console.log(rooms); // Output: [ 'someRoom' ]

//         //     if (oldSocket) {
//         //         oldSocket.emit('message', {
//         //             eventName: 'forceLogout',
//         //             data: { message: 'User connected from another source' },
//         //         });
//         //         // join player to that room 
//         //         // if gametste is execpr home push delete
//         //         await deleteCache(oldSocketId);
//         //         oldSocket.disconnect(true);
//         //     }
//         // };
//         const grid = [
//             ["A", "K", "Q", "Joker", "Spade"],
//             ["A", "K", "Q", "Joker", "Spade"],
//             ["A", "K", "Q", "Joker", "Spade"],
//             ["A", "K", "Q", "Joker", "Spade"]
//         ];
//         const multiplier = ["x1", "x2", "x3", "x5"];  
//         // socket.emit('info',
//         //     {
//         //         user_id: userData.user_id,
//         //         operator_id: userData.operatorId,
//         //         balance: userData.balance,
//         //         token: userData.token,
//         //         grid,
//         //         min_bet: 25,
//         //         max_bet: 25000,
//         //         multiplier
//         //     },
//         // );

//         socket.on("spin", (betData) => {
//             console.log(chalk.bgGreen("--------------------------THE SPIN CYCLE HAS STARTED---------------------------"));
//             let grid =  gridService.generateGrid()
//             console.log("This the root window " , grid)
//             let spinResult = gridService.spin(grid ,  betData.betAmount);
//             let initialGridState = structuredClone(grid)
//             gridService.loggSpinResults(spinResult.cascades);
//             socket.emit("SPIN-CYCLE-RESULT" , { initialGridState, ...spinResult } );
//             console.log(chalk.bgRed("|--------------------------THE SPIN CYCLE HAS ENDED---------------------------|"));
//         });

//         socket.on('error', (error: Error) => {
//             console.log(`Socket Error: ${socket.id}, Error: ${error.message}`);
//         });
//     });
// }