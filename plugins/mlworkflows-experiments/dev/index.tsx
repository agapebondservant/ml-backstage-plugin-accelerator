import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { mlworkflowsExperimentsPlugin, MlworkflowsExperimentsPage } from '../src/plugin';

createDevApp()
  .registerPlugin(mlworkflowsExperimentsPlugin)
  .addPage({
    element: <MlworkflowsExperimentsPage />,
    title: 'Root Page',
    path: '/mlworkflows-experiments'
  })
  .render();
