import React from 'react';
import { TabbedLayout } from '@backstage/core-components';
import { MlBaseComponent } from '../MlBaseComponent';
import { Page } from '@backstage/core-components';

export const MlMainComponent = () => (
    <Page themeId="tool">
    <TabbedLayout>
      <TabbedLayout.Route path="mlworkflows-entry" title="HOME">
        <MlBaseComponent
            title="Entry"
            subtitle="Open MLOps main page"
            category="entry"/>
      </TabbedLayout.Route>
      <TabbedLayout.Route path="mlworkflows-data" title="DATA">
        <MlBaseComponent
            title="Data"
            subtitle="Workflows for integrating and preprocessing datasets for machine learning workflows"
            category="data"/>
      </TabbedLayout.Route>
      <TabbedLayout.Route path="mlworkflows-models" title="MODELS">
        <MlBaseComponent
            title="Models"
            subtitle="Tools for building, training and lifecycle management of ML models"
            category="models"/>
      </TabbedLayout.Route>
      <TabbedLayout.Route path="mlworkflows-pipelines" title="PIPELINES">
        <MlBaseComponent
            title="Pipelines"
            subtitle="Tools and frameworks for ML workflow orchestration"
            category="pipelines"/>
      </TabbedLayout.Route>
      <TabbedLayout.Route path="mlworkflows-clusters" title="CLUSTERS">
        <MlBaseComponent
            title="Clusters"
            subtitle="Integrated clusters for ML workflows"
            category="clusters"/>
      </TabbedLayout.Route>
      <TabbedLayout.Route path="mlworkflows-experiments" title="EXPERIMENTS">
        <MlBaseComponent
            title="Experiments"
            subtitle="Notebooks for ML experimentation"
            category="experiments"/>
      </TabbedLayout.Route>
    </TabbedLayout>
    </Page>
);
