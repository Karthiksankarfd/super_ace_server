import chalk from "chalk";
import { createClient , RedisClientType } from "redis";
import Redis from "ioredis";
import { rejects } from "node:assert";
import { resolve } from "node:dns";
import { redis } from "../../connections/redisService";

const client =  new Redis("redis://localhost:6379");

class Redisconnection{
    
    async createRedisInstance(){
        return await new Promise((reject , resolve)=>{

          const client = new Redis("redis://localhost:6379")

          client.on("error" ,(err)=>{
                console.log(err.message , "Erro connecting to the redis")
                reject("ERROR CONNECTING TO THE REDIS")
          })

          client.on("connect" , ()=>{
            resolve(client)
            console.log("REDIS CLINET HAS CREATED AND CONNECTED")
          });

        })
    };
    
}

const redisClient =  new Redisconnection().createRedisInstance()



