import { createRouter } from '@oawofolu/plugin-mlworkflows-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {

  return await createRouter({
    logger: env.logger,
    reader: env.reader,
    config: env.config
  });
}