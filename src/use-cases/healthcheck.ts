import _ from 'lodash';
import async from 'async';
import {ItemToCheck, ItemToCheckResponse} from '@customTypes/healthcheck.types';
import {IHealthcheckInternalRepository} from '@repository/internal/healthcheck';

export interface IHealthcheckUseCase {
  addHealthcheckItem: (itemToCheck: ItemToCheck) => void;
  execute: () => Promise<{
    healthy: boolean;
    items: ItemToCheckResponse[];
    error?: unknown;
  }>;

  checkRedis: (required?: boolean) => ItemToCheck;
}

export class HealthcheckUseCase implements IHealthcheckUseCase {
  private itemsToCheck: ItemToCheck[] = [];

  constructor(private internalRepository: IHealthcheckInternalRepository) {}

  addHealthcheckItem(itemToCheck: ItemToCheck) {
    this.itemsToCheck.push(itemToCheck);
  }

  checkRedis(required = true): ItemToCheck {
    return async () => {
      const result = {
        id: 'redis',
        healthy: true,
        required,
      } as ItemToCheckResponse;

      try {
        await this.internalRepository.createHealthcheckItem();
        const data = await this.internalRepository.getHealthcheckItem();
        result.data = {healthcheck: data};
      } catch (err) {
        result.healthy = false;
        result.data = err instanceof Error ? err.message : err;
      }

      return result;
    };
  }

  public async execute() {
    const result = {
      healthy: true,
      items: [] as ItemToCheckResponse[],
      error: undefined as unknown,
    };

    try {
      result.items = await async.parallel<ItemToCheck, ItemToCheckResponse[]>(
        this.itemsToCheck
      );
    } catch (err) {
      result.healthy = false;
      result.error = err;
    }

    result.healthy = _.chain(result.items)
      .filter('required')
      .every('healthy')
      .value();

    return result;
  }
}
