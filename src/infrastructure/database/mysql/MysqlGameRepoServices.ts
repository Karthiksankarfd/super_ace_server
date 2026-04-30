import chalk from "chalk";
import Database from "./Database";
import Mysqlclient from "./Mysqlclient";
import { appConfig } from "../../../config/appConfig";
appConfig
interface GameRepoServicesInterface {
    insertSpinData(spinId: string, operatorId: string, betAmount: number, userID: string, winAmount: number, transactionId: string, spinDetails: string): void;
}

export default class MysqlGameRepoServices implements GameRepoServicesInterface {

    protected pool;
    constructor(dbInstance: Database) {
        this.pool = dbInstance
    }
    // store the spinId, betAmount, userID, winAmount, transactionId, spinDetails -> whole json as string
    async insertSpinData(spinId: string, operatorId: string, betAmount: number, userID: string, winAmount: number, transactionId: string, spinDetails: string): Promise<void> {
        console.log(chalk.greenBright("INSERING THE GAME DATA"))
        await this.pool.connection!.query(`USE ${appConfig.dbConfig.database}`);
        try {
            let res = await this.pool.connection!.execute(
                `INSERT INTO spindata 
                 (spinId, operatorId, betAmount, userID, winAmount, transactionId, spinDetails)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [spinId, operatorId, betAmount, userID, winAmount, transactionId, spinDetails]
            );
            console.log(res, "The respnse of ")
        } catch (e) {
            console.log(chalk.red("ERROR IN INSERTING", e))
        }
    }

    async getData(): Promise<void> {
        console.log(chalk.greenBright("INSERING THE GAME DATA"))
        try {
            const [rows] = await this.pool.connection!.execute(
            `SELECT * FROM spindata`
            );
            console.log(rows, "The respnse of fethcing ")
        } catch (e) {
            console.log(chalk.red("ERROR IN FETCHING DATA", e))
        }
    }
}

