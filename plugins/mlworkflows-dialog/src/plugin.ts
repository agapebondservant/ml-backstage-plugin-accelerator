import { createPlugin, createRoutableExtension, createComponentExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const mlworkflowsDialogPlugin = createPlugin({
  id: 'mlworkflows-dialog',
  routes: {
    root: rootRouteRef,
  },
});

export const MlworkflowsDialogPage = mlworkflowsDialogPlugin.provide(
  createRoutableExtension({
    name: 'MlworkflowsDialogPage',
    component: () =>
      import('./components/MlDialogComponent').then(m => m.MlDialogComponent),
    mountPoint: rootRouteRef,
  }),
);

export const MlDialogComponent = mlworkflowsDialogPlugin.provide(
  createComponentExtension({
    component: {
      lazy: () => import('./components/MlDialogComponent').then(m => m.MlDialogComponent),
    },
  }),
);

