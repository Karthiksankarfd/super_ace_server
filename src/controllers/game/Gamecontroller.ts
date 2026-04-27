import { NextFunction, Request , Response } from "express";
import { gridService } from "../../game.services/Grid.services";
import chalk from "chalk";
import { prepareDataForWebhook, updateBalanceFromAccount } from "../../services/Admin.service";
import { getCache, setCache } from "../../connections/redisService";

class Gamecontroller{

    async spin(req:Request , res:Response , next:NextFunction){
        console.log(chalk.bgGreen("--------------------------THE SPIN CYCLE HAS STARTED---------------------------"));
        const { betAmount } =  req.body ;
        let grid =  gridService.generateGrid() ;
        let scatterPhaseResultData :any  = []
        let spinResult = gridService.spin(grid ,  betAmount);
        let initialGridState = structuredClone(grid) ;
        gridService.loggSpinResults(spinResult.cascades);
        if(spinResult.triggerScatter){            
            console.log(chalk.bgGreen("--------------------------THE scatter SPIN CYCLE HAS STARTED---------------------------"));
            // return ;
            scatterPhaseResultData = gridService.startScatter(betAmount)
            console.log(chalk.red("-------------------------------THE SCATTER PHASE HAS ENED----------------------------------------------"))
        }
        console.log(chalk.bgMagenta("|--------------------------THE SPIN CYCLE HAS ENDED---------------------------|"));
        await updateBalanceFromAccount({...req.body , winAmount: spinResult.spinSessionTotal }, "CREDIT")
        return res.status(200).json({ initialGridState, spinResult, scatterPhaseResultData })
    };

    // before spin validate the bet data and deduct 
    // redis will the place which will have the updated user data 
    async validdateSpin(req: Request , res: Response , next: NextFunction){
      // each spin will have the spinId that is unique for each spin request 

      const { betAmount, operatorId, id, user_id , game_id, token ,  minimumBet , maximumBet, spinId } = req.body;
      let playerData = await getCache(user_id);

      console.log(chalk.redBright("PLAYER DETAILS FROM CACHE"))
      console.log(playerData)
      let parsedData ;

      if(playerData){
        parsedData = {...JSON.parse(playerData)}
      };

    //   if(parsedData.spinId === spinId){
    //      return res.status(400).json({msg: "Request Is In Progress"})
    //   }

      if(betAmount < minimumBet  || betAmount > maximumBet ) return res.status(301).json({msg:"Invalid Bet Amount"});

      if(betAmount > parsedData?.balance!) return res.status(301).json({msg:"Insufficient Balance"});

      let transactinStatus = await updateBalanceFromAccount(req.body , "DEBIT")
      console.log(transactinStatus);
      if(!transactinStatus.status){
          return res.status(403).json({
            msg:"Failed to debit the balance"
          })
      }
      parsedData.spinId = spinId,
      console.table(parsedData)
      parsedData.balance = (parsedData.balance - betAmount)
      console.table(parsedData)
      await setCache(user_id , JSON.stringify(parsedData))
      next();

    };


}

const gameControllerServices = new Gamecontroller();
export default gameControllerServices ;