import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import { Divider } from '@mui/material';
import { ExampleFetchComponent } from '../ExampleFetchComponent';
import { MlCardComponent } from '@internal/plugin-mlworkflows-card';
import { createTheme } from '@mui/material/styles';

export const ExampleComponent = () => (
  <Page themeId="tool">
    <Header title="Pipelines"
            subtitle="Tools and frameworks for ML workflow orchestration"
            style={{background: 'none', color: '#7EF3E0'}}>
    </Header>
    <Content>
      <ContentHeader title="ML Pipelines" variant="h3"/>
      <Grid container spacing={3}>
        <Grid item>
          <MlCardComponent
            image="./static/images/argoworkflows.png"
            console="https://argo-workflows.tanzudatatap.com/"
            connector="http://jupyter-jupyterhub.tanzudatatap.com"
            description="Dev Environment"
            body="Argo Workflows is an open source container-native workflow engine for orchestrating parallel jobs on Kubernetes, where each step in the workflow is a container."
          />
      </Grid>
      <Grid item>
        <MlCardComponent
          image="./static/images/airflow.png"
          body="Apache Airflow is an open-source platform for developing, scheduling, and monitoring batch-oriented workflows, providing ease-of-use, flexible UI and multiple integrations."
        />
       </Grid>
       <Grid item>
        <MlCardComponent
          image="./static/images/kubeflowpipelines.png"
          console="http://kubeflow-pipelines.tanzudatatap.com"
          connector="http://jupyter-jupyterhub.tanzudatatap.com"
          description="Dev Instance"
          body="Kubeflow Pipelines enables the development of reusable end-to-end ML workflows built using the Kubeflow Pipelines SDK for end-to-end ML orchestration."
        />
      </Grid>
    </Grid>
      <br/><br/>

      <ContentHeader title="Data Pipelines" variant="h3"/>
      <Grid container spacing={3}>
          <Grid item>
            <MlCardComponent
              image="./static/images/springclouddataflow.png"
              console="http://scdf.tanzudatatap.com/dashboard"
              connector="http://jupyter-jupyterhub.tanzudatatap.com"
               description="Pre-prod Instance"
              body="Spring Cloud Data Flow is a cloud-native engine for both batch and real-time data pieplines, with support for ETL processing, event streaming and predictive analytics."
            />
           </Grid>
           <Grid item>
           <MlCardComponent
             image="./static/images/airflow.png"
             body="Apache Airflow is an open-source platform for developing, scheduling, and monitoring batch-oriented workflows, providing ease-of-use, flexible UI and multiple integrations."
           />
          </Grid>
        </Grid>
        <br/><br/>

     </Content>
  </Page>
);
