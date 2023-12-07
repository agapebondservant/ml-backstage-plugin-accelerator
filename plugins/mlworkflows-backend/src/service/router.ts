import { errorHandler, UrlReader } from '@backstage/backend-common';
import express from 'express';
import nodecache from 'node-cache';
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
  const appCache = new nodecache({ stdTTL : 60, deleteOnExpire: false });
  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  router.get('/images/:image', async (request, response) => {
    const imageName = request.params.image;
    const imageBaseUrl = config.getString('mlbackstage.imageRepoBaseUrl');

    let fileContent = {};

    if(appCache.has(imageName)){
        logger.info(`Loading ${imageName} from cache...`);
        fileContent = appCache.get(imageName);
    } else {
        const file = await reader.readUrl(`${imageBaseUrl}/${imageName}`);
        fileContent = await file.buffer();
        appCache.set(imageName, fileContent);
    }

    response.setHeader('Content-Type', 'image/png');
    response.send(fileContent);
  });

  router.use(errorHandler());
  return router;
}
