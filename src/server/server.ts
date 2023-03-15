import express from 'express';
import 'express-async-errors';
import * as expressHelpers from './middlewares/express-helpers';
import {Routes} from '@routes';
import '../init';

export class Server {
  public app: express.Express;
  private routes;

  constructor() {
    this.app = express();
    this.routes = new Routes();
  }

  async bootstrap() {
    this.app.use(express.json());
    this.app.use(expressHelpers.defaultHeaders());
    this.app.use(this.routes.getRoutes());
    this.app.use(expressHelpers.routeNotFoundHandler());
    this.app.use(expressHelpers.errorHandler());
    return this.app;
  }
}
