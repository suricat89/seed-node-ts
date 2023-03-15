import winston from 'winston';
import {config} from '@config';

export const log = winston.createLogger({
  level: config.log.level,
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});
