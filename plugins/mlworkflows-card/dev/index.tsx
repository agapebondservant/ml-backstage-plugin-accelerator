import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { mlworkflowsCardPlugin, MlworkflowsCardPage } from '../src/plugin';
import { MlCardComponent } from '../src/components/MlCardComponent';

createDevApp()
  .registerPlugin(mlworkflowsCardPlugin)
  .addPage({
    element: <MlworkflowsCardPage />,
    title: 'Root Page',
    path: '/mlworkflows-card'
  })
  .render();
