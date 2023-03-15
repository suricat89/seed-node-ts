import {Router} from 'express';
import {redis} from '@libs/redis';
import {HealthcheckController} from '@controllers/healthcheck.controller';
import {HealthcheckInternalRepository} from '@repository/internal/healthcheck';
import {HealthcheckUseCase} from '@use-cases/healthcheck';

export class HealthcheckRoutes {
  private healthcheckController;
  private router;

  constructor() {
    const internalRepository = new HealthcheckInternalRepository(redis);
    const useCase = new HealthcheckUseCase(internalRepository);
    useCase.addHealthcheckItem(useCase.checkRedis(true));
    this.healthcheckController = new HealthcheckController(useCase);
    this.router = Router();
  }

  getRoutes() {
    this.router.get('/health', this.healthcheckController.health());
    this.router.get('/status', (req, res, next) =>
      res.json({status: 'online'})
    );

    return this.router;
  }
}
