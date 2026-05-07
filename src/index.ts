import cors from "cors";
import express, { ErrorRequestHandler } from "express";
import { config } from "dotenv";
import { createServer } from "node:http";
import { createLogger } from "./utils/logger.js";
import { Server as SocketIOServer } from "socket.io";
import { initializeRedis } from "./connections/redisService.js";
import playerRoutes from './routes/player.js';
import spinRoute from "./routes/game.routes/spin.js";
import historyRoute from "./routes/history.js"
import initGame from "./routes/game.routes/initiate.js";
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
        app.get("/", (req, res) => {res.status(200).send({msg: "Hello from super ace node server"})})
        app.use("/api", playerRoutes);
        app.use("/api", spinRoute);
        app.use("/api", historyRoute)
        app.use("/api" , initGame)

        const globalMiddleware: ErrorRequestHandler = (err, req, res, next) => {
            console.log( chalk.red( "The request", req.originalUrl , "reached the global error handler middleware" ,err) )
            return res.status(409).json({
                msg: err?.message || err
            });             
        };

        app.use(globalMiddleware);
        server.listen(port, () => {
            logger.info(`Server running in http://localhost:${port}`);
        });
    } catch (error: any) {
        logger.error(`Server failed to start ${error.message}`);
        process.exit(1);
    }
}

startServer();