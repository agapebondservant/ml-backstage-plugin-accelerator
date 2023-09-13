import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const mlworkflowsExperimentsPlugin = createPlugin({
  id: 'mlworkflows-experiments',
  routes: {
    root: rootRouteRef,
  },
});

export const MlworkflowsExperimentsPage = mlworkflowsExperimentsPlugin.provide(
  createRoutableExtension({
    name: 'MlworkflowsExperimentsPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
