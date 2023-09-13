import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { mlworkflowsPipelinesPlugin, MlworkflowsPipelinesPage } from '../src/plugin';

createDevApp()
  .registerPlugin(mlworkflowsPipelinesPlugin)
  .addPage({
    element: <MlworkflowsPipelinesPage />,
    title: 'Root Page',
    path: '/mlworkflows-pipelines'
  })
  .render();
