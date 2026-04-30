import { setCache } from "../../connections/redisService";
import { getUserDataFromSource } from "../../services/userInfo";
import { Request , Response } from "express";

class playercontroller{

    async getPlayerDetails (req : Request , res : Response){
         const { token ,  game_id } = req.body ;
         
         // getting player from the admin source
        let player = await getUserDataFromSource(token , game_id);

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