import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { mlworkflowsCardPlugin, MlworkflowsCardPage } from '../src/plugin';

createDevApp()
  .registerPlugin(mlworkflowsCardPlugin)
  .addPage({
    element: <MlworkflowsCardPage />,
    title: 'Root Page',
    path: '/mlworkflows-card'
  })
  .render();
