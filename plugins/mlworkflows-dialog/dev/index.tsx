import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { mlworkflowsDialogPlugin, MlworkflowsDialogPage } from '../src/plugin';

createDevApp()
  .registerPlugin(mlworkflowsDialogPlugin)
  .addPage({
    element: <MlworkflowsDialogPage />,
    title: 'Root Page',
    path: '/mlworkflows-dialog'
  })
  .render();
