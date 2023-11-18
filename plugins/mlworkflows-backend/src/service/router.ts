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
  const { logger, reader } = options;

  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  router.get('/files', async (_, response) => {
    const responseFileList = await reader.search(
      'https://github.com/tanzumldemos/backstage-ml-panel/blob/main/*.yaml',
    );
    const responseFiles = await responseFileList.files;
    var responseFileContent = "";
    for (let i in responseFiles) {
        responseFileContent += `${responseFileContent}\n${await responseFiles[i].content()}`;
    }
    logger.debug(`Filelist is ${responseFileContent}`);
    response.send(responseFileContent);
  });

  router.use(errorHandler());
  return router;
}
