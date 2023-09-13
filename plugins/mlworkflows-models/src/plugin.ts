import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const mlworkflowsModelsPlugin = createPlugin({
  id: 'mlworkflows-models',
  routes: {
    root: rootRouteRef,
  },
});

export const MlworkflowsModelsPage = mlworkflowsModelsPlugin.provide(
  createRoutableExtension({
    name: 'MlworkflowsModelsPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
