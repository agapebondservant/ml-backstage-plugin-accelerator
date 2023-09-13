import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { mlworkflowsDataPlugin, MlworkflowsDataPage } from '../src/plugin';

createDevApp()
  .registerPlugin(mlworkflowsDataPlugin)
  .addPage({
    element: <MlworkflowsDataPage />,
    title: 'Root Page',
    path: '/mlworkflows-data'
  })
  .render();
