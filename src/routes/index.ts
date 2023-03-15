import {Router} from 'express';
import {HealthcheckRoutes} from './healthcheck.routes';

export class Routes {
  private healthcheckRoutes;
  private router;

  constructor() {
    this.router = Router();
    this.healthcheckRoutes = new HealthcheckRoutes();
  }

  getRoutes() {
    this.router.use('/healthcheck', this.healthcheckRoutes.getRoutes());

    return this.router;
  }
}
