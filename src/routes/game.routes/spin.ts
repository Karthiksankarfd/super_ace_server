import express from 'express';
const router = express.Router();
import gameControllerServices from '../../controllers/game/Gamecontroller'

const spinRoute = router.get('/spin', gameControllerServices.validdateSpin ,  gameControllerServices.spin);
export default spinRoute;