import React from 'react';
import { TabbedLayout } from '@backstage/core-components';
import { MlBaseComponent } from '../MlBaseComponent';

export const MlMainComponent = () => (
    <TabbedLayout>
      <TabbedLayout.Route path="mlworkflows-data" title="data">
        <MlBaseComponent
            title="Data"
            subtitle="Workflows for integrating and preprocessing datasets for machine learning workflows"
            category="data"/>
      </TabbedLayout.Route>
      <TabbedLayout.Route path="mlworkflows-models" title="models">
        <MlBaseComponent
            title="Models"
            subtitle="Tools for building, training and lifecycle management of ML models"
            category="models"/>
      </TabbedLayout.Route>
      <TabbedLayout.Route path="mlworkflows-pipelines" title="pipelines">
        <MlBaseComponent
            title="Pipelines"
            subtitle="Tools and frameworks for ML workflow orchestration"
            category="pipelines"/>
      </TabbedLayout.Route>
      <TabbedLayout.Route path="mlworkflows-clusters" title="clusters">
        <MlBaseComponent
            title="Clusters"
            subtitle="Integrated clusters for ML workflows"
            category="clusters"/>
      </TabbedLayout.Route>
      <TabbedLayout.Route path="mlworkflows-experiments" title="experiments">
        <MlBaseComponent
            title="Experiments"
            subtitle="Notebooks for ML experimentation"
            category="experiments"/>
      </TabbedLayout.Route>
    </TabbedLayout>
);
