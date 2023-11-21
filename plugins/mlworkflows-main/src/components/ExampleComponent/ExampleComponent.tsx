import React from 'react';
import { Page, TabbedLayout } from '@backstage/core-components';
import { MlworkflowsDataPage } from '@internal/plugin-mlworkflows-data';
import { MlworkflowsModelsPage } from '@internal/plugin-mlworkflows-models';
import { MlworkflowsPipelinesPage } from '@internal/plugin-mlworkflows-pipelines';
import { MlworkflowsClustersPage } from '@internal/plugin-mlworkflows-clusters';
import { MlworkflowsExperimentsPage } from '@internal/plugin-mlworkflows-experiments';

export const ExampleComponent = () => (
  <Page themeId="tool">
    <TabbedLayout>
      <TabbedLayout.Route path="/mlworkflows-data" title="data">
        <MlworkflowsDataPage/>
      </TabbedLayout.Route>
      <TabbedLayout.Route path="/mlworkflows-models" title="models">
        <MlworkflowsModelsPage/>
      </TabbedLayout.Route>
      <TabbedLayout.Route path="/mlworkflows-pipelines" title="pipelines">
        <MlworkflowsPipelinesPage/>
      </TabbedLayout.Route>
      <TabbedLayout.Route path="/mlworkflows-clusters" title="clusters">
        <MlworkflowsClustersPage/>
      </TabbedLayout.Route>
      <TabbedLayout.Route path="/mlworkflows-experiments" title="experiments">
        <MlworkflowsExperimentsPage/>
      </TabbedLayout.Route>
    </TabbedLayout>
  </Page>
);
