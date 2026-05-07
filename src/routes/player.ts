import express from 'express';
import playerControllerServices from '../controllers/player/Playercontroller';
const router = express.Router();

router.get('/player/info', playerControllerServices.getPlayerDetails );

export default router;