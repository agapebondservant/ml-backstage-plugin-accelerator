import { createRouter } from '@internal/plugin-mlworkflows-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const logger: Logger = env.logger;

  return await createRouter({
    logger: env.logger,
    reader: env.reader,
  });
}