import { createPlugin, createRoutableExtension, createComponentExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const mlworkflowsCardPlugin = createPlugin({
  id: 'mlworkflows-card',
  routes: {
    root: rootRouteRef,
  },
});

export const MlworkflowsCardPage = mlworkflowsCardPlugin.provide(
  createRoutableExtension({
    name: 'MlworkflowsCardPage',
    component: () =>
      import('./components/MlCardComponent').then(m => m.MlCardComponent),
    mountPoint: rootRouteRef,
  }),
);

export const MlCardComponent = mlworkflowsCardPlugin.provide(
  createComponentExtension({
    component: {
      lazy: () => import('./components/MlCardComponent').then(m => m.MlCardComponent),
    },
  }),
);
