import express from 'express';
import gameControllerServices from '../../controllers/game/Gamecontroller'
import playerControllerServices from '../../controllers/player/Playercontroller';
const router = express.Router();

const initGame = router.get('/superace',  gameControllerServices.initGameDetails ) 
export default initGame;