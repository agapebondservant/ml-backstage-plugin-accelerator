import { errorHandler, UrlReader } from '@backstage/backend-common';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';

export interface RouterOptions {
  logger: Logger, reader: UrlReader, files;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger, reader, files } = options;

  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  router.get('/files', async (_, response) => {
    const fileList = await files;
    logger.debug(`Filelist is ${fileList}`);
    response.send(fileList);
  });

  router.use(errorHandler());
  return router;
}
