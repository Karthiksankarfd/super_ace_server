import express from 'express';
import playerControllerServices from '../controllers/player/Playercontroller.js';
const router = express.Router();

router.get('/player/info', playerControllerServices.getPlayerDetails );

export default router;