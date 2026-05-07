import chalk from 'chalk';
import mysql, { Connection, createPool , Pool } from 'mysql2/promise';


export default class Database {

    public static instance?: Database;
    public connection?: Connection;
    private constructor(public readonly config: {
        host: string;
        user: string;
        database: string;
        password?: string;
        port: number;
        retries: number;
        interval: number;
    }) { };

    // create and returns the same instace 
    static getInstance(config: any) {
        if (!Database.instance) {
            Database.instance = new Database(config)
        }
        return Database.instance
    }

    // connect and store the connected instance
    async connect(): Promise<void> {

        // create DB 
        console.log("CREATING CONNECTION")
        // const connection = await mysql.createConnection({ host: this.config.host, user: this.config.user, password: this.config.password });
        // // create DB if not exists
        // await connection.execute(`CREATE DATABASE IF NOT EXISTS ${this.config.database}`);
        // // switch DB (optional but OK)
        // await connection.query(`USE ${this.config.database}`);

        // create table
        // let res = await connection.execute(`
        //     CREATE TABLE IF NOT EXISTS spindata (
        //         spinId VARCHAR(50) PRIMARY KEY,
        //         operatorId VARCHAR(50),
        //         betAmount DECIMAL(10,2),
        //         userID VARCHAR(50),
        //         winAmount DECIMAL(10,2),
        //         transactionId VARCHAR(50),
        //         spinDetails LONGTEXT,
        //         createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        //     )
        //     `)
        // await connection.end();

        if (!this.connection) {
            try {
                // = await mysql.createConnection();
                this.connection = mysql.createPool({
                    host: this.config.host,
                    password: this.config.password,
                    user: this.config.user,
                    database: this.config.database,
                    waitForConnections: true,
                    connectionLimit: 10,
                    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
                    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
                    queueLimit: 0,
                    enableKeepAlive: true,
                    keepAliveInitialDelay: 0,
                })

                console.log(chalk.greenBright("DB CONNECTED"))
            } catch (err) {
                console.log(chalk.redBright("DB CONNECTION FAILED"))
                console.log(err);
                console.log(chalk.redBright("DB CONNECTION FAILED"))
            }
        }
    };

}