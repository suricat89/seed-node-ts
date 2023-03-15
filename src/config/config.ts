import process from 'process';
import {RedisConnectionOptions} from '@customTypes/libs.types';

export const config = {
  application: {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || '5000',
  },
  authorization: {
    blockMissingBearer:
      process.env.AUTHORIZATION_BLOCK_MISSING_BEARER !== 'false',
    jwtSecret: process.env.AUTHORIZATION_JWT_SECRET || 'secret',
  },
  log: {
    level: process.env.LOG_LEVEL || 'info',
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    disableOfflineQueue: process.env.REDIS_DISABLE_OFFLINE_QUEUE !== 'false',
  } as RedisConnectionOptions,
};
