import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const mlworkflowsMainPlugin = createPlugin({
  id: 'mlworkflows-main',
  routes: {
    root: rootRouteRef,
  },
});

export const MlworkflowsMainPage = mlworkflowsMainPlugin.provide(
  createRoutableExtension({
    name: 'MlworkflowsMainPage',
    component: () =>
      import('./components/MlMainComponent').then(m => m.MlMainComponent),
    mountPoint: rootRouteRef,
  }),
);
