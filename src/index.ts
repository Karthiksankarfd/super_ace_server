import cors from "cors";
import express from "express";
import { config } from "dotenv";
import { createServer } from "node:http";
import { createLogger } from "./utils/logger";
import { Server as SocketIOServer } from "socket.io";
import { initializeSocket } from "./socket/mainSocket";
import { initializeRedis } from "./connections/redisService";
import router from "./routes/player";
import playerRoutes from './routes/player'; // adjust path
import spinRoute from "./routes/game.routes/spin";
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
        app.get("/" , (req , res)=>{
            res.send("Hello world")
        })
        app.use( "/api" , playerRoutes);
        app.use("/api" , spinRoute)
        initializeSocket(io);
        server.listen(port, () => {
            logger.info(`Server running in http://localhost:${port}`);
        });
    } catch (error: any) {
        logger.error(`Server failed to start ${error.message}`);
        process.exit(1);
    }
}

startServer();