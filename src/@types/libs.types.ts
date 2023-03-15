import {
  RedisClientOptions,
  RedisFunctions,
  RedisModules,
  RedisScripts,
  createClient
} from 'redis';

export type RedisConnectionOptions = RedisClientOptions<
  RedisModules,
  RedisFunctions,
  RedisScripts
>;

export type RedisClientType = ReturnType<typeof createClient>;
