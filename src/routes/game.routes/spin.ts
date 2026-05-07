import express from 'express';
import gameControllerServices from '../../controllers/game/Gamecontroller'
const router = express.Router();

const spinRoute = router.post('/superace/spin', gameControllerServices.validdateSpin ,  gameControllerServices.spin);
export default spinRoute;