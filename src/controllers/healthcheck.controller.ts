import {RequestHandler} from 'express';
import {IHealthcheckUseCase} from '@use-cases/healthcheck';

export interface IHealthcheckController {
  health: () => RequestHandler;
}

export class HealthcheckController implements IHealthcheckController {
  constructor(
    private healthcheckUseCase: IHealthcheckUseCase
  ) { }

  health(): RequestHandler {
    return async (req, res, next) => {
      const result = await this.healthcheckUseCase.execute();

      res.json(result);
      return next();
    };
  }
}
