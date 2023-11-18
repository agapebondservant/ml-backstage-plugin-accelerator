import { createRouter } from '@internal/plugin-mlworkflows-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { getRootLogger } from '@backstage/backend-common';
import { useApi } from '@backstage/core-plugin-api';
import { kubernetesApiRef } from '@backstage/plugin-kubernetes';

export const TestK8sComponent = async () => {
    const CLUSTER_NAME = 'local';
    const kubernetesApi = useApi(kubernetesApiRef);
    const clusterInfo = await kubernetesApi.proxy(CLUSTER_NAME, '/api/v1/namespaces');
    console.log("Kubernetes info: " + clusterInfo);
}

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const logger: Logger = env.logger;

  const responseFileList = await env.reader.search(
      'https://github.com/tanzumldemos/backstage-ml-panel/blob/main/*.yaml',
  );

  const responseFiles = await responseFileList.files;
  var responseFileContent = "";
  for (let i in responseFiles) {
    responseFileContent += `${responseFileContent}\n${await responseFiles[i].content()}`;
  }
  logger.info("File content:\n" + responseFileContent);

  return await createRouter({
    logger: env.logger,
    reader: env.reader,
    files: responseFileContent,
  });
}