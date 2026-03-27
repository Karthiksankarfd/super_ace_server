import { Redis } from "ioredis";
import type { RedisOptions, Redis as RedisClient } from "ioredis";
import dotenv from "dotenv";
dotenv.config();

import { appConfig } from "../config/appConfig.js";
import { createLogger } from "../utils/logger.js";

const logger = createLogger('Redis');

const {
    host = '127.0.0.1', 
    port = 6379,
    retry,
    interval,
} = appConfig.redis;

const redisConfig: RedisOptions = {
    host,
    port,
    password: process.env.REDIS_PASSWORD || undefined,
};

export let redis: RedisClient; 
const createRedisClient = (): Promise<Redis> => {
    return new Promise((resolve, reject) => {
        const client = new Redis(redisConfig);

        client.on("error", (err: Error) => {
            logger.error(`REDIS ERROR: ${err.message}`);
        });

        client.on("connect", () => {
            logger.info("REDIS CONNECTION ESTABLISHED");
        });

        client.on("ready", () => {
            // logger.info("REDIS READY");
            resolve(client);
        });

        client.on("close", () => {
            logger.info("REDIS CONNECTION CLOSED");
        });

        client.on("end", () => {
            reject(new Error("Redis connection ended before ready"));
        });
    });
};


let redisClient: RedisClient | null = null;

const maxRetries: number = retry;
const retryInterval: number = interval;

export const initializeRedis = async (): Promise<RedisClient> => {
    let retries = 0;

    while (retries < maxRetries) {
        try {
            redisClient = await createRedisClient();
            logger.info('REDIS CONNECTION SUCCESSFULL');
            redis = redisClient;
            return redis;
        } catch (err :any) {
            retries += 1;
            logger.error(`REDIS CONNECTION FAILED. Retry ${retries}/${maxRetries}. Error; ${err.message}`);

            if (retries >= maxRetries) {
                logger.error('Maximum retries reached. Could not connect to Redis.');
                process.exit(1);
            }

            await new Promise(res => setTimeout(res, retryInterval));
        }
    }
    // Should not reach here
    throw new Error('Unable to initialize Redis');
};

export const setCache = async (key: string, value: string, expiration: number = 3600*16): Promise<void> => {
    if (!redisClient) redisClient = await initializeRedis();

    try {
        await redisClient.set(key, value, 'EX', expiration);
    } catch(err :any) {
        logger.error('Failed to set cache: ', err.message);
    }
};

export const getCache = async (key: string): Promise<string | null> => {
    if (!redisClient) redisClient = await initializeRedis();

    try {
        const value = await redisClient.get(key);
        if (value) {
            return value;
        } else {
            logger.info(`Cache not found: ${key}`);
            return null;
        }
    } catch (err :any) {
        logger.error('Failed to get Cache: ', err.message);
        return null;
    }
};

export const deleteCache = async (key: string): Promise<void> => {
  if (!redisClient) redisClient = await initializeRedis();
  try {
    await redisClient.del(key);
  } catch (error: any) {
    logger.error('Failed to delete cache:', error.message);
  }
};

export const incrementCache = async (key: string, amount: number = 1): Promise<number | null> => {
  if (!redisClient) redisClient = await initializeRedis();
  try {
    return await redisClient.incrby(key, amount);
  } catch (error: any) {
    logger.error('Failed to increment cache:', error.message);
    return null;
  }
};

export const setHashField = async (field: string, value: any): Promise<void> => {
  if (!redisClient) redisClient = await initializeRedis();
  try {
    await redisClient.hset(field, value);
  } catch (error: any) {
    logger.error('Failed to set hash field:', error.message);
  }
};

export const getHashField = async (hash: string, field: string): Promise<string | null> => {
  if (!redisClient) redisClient = await initializeRedis();
  try {
    const value = await redisClient.hget(hash, field);
    return value ?? null;
  } catch (error: any) {
    logger.error('Failed to get hash field:', error.message);
    return null;
  }
};