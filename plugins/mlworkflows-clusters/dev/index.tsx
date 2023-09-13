import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { mlworkflowsClustersPlugin, MlworkflowsClustersPage } from '../src/plugin';

createDevApp()
  .registerPlugin(mlworkflowsClustersPlugin)
  .addPage({
    element: <MlworkflowsClustersPage />,
    title: 'Root Page',
    path: '/mlworkflows-clusters'
  })
  .render();
