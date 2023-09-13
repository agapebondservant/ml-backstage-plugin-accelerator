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
    <Header title="Data"
            subtitle="Workflows for integrating and preprocessing datasets for machine learning workflows"
            style={{background: 'none', color: '#7EF3E0'}}>
    </Header>
    <Content>
      <ContentHeader title="Data Storage" variant="h3"/>
      <Grid container spacing={3}>
        <Grid item>
          <MlCardComponent
            image="./static/images/greenplum.jpeg"
            console="http://ec2-44-201-91-88.compute-1.amazonaws.com:28080"
            connector="http://jupyter-jupyterhub.tanzudatatap.com"
            body="Greenplum is the world's only opensource-based, multi-cloud, massively parallel processing (MPP) data platform for large-scale analytics and data warehousing."
          />
         </Grid>
         <Grid item>
          <MlCardComponent
              image="./static/images/postgres.png"
              body="Postgres is the world's most advanced open source, object-relational database, with in-built support for advanced analytics, geospatial and fulltext search."
            />
        </Grid>
        <Grid item>
          <MlCardComponent
              image="./static/images/oracle.png"
              body="Oracle Database is a proprietary multi-model database management system commonly used for running online transaction processing, data warehousing and mixed database workloads."
            />
        </Grid>
      </Grid>
      <br/><br/>

      <ContentHeader title="Feature Stores" variant="h3"/>
      <Grid container spacing={3}>
          <Grid item>
            <MlCardComponent
              image="./static/images/feast.png"
              body="Feast (Feature Store) is an open source feature store for machine learning, allowing teams to define, manage, discover and serve features in a scalable manner."
            />
           </Grid>
           <Grid item>
            <MlCardComponent
                image="./static/images/gemfire.jpeg"
                body="Gemfire is a data management platform that provides real-time, consistent access to data-intensive applications throughout widely distributed cloud architectures."
              />
          </Grid>
        </Grid>
        <br/><br/>

        <ContentHeader title="Vector Databases" variant="h3"/>
        <Grid container spacing={3}>
          <Grid item>
            <MlCardComponent
              image="./static/images/greenplum.jpeg"
              console="http://ec2-44-201-91-88.compute-1.amazonaws.com:28080"
              connector="http://jupyter-jupyterhub.tanzudatatap.com"
              body="Greenplum is a parallelized Postgres database with support for semantic-based search algorithms and vectorized embeddings using pgvector and postgresml."
            />
           </Grid>
           <Grid item>
            <MlCardComponent
                image="./static/images/postgres.png"
                body="Postgres is the world's most advanced open source, object-relational database, with in-built, full ACID support for vector search and embeddings."
              />
          </Grid>
          <Grid item>
            <MlCardComponent
                image="./static/images/pinecone.png"
                body="Pinecone is a fully-managed, developer-friendly, easily scalable vector database, providing long-term memory for generative AI tasks and LLM integration."
              />
          </Grid>
         </Grid>
    </Content>
  </Page>
);
