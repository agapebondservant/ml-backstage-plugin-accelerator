import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const mlworkflowsPipelinesPlugin = createPlugin({
  id: 'mlworkflows-pipelines',
  routes: {
    root: rootRouteRef,
  },
});

export const MlworkflowsPipelinesPage = mlworkflowsPipelinesPlugin.provide(
  createRoutableExtension({
    name: 'MlworkflowsPipelinesPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
