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
    <Header title="Models"
            subtitle="Tools for building, training and lifecycle management of ML models"
            style={{background: 'none', color: '#7EF3E0'}}>
    </Header>
    <Content>
      <ContentHeader title="Model Repository" variant="h3"/>
      <Grid container spacing={3}>
        <Grid item>
          <MlCardComponent
            image="./static/images/mlflow.png"
            console="http://mlflow.tanzudatatap.com"
            connector="http://jupyter-jupyterhub.tanzudatatap.com"
            description="Dev Instance"
            body="MLflow an open source platform for managing the end-to-end machine learning lifecycle, with components for tracking, serving, packaging and registering models."
          />
         </Grid>
      </Grid>
      <br/><br/>

      <ContentHeader title="Model Training" variant="h3"/>
      <Grid container spacing={3}>
          <Grid item>
            <MlCardComponent
              image="./static/images/mlflow.png"
              console="http://mlflow.tanzudatatap.com"
              connector="http://jupyter-jupyterhub.tanzudatatap.com"
              description="Dev Instance"
              body="MLflow an open source platform for managing the end-to-end machine learning lifecycle, with components for tracking, serving, packaging and registering models."
            />
           </Grid>
           <Grid item>
            <MlCardComponent
              image="./static/images/kubeflow.png"
              console="http://mlflow.tanzumlai.com"
              connector="http://jupyter-jupyterhub.tanzudatatap.com"
              description="Dev Instance"
              body="Kubeflow is an open-source platform for machine learning and MLOps on Kubernetes, handling model development, model training, model serving, and automated machine learning."
            />
          </Grid>
        </Grid>
        <br/><br/>

      <ContentHeader title="AutoML" variant="h3"/>
          <Grid container spacing={3}>
              <Grid item>
                <MlCardComponent
                  image="./static/images/katib.png"
                  body="Katib is a Kubernetes-native project for automated machine learning (AutoML), supporting Hyperparameter Tuning, Early Stopping and Neural Architecture Search."
                />
               </Grid>
            </Grid>
            <br/><br/>

      <ContentHeader title="Model Monitoring" variant="h3"/>
      <Grid container spacing={3}>
          <Grid item>
            <MlCardComponent
              image="./static/images/evidently.jpeg"
              console="http://mlflow.tanzudatatap.com"
              connector="http://jupyter-jupyterhub.tanzudatatap.com"
              description="Dev Instance"
              body="Evidently is an open-source Python library for data scientists and ML engineers. It helps evaluate, test, and monitor data and ML models from validation to production. It works with tabular, text data and embeddings."
            />
           </Grid>
        </Grid>
        <br/><br/>
    </Content>
  </Page>
);
