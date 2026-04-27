import { NextFunction, Request , Response } from "express";
import { gridService } from "../../game.services/Grid.services";
import chalk from "chalk";
import { prepareDataForWebhook, updateBalanceFromAccount } from "../../services/Admin.service";

class Gamecontroller{

    async spin(req:Request , res:Response , next:NextFunction){
        console.log(chalk.bgGreen("--------------------------THE SPIN CYCLE HAS STARTED---------------------------"));
        const { betAmount } =  req.body ;
        let grid =  gridService.generateGrid() ;
        let scatterPhaseResultData  = []
        console.log("This the root window " , grid) ;
        let spinResult = gridService.spin(grid ,  betAmount);
        let initialGridState = structuredClone(grid)
        gridService.loggSpinResults(spinResult.cascades);
        if(spinResult.triggerScatter){
            scatterPhaseResultData = gridService.startScatter(betAmount)
        }
        console.log(chalk.bgRed("|--------------------------THE SPIN CYCLE HAS ENDED---------------------------|"));
        return res.status(200).json({ initialGridState, spinResult, scatterPhaseResultData })
    };

    // before spin validate the bet data and deduct 
    // redis will the place which will have the updated user data 
    async validdateSpin(req: Request , res: Response , next: NextFunction){
       const { betAmount, operatorId, id, game_id, token ,  minimumBet , maximumBet } = req.body;
       // call redisservvices.getplayerByUserId gte the updated data 
       // let playerData = redisservvices.getplayerByUserId()
       let playerData = {
        name: "priti",
        user_id: "priti_9943",
        balance: 19904048.56,
        avatar: null,
        operatorId: "devteam_7071",
        id: "devteam_7071:priti_9943",
        game_id: "102",
        token: "019dbc27-e9f268e0-75b9-81d0a1-b7"
      };

      // class for response structure with msg , statusCode , 
      if(betAmount < minimumBet  || betAmount > maximumBet ) return res.status(301).json({msg:"Invalid Bet Amount"});
      if(betAmount > playerData.balance) return res.status(301).json({msg:"Insufficient Balance"});
      let transactinStatus = await updateBalanceFromAccount(req.body , "DEBIT")
      console.log(transactinStatus);
      if(!transactinStatus.status){
          return res.status(403).json({
            msg:"Failed to debit the balance"
          })
      }
      next()
    };
}

const gameControllerServices = new Gamecontroller();
export default gameControllerServices ;