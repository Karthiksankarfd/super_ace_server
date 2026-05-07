import express from 'express';
import gameControllerServices from '../../controllers/game/Gamecontroller.js'
import playerControllerServices from '../../controllers/player/Playercontroller.js';
const router = express.Router();

const initGame = router.get('/superace',  gameControllerServices.initGameDetails ) 
export default initGame;