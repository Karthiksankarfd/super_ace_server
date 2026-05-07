// import { Connection } from 'mysql2';
import chalk from 'chalk';
import mysql , {Connection} from 'mysql2/promise';


export default abstract class Mysqlclient{

    private connection?: Connection ;

    constructor(private readonly config: {
        host: string;
        user: string;
        database: string;
        password?: string;
        port: number;
        retries:number;
        interval: number;
    }) {} ; 

    async connect(){
        // await this.connection.execute('CREATE DATABASE IF NOT EXISTS superace');
        if(!this.connection){
            try {
                this.connection = await mysql.createConnection({host : this.config.host , user:this.config.user, password: this.config.password});
                await this.connection.execute(
                     `CREATE DATABASE IF NOT EXISTS ${this.config.database}`
                );
                console.log(chalk.greenBright("DB CONNECTED"))
            } catch (err) {
                console.log(err);
                console.log(chalk.redBright("DB CONNECTION FAILED"))
            }
        }
        return this.connection ;
    };
};
