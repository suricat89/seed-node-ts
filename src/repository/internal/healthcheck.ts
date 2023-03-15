import {RedisClientType} from '@customTypes/libs.types';

export interface IHealthcheckInternalRepository {
  createHealthcheckItem: () => Promise<string | null>;
  getHealthcheckItem: () => Promise<string | null>;
}

export class HealthcheckInternalRepository implements IHealthcheckInternalRepository
{
  private healthcheckKey = 'healthcheck';

  constructor(private redis: RedisClientType) {}

  async createHealthcheckItem() {
    return this.redis.set(this.healthcheckKey, new Date().toISOString());
  }

  async getHealthcheckItem() {
    return this.redis.get(this.healthcheckKey);
  }
}
