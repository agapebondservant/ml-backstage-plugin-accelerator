import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { mlworkflowsModelsPlugin, MlworkflowsModelsPage } from '../src/plugin';

createDevApp()
  .registerPlugin(mlworkflowsModelsPlugin)
  .addPage({
    element: <MlworkflowsModelsPage />,
    title: 'Root Page',
    path: '/mlworkflows-models'
  })
  .render();
