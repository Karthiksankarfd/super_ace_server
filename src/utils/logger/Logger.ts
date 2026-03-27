import chalk from 'chalk';
import fs from "fs"
// const writefsLog = 
export enum Level {
    Warning = "Warning",
    Fatal = "Fatal",
    Exceptional = "Exceptional",
    Logging = "Logging"
}

class Logger {
    
    // constructor(message : string , level : Level ){}
    Print(message : string , level : Level , location : string){
        switch(level){

            case "Warning" :
                console.log(chalk.yellow(message , "Location : " , location))
                console.log(chalk.yellow(location))
                break ;

            case "Fatal" :
                console.log(chalk.red(message , "Location : " , location))
                console.log(chalk.red(location))
                break ; 

            case "Exceptional" :
                console.log(chalk.cyan(message , "Location : " , location))
                console.log(chalk.cyan(location))
                break ;

            case "Logging":
                console.log(chalk.blue(message, "Location : ", location ));
                console.log(chalk.black(location));
                const data = {
                    message , 
                    location,
                    date : new Date(),
                }
                fs.writeFile(
                    "logs.log",
                    JSON.stringify(data) + "\n",
                    { flag: "a" },
                    (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log("The file has been saved!");
                    }
                );
                break;
                
            default :
                return ;    
        }
    }
}

const logger = new Logger();

export default logger ;