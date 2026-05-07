import express from 'express';
const router = express.Router();
import MysqlGameRepoServices from '../infrastructure/database/mysql/MysqlGameRepoServices';
import Database from '../infrastructure/database/mysql/Database';
import { appConfig } from '../config/appConfig';
import { runInNewContext } from 'node:vm';

const db = Database.getInstance(appConfig.dbConfig)
db.connect()
const pool = Database.getInstance(appConfig.dbConfig)
const mysqlGameRepoServices = new MysqlGameRepoServices(pool);

router.get('/superace/history/:userId', async (req, res) => {
  const { userId } = req.params
  const {page , limit } = req.query
  let history = await mysqlGameRepoServices.getHistory(Number(page) , Number(limit) , userId)
  return res.send(history);
});

export default router;