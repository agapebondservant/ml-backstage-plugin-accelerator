import { errorHandler, UrlReader } from '@backstage/backend-common';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';
import { Config } from '@backstage/config';

export interface RouterOptions {
  logger: Logger, reader: UrlReader, config: Config
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger, reader, config } = options;

  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  router.get('/images/:image', async (request, response) => {
    const imageName = request.params.image;
    const imageBaseUrl = config.getString('mlbackstage.imageRepoBaseUrl');
    const file = await reader.readUrl (
        `${imageBaseUrl}/${imageName}`
    );
    const fileContent = await file.buffer();
    response.setHeader('Content-Type', 'image/png');
    response.send(fileContent);
  });

  router.use(errorHandler());
  return router;
}
