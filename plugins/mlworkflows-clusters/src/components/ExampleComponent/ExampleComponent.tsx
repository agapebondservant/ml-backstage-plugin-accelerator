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
import { ExampleFetchComponent } from '../ExampleFetchComponent';
import { MlCardComponent } from '@internal/plugin-mlworkflows-card';
import { createTheme } from '@mui/material/styles';

export const ExampleComponent = () => (
  <Page themeId="tool">
      <Header title="Clusters"
              subtitle="Integrated clusters for ML workflows"
              style={{background: 'none', color: '#7EF3E0'}}>
      </Header>
    <Content>
    <ContentHeader title="MLOps Platforms" variant="h3"/>
    <Grid container spacing={3}>
         <Grid item>
           <MlCardComponent
             image="./static/images/kubeflow.png"
             connector="http://jupyter-jupyterhub.tanzudatatap.com"
             console="http://kubeflow-pipelines.tanzudatatap.com/#/pipelines"
             description="Kubeflow Dev Instance"
             body="Kubeflow is an open-source platform for machine learning and MLOps on Kubernetes, handling model development, model training, model serving, and automated machine learning."
           />
          </Grid>
       </Grid>
       <br/><br/>

    <ContentHeader title="Distributed ML" variant="h3"/>
      <Grid container spacing={3}>
        <Grid item>
          <MlCardComponent
            image="./static/images/ray.png"
            connector="http://jupyter-jupyterhub.tanzudatatap.com"
            console="http://ray.tanzudataworkshop.info/#/cluster"
            description="Ray Development Env"
            body="Ray is an open-source unified compute framework for scaling AI and Python workloads, including reinforcement learning, deep learning to tuning and model serving."
          />
         </Grid>
          <Grid item>
            <MlCardComponent
              image="./static/images/spark.png"
              connector="http://jupyter-jupyterhub.tanzudatatap.com"
              console="http://kubeflow-pipelines.tanzudatatap.com/#/pipelines"
              description="Spark Dev Env"
              body="Spark is an open-source unified analytics engine for large-scale data processing, including an interface for programming clusters with data parallelism and fault tolerance."
            />
           </Grid>
        </Grid>
        <br/><br/>

       <ContentHeader title="Federated ML" variant="h3"/>
       <Grid container spacing={3}>
         <Grid item>
           <MlCardComponent
             image="./static/images/kubefate.png"
             connector="http://jupyter-jupyterhub.tanzudatatap.com"
             console="http://kubeflow-pipelines.tanzudatatap.com/#/pipelines"
             description="Kubefate Dev Cluster"
             body="KubeFATE enables federated learning tasks to run across public, private and hybrid cloud environments, based on FATE (Federated AI Technology Enabler)."
           />
          </Grid>
            <Grid item>
              <MlCardComponent
                image="./static/images/openfl.png"
                connector="http://jupyter-jupyterhub.tanzudatatap.com"
                console="http://kubeflow-pipelines.tanzudatatap.com/#/pipelines"
                description="OpenFL Test Federation"
                body="Open federated learning (OpenFL) framework is an open-source python-based tool for training ML/DL algorithms using the data-private collaborative learning paradigm of FL.
    "
              />
             </Grid>
      </Grid>
      <br/><br/>

    </Content>
  </Page>
);
