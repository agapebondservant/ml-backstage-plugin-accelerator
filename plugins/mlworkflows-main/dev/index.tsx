import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { mlworkflowsMainPlugin, MlworkflowsMainPage } from '../src/plugin';

createDevApp()
  .registerPlugin(mlworkflowsMainPlugin)
  .addPage({
    element: <MlworkflowsMainPage />,
    title: 'Root Page',
    path: '/mlworkflows-main'
  })
  .render();
