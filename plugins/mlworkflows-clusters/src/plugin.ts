import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const mlworkflowsClustersPlugin = createPlugin({
  id: 'mlworkflows-clusters',
  routes: {
    root: rootRouteRef,
  },
});

export const MlworkflowsClustersPage = mlworkflowsClustersPlugin.provide(
  createRoutableExtension({
    name: 'MlworkflowsClustersPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
