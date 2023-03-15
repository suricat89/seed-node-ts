import {createClient} from 'redis';
import {log} from './log';
import {config} from '@config';

const errorHandler = (err: unknown) => {
  log.error('Error connecting to Redis: ', err);
};
const connectionHandler = () => log.info('Connected to Redis');

const redis = createClient(config.redis);
redis.on('error', errorHandler);
redis.on('connect', connectionHandler);

redis.connect();

export {redis};
