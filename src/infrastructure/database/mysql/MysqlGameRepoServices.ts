import chalk from "chalk";
import Database from "./Database";
import Mysqlclient from "./Mysqlclient";
import { appConfig } from "../../../config/appConfig";
import { NextFunction } from "express";

interface GameRepoServicesInterface {
    insertSpinData(spinId: string, operatorId: string, betAmount: number, userID: string, winAmount: number, transactionId: string, spinDetails: string , next: NextFunction): void;
}

export default class MysqlGameRepoServices implements GameRepoServicesInterface {

    protected pool;
    constructor(dbInstance: Database) {
        this.pool = dbInstance
    }

    // store the spinId, betAmount, userID, winAmount, transactionId, spinDetails -> whole json as string
    async insertSpinData(spinId: string, operatorId: string, betAmount: number, userID: string, winAmount: number, transactionId: string, spinDetails: string , next: NextFunction): Promise<void> {
        console.log(chalk.greenBright("INSERING THE GAME DATA"))
        //await this.pool.connection!.query(`CREATE DATABASE IF NOT EXISTS ${appConfig.dbConfig.database}`);
        await this.pool.connection!.query(`USE ${appConfig.dbConfig.database}`);
        try {
            console.log(chalk.green("INSERTING THE DATA BASE"))
            let res = await this.pool.connection!.execute(
                `INSERT INTO spindata 
                 (spinId, operatorId, betAmount, userID, winAmount, transactionId, spinDetails)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [spinId, operatorId, betAmount, userID, winAmount, transactionId, spinDetails]
            );
            console.log(chalk.green("INSERTED DATA THE DATA BASE"))
            console.log(res, "The respnse of ")
        } catch (e) {
            console.log(chalk.red("ERROR IN INSERTING", e))
            throw e;
        }
    }

    async getData(): Promise<void> {
        console.log(chalk.greenBright("FETCHING THE GAME DATA"))
        try {
            const [rows] = await this.pool.connection!.execute(
            `SELECT * FROM spindata`
            );
            console.log(rows, "The respnse of fethcing ")
        } catch (e) {
            console.log(chalk.red("ERROR IN FETCHING DATA", e))
        }
    }

    async getHistory(page: number = 1, limit: number = 5, userId: string) {
        // only authorized user can access these data
        const skip = ( page - 1 ) * limit;
        try {
            console.log(chalk.green("SEARCHING THE DATA BASE" , page , limit, userId));

            const query = `
            SELECT spinId, betAmount, winAmount
            FROM spindata
            WHERE userId = ?
            ORDER BY spinId
            LIMIT ${limit} OFFSET ${skip}
            `;

            const [rows , fields] = await this.pool.connection!.execute(query, [userId]);

            console.log(chalk.green("SPIN HISTORY"));
            console.log(rows);

            if(!rows){
                return  {msg: "No Game History"}
            }
            return rows;
        } catch (e) {
            console.log(chalk.red("ERROR IN FETCHING THE HISTORY", e));
            //  handle cases with global middleware
        }
    }

}

