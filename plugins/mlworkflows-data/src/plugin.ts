import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const mlworkflowsDataPlugin = createPlugin({
  id: 'mlworkflows-data',
  routes: {
    root: rootRouteRef,
  },
});

export const MlworkflowsDataPage = mlworkflowsDataPlugin.provide(
  createRoutableExtension({
    name: 'MlworkflowsDataPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
