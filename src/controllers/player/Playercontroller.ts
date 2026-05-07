import { setCache } from "../../connections/redisService.js";
import { getUserDataFromSource } from "../../services/userInfo.js";
import { Request , Response } from "express";
import crypto from "crypto"
import chalk from "chalk";

class playercontroller{

    async getPlayerDetails (req : Request , res : Response){

       const { token ,  game_id } = req.body ;
         
         // check cache has the vlaue sessionID value 
         // if present send those data else getUser from 
         // getting player from the admin source
        let player = await getUserDataFromSource(token , game_id);
     
        const sessionId = crypto.randomUUID()
        console.log(chalk.red("THE GENERATED SESSION ID" ,  sessionId) )

         if(player){
           await setCache(player?.user_id , JSON.stringify(player!))
         }

         if(player.status === false){
              console.log(player)
              return res.status(401).json(player)
         }
         
         return res.status(200).json({
            msg:"Player Data",
            player
         });
    }

}


const playerControllerServices = new playercontroller();
export default playerControllerServices ;