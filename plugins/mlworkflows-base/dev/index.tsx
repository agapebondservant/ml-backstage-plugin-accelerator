import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { mlworkflowsBasePlugin, MlworkflowsBasePage } from '../src/plugin';

createDevApp()
  .registerPlugin(mlworkflowsBasePlugin)
  .addPage({
    element: <MlworkflowsBasePage />,
    title: 'Root Page',
    path: '/mlworkflows-base'
  })
  .render();
