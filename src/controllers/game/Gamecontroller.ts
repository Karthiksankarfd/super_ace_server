import { NextFunction, Request, Response } from "express";
import { slotMachine } from "../../game.services/Grid.services.js";
import chalk from "chalk";
import { updateBalanceFromAccount } from "../../services/Admin.service.js";
import { deleteCache, getCache, setCache } from "../../connections/redisService.js";
import MysqlGameRepoServices from "../../infrastructure/database/mysql/MysqlGameRepoServices.js";
import Database from "../../infrastructure/database/mysql/Database.js";
import { appConfig } from "../../config/appConfig.js";
import { getUserDataFromSource } from "../../services/userInfo.js";



const db = Database.getInstance(appConfig.dbConfig)
db.connect()

const pool = Database.getInstance(appConfig.dbConfig)
const mysqlGameRepoServices = new MysqlGameRepoServices(pool);

class Gamecontroller {

  async initGameDetails(req: Request, res: Response, next: NextFunction) {

    const { token, game_id } = req.body;
    console.log(token)

    if( !token || !game_id){
          next("Token or game id is missing")
    }

    let response = await getUserDataFromSource(token, game_id);
    console.log(response);

    if (response.status === false || !response?.user_id) {
      return res.status(400).json(response)
    };
    
    let sessionID = `${response.operatorId}-${response.user_id}-superace`
    let isActive = await getCache(sessionID)

    if(isActive){
        return {
          msg: "You are from a device connected already"
        }
    };

    let baseGameData = {
      minBet: appConfig.minBetAmount,
      maxBet: appConfig.maxBetAmount,
      reelWindow: [
        ["ACE", "ACE", "ACE", "ACE"],
        ["KING", "KING", "KING", "KING"],
        ["QUEEN", "QUEEN", "QUEEN", "QUEEN"],
        ["JOKER", "JOKER", "JOKER", "JOKER"],
        ["SPADE", "SPADE", "SPADE", "SPADE"]
      ]
    }
    await setCache(response.user_id , JSON.stringify(response));
    return res.status(200).json({ ...response, msg: "successfully recieved base game data", ...baseGameData })
  };

  async spin(req: Request, res: Response, next: NextFunction) {

    console.log(chalk.bgGreen("--------------------------THE SPIN CYCLE HAS STARTED---------------------------"));

    const { betAmount, spinId, spinIdCacheKey , user_id , game_id , token} = req.body;

    if(!token || !game_id || !betAmount || !spinIdCacheKey || !user_id){
          next("Key datas token || game_id || betAmount || spinIdCacheKey || user_id is missing")
    }
    let grid = slotMachine.generateGrid();
    let scatterPhaseResultData: any = []
    let spinResult = slotMachine.spin(grid, betAmount);
    let initialGridState = structuredClone(grid);
    slotMachine.loggSpinResults(spinResult.cascades);

    if (spinResult.triggerScatter) {
      console.log(chalk.bgGreen("--------------------------THE scatter SPIN CYCLE HAS STARTED---------------------------"));
      scatterPhaseResultData = slotMachine.startScatter(betAmount)
      console.log(chalk.red("-------------------------------THE SCATTER PHASE HAS ENED----------------------------------------------"))
    };

    try{
      // all should happen in a linear way if one thing fails we might face issue for sure 
      await updateBalanceFromAccount({ ...req.body, winAmount: spinResult.spinSessionTotal }, "CREDIT")
      // await mysqlGameRepoServices.insertSpinData(spinIdCacheKey, "dev-team0o090", betAmount, "priti--2222", spinResult.spinSessionTotal, "transaction-123", JSON.stringify(req.body) , next)
      await deleteCache(`${user_id}_spinId`);
      console.log("Im running")
      console.log(chalk.bgMagenta("|--------------------------THE SPIN CYCLE HAS ENDED---------------------------|"));
      return res.status(200).json({ spinId: spinIdCacheKey, status:"SUCCESS", msg:`successfully executed spin with spinId ${spinIdCacheKey}`, spinSessionTotal:spinResult.spinSessionTotal,  initialGridState, spinResult, scatterPhaseResultData });
    }catch(e){
      next(e)
    }
  };

  // before spin validate the bet data and deduct 
  // redis will the place which will have the updated user data 
  async validdateSpin(req: Request, res: Response, next: NextFunction) {
    // each spin will have the spinId that is unique for each spin request 
    const { betAmount, operatorId, id, user_id, game_id, token, minimumBet, maximumBet, spinId } = req.body;
    console.log("inside the validator 1")
    if(!token || !game_id || !betAmount  || !user_id || !minimumBet || !maximumBet ){
          next("Key datas token || game_id || betAmount || spinIdCacheKey || user_id is missing")
    };
    console.log("inside the validator 2")

    let playerData = await getCache(user_id);
    console.log(chalk.redBright("PLAYER DETAILS FROM CACHE"));
    console.log(playerData);
    let parsedData;

    console.log("inside the validator 3")
    if (playerData) {
      parsedData = { ...JSON.parse(playerData) }
    };

    console.log("inside the validator 4")
    let spinIdCacheKey = `spinId_${user_id}_${Date.now()}`;
    let isSpinCachePresent = await getCache(`${user_id}_spinId`);

    console.log("inside the validator 5")
    if (isSpinCachePresent) {
      return res.status(202).json({ msg: "Cannot place another spin request while previous is in progress" })
    };

    req.body.spinIdCacheKey = spinIdCacheKey

    if (betAmount < minimumBet || betAmount > maximumBet) return res.status(301).json({ msg: "Invalid Bet Amount" });

    let transactinStatus = await updateBalanceFromAccount(req.body, "DEBIT")
    console.log(transactinStatus);

    if (!transactinStatus.status) {
      next("Failed to Debit Money from wallet please try again...")
    };
 console.log("inside the validator 6")
    // ? store the spinId or reqId only if it passes all
    await setCache(user_id, JSON.stringify(parsedData));
    await setCache(`${user_id}_spinId`, spinIdCacheKey)
    next();
  };

}

const gameControllerServices = new Gamecontroller();
export default gameControllerServices;