import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { mlworkflowsPlugin, MlworkflowsPage } from '../src/plugin';

createDevApp()
  .registerPlugin(mlworkflowsPlugin)
  .addPage({
    element: <MlworkflowsPage />,
    title: 'Root Page',
    path: '/mlworkflows'
  })
  .render();
