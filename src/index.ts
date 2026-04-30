import cors from "cors";
import express, { NextFunction, ErrorRequestHandler } from "express";
import { config } from "dotenv";
import { createServer } from "node:http";
import { createLogger } from "./utils/logger";
import { Server as SocketIOServer } from "socket.io";
// import { initializeSocket } from "./socket/mainSocket";
import { initializeRedis } from "./connections/redisService";
import router from "./routes/player";
import playerRoutes from './routes/player'; // adjust path
import spinRoute from "./routes/game.routes/spin";
import Mysqlclient from "./infrastructure/database/mysql/Mysqlclient";
import { appConfig } from "./config/appConfig";
import Database from "./infrastructure/database/mysql/Database";
import chalk from "chalk";

config();

const port = process.env.PORT || 5100;
const logger = createLogger('Server');


const startServer = async () => {
    try {
        await initializeRedis();
        const app = express();
        const server = createServer(app);
        const io = new SocketIOServer(server, {
            cors: {
                origin: "*",
            }
        });

        app.use(express.json());
        app.use(cors());
        app.get("/", (req, res) => {
            res.send("Hello world")
        })
        app.use((req, res, next) => {
            console.log(chalk.greenBright("COMMON MIDDLEWARE USED"))
            next()
        })
        app.use("/api", playerRoutes);
        app.use("/api", spinRoute)
        // initializeSocket(io);

        const globalMiddleware: ErrorRequestHandler = (err, req, res, next) => {
            return res.status(500).json({
                message: err.message
            });
        }

        // app.use(globalMiddleware);
        server.listen(port, () => {
            logger.info(`Server running in http://localhost:${port}`);
        });



    } catch (error: any) {
        logger.error(`Server failed to start ${error.message}`);
        process.exit(1);
    }
}


startServer();