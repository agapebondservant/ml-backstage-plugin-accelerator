import { createPlugin, createRoutableExtension, createComponentExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const mlworkflowsBasePlugin = createPlugin({
  id: 'mlworkflows-base',
  routes: {
    root: rootRouteRef,
  },
});

export const MlworkflowsBasePage = mlworkflowsBasePlugin.provide(
  createRoutableExtension({
    name: 'MlworkflowsBasePage',
    component: () =>
      import('./components/MlBaseComponent').then(m => m.MlBaseComponent),
    mountPoint: rootRouteRef,
  }),
);

export const MlBaseComponent = mlworkflowsBasePlugin.provide(
  createComponentExtension({
    component: {
      lazy: () => import('./components/MlBaseComponent').then(m => m.MlBaseComponent),
    },
  }),
);
