import { getVoidLogger } from '@backstage/backend-common';
import express from 'express';
import request from 'supertest';
import { UrlReaders, loadBackendConfig } from '@backstage/backend-common';
import { createRouter } from './router';

describe('createRouter', () => {
  let app: express.Express;

  beforeAll(async () => {
    const logger = getVoidLogger();
    const config = await loadBackendConfig({
      argv: process.argv,
      logger: logger
    });
    const router = await createRouter({
      logger: getVoidLogger(),
      reader: UrlReaders.default( { logger, config } )
    });
    app = express().use(router);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('GET /health', () => {
    it('returns ok', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({ status: 'ok' });
    });
  });
});
