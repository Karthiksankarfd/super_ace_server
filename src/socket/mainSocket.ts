import { Server, Socket } from "socket.io";
import chalk from "chalk";
import { getUserDataFromSource } from "../services/userInfo.ts";
import { deleteCache, getCache, redis, setCache} from "../connections/redisService.ts";
import { updateBalanceFromAccount } from "../services/Admin.service.ts";
import Game from "../game/Game.ts";
import { gridService } from "../game.services/Grid.services.ts";
import { reelService } from "../game.services/Reel.services.ts";

const game = new Game() ; 
export const initializeSocket = (io: Server) => {
    io.on('connection', async (socket: Socket) => {
        console.log(chalk.gray("User Connected: ", socket.id));
        const { token, game_id } = socket.handshake.query as {token? :string, game_id? :string};
        console.log("Token and Game Id: ",token , game_id);

        if ( !token || !game_id) {
            socket.disconnect(true);
            console.log("Mandatory params are missing ", token);
            return;
        }

        const userData = await getUserDataFromSource(token, game_id);
        if (!userData) {
            console.log('Invalid token ', token);
            socket.disconnect(true);
            return;
        }

        const oldSocketId = await getCache(userData.id);
        console.log(oldSocketId ,chalk.red("This is from mainScoktet"))
        if (oldSocketId) {
            const oldSocket = io.sockets.sockets.get(oldSocketId);
                console.log(oldSocket)
                console.log(oldSocket!?.rooms , "THIS IS FROM OLDSOCKET");
                // const rooms = Array.from(oldSocket!?.rooms).filter(room => room !== socket.id);
                // console.log(rooms); // Output: [ 'someRoom' ]

            if (oldSocket) {
                oldSocket.emit('message', {
                    eventName: 'forceLogout',
                    data: { message: 'User connected from another source' },
                });
                // join player to that room 
                // if gametste is execpr home push delete
                await deleteCache(oldSocketId);
                oldSocket.disconnect(true);
            }
        };
        const grid = [
                ["A", "K", "Q", "Joker", "Spade"],
                ["A", "K", "Q", "Joker", "Spade"],
                ["A", "K", "Q", "Joker", "Spade"],
                ["A", "K", "Q", "Joker", "Spade"]
            ];
        const multiplier = ["x1" , "x2" , "x3" , "x5"];

        socket.emit('info', 
            {
                user_id: userData.user_id,
                operator_id: userData.operatorId,
                balance: userData.balance,
                token: userData.token,
                grid,
                min_bet : 25,
                max_bet : 25000,
                multiplier
            },
        );

        socket.on("spin" , ()=>{
            let data = structuredClone(game.spin())
            console.log(chalk.bgBlue("--GENERATED MATRIX--"))
            console.table( data.grid )
            console.log(chalk.bgBlue("--THE GOLDEN CARDS MATRIX CO-ORDINATES--"))            
            console.table(  data.mappedGrid.goldenCards )
            console.log(chalk.bgBlue("--THE WINS FROM THE MATRIX--"))               
            console.table(data.wins)
            console.table(data.wins.get("win_matrix"))
            console.log(chalk.bgBlue("--THIS IS THE GOLDEN CARD MATRIX CO-ORDINATES PER REELS"))
            console.table(data.mappedGrid.goldenMap)
            console.log(chalk.bgBlue("LOCKED GOLDEN CARDS"));
            console.log(data?.wins.get("lockedCards"));
            console.log(chalk.bgBlue("WIN WAYS IN THE GRID"));
            console.log(data.wins.get("win_matrix"));
            socket.emit("gridGenerated" , {data , grid: data.grid , win_ways: data.wins.get("win_matrix"), locked_cards : data.wins.get("lockedCards")})
            console.log(chalk.blue("THE NO OF WAYS WIN CAN HAPPEN IN THIS CURRENT MATRIX"));
            console.log(data.wins.get("ACE"))
            console.log(chalk.blue("------------------------THE WIN MAP-----------------------"));
            console.log(data.wins)
            if(data.wins.get("win_matrix")?.length > 0){
                console.log(chalk.greenBright("WIN IS THERE SO REMOVE AND PROVIDE REPLACE"));
                let regeneratedCards = gridService.generatePartial(data.grid , data.wins.get("win_matrix"));
                console.log(chalk.greenBright("THE REPLACEMENT CARDS FOR THE CURRENT MATRIX"));
                console.log(regeneratedCards);
                socket.emit("REPLACE-CARDS" , {regeneratedCards , locked_cards: data.wins.get("lockedCards")});
                if(data.wins.get("lockedCards")?.length){
                   let flipedCards = reelService.flipGoldenCard(data.wins.get("lockedCards"));
                   socket.emit("FLIP-GOLDENCARDS" , flipedCards)
                };
                
            }
        })
        
        // await setCache(`PL:${socket.id}`, JSON.stringify({ ...userData, socket_id: socket.id, game_state: "HOME"}), 3600);
        // socket.on('disconnect', async  () => {
        //   console.log(chalk.gray("User Disconnected: ", socket.id));
        //   let user =  await redis.hgetall(`user:${socket.id}`)
        //   console.log(chalk.yellow("user has disconnected so deleting all user info from cache and returing the balance if bet has been place"))
        //   console.log(user)
           
        //   await updateBalanceFromAccount(user , "CREDIT").then(()=>{
        //     console.log("Refund inintiated")
        //   }).catch((e)=>{
        //     console.log(e , "Error initiating refund")
        //   })
 
        //   await redis.hdel(`user:${socket.id}`).then(()=>{
        //     console.log(chalk.green(`Deleted all cache related to socketId : ${socket.id}`))
        //   }).catch((e)=>{
        //     console.log("Error deleting cache " , e.message)
        //   })
        // });

        socket.on('error', (error: Error) => {
            console.log(`Socket Error: ${socket.id}, Error: ${error.message}`);
        });
        
    });
}