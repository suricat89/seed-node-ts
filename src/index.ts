import {log} from '@libs/log';
import {config} from '@config';
import {Server} from '@server/server';

async function bootstrapServer() {
  const server = new Server();
  await server.bootstrap();
  server.app.listen(config.application.port, () => {
    log.info(`App listening on port ${config.application.port}`);
  });
}

bootstrapServer();
