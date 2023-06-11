import mongoose from 'mongoose';
import app from './app';

import { Server } from 'http';
import config from './config/index';
import { errorLoger, logger } from './shared/logger';

process.on('uncaughtException', error => {
  errorLoger.error(error);
  process.exit(1);
});
let server: Server;
async function run() {
  try {
    await mongoose.connect(config?.database_url as string);
    // (
    //   logger.info(` Database connected successfully`)
    // )
    logger.info(`⏩   Database connected successfully`);
    server = app.listen(config.port, () => {
      logger.info(`🦝  Example app listening on port ${config.port}`);
    });
  } catch (error) {
    errorLoger.error(`😟 faild database connect ${error}`);
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

  process.on('unhandledRejection', error => {
    console.log('Unhandled rejection error ................');
    if (server) {
      server.close(() => errorLoger.error(error));
      process.exit(1);
    } else {
      process.exit(1);
    }
  });
}
run().catch(error => error);

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
