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
      <Header title="Experiments"
              subtitle="Notebooks for ML experimentation"
              style={{background: 'none', color: '#7EF3E0'}}>
      </Header>
    <Content>
    <ContentHeader title="Notebooks" variant="h3"/>
      <Grid container spacing={3}>
        <Grid item>
          <MlCardComponent
            image="./static/images/jupyterhub.png"
            connector="http://jupyter-jupyterhub.tanzudatatap.com"
            description="Main Portal"
            body="Jupyterhub is a multi-user Hub that spawns, manages, and proxies multiple instances of the single-user Jupyter notebook server."
          />
         </Grid>
      </Grid>
      <br/><br/>

    </Content>
  </Page>
);
