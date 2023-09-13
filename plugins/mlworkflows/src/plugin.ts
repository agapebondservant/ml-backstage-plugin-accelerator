import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const mlworkflowsPlugin = createPlugin({
  id: 'mlworkflows',
  routes: {
    root: rootRouteRef,
  },
});

export const MlworkflowsPage = mlworkflowsPlugin.provide(
  createRoutableExtension({
    name: 'MlworkflowsPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
