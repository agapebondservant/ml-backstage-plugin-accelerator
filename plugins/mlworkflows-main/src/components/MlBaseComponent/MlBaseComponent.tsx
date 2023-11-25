// @ts-nocheck
import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { Header, Page, Content, ContentHeader, Progress, WarningPanel } from '@backstage/core-components';
import { MlCardComponent } from '../MlCardComponent';
import { useApi, configApiRef } from '@backstage/core-plugin-api';
import useAsync from 'react-use/lib/useAsync';
import * as yaml from 'js-yaml';

const mlToolsStaticData = `
tools:
  - name: "greenplum"
    title: "Database Storage"
    category: "data"
    image: "./static/images/greenplum.jpeg"
    body: "Greenplum is the world's only opensource-based, multi-cloud, massively parallel processing (MPP) data platform for large-scale analytics and data warehousing."
  - name: "postgres"
    title: "Database Storage"
    category: "data"
    image: "./static/images/postgres.png"
    body: "Postgres is the world's most advanced open source, object-relational database, with in-built support for advanced analytics, geospatial and fulltext search."
  - name: "oracle"
    title: "Database Storage"
    category: "data"
    image: "./static/images/oracle.png"
    body: "Oracle Database is a proprietary multi-model database management system commonly used for running online transaction processing, data warehousing and mixed database workloads."
  - name: "mongodb"
    title: "Database Storage"
    category: "data"
    image: "./static/images/mongodb.png"
    body: "Mongodb is a cross-platform document-oriented database with support for enterprise-grade relational db features, JSON and JSON-like document processing at scale. "
  - name: "feast"
    title: "Feature Stores"
    category: "data"
    image: "./static/images/feast.png"
    body: "Feast (Feature Store) is an open source feature store for machine learning, allowing teams to define, manage, discover and serve features in a scalable manner."
  - name: "gemfire"
    title: "Feature Stores"
    category: "data"
    image: "./static/images/gemfire.jpeg"
    body: "Gemfire is a data management platform that provides real-time, consistent access to data-intensive applications throughout widely distributed cloud architectures."
  - name: "greenplum"
    title: "Vector Databases"
    category: "data"
    image: "./static/images/greenplum.jpeg"
    body: "Greenplum is a parallelized Postgres database with support for semantic-based search algorithms and vectorized embeddings using pgvector and postgresml."
  - name: "postgres"
    title: "Vector Databases"
    category: "data"
    image: "./static/images/postgres.png"
    body: "Postgres is the world's most advanced open source, object-relational database, with in-built, full ACID support for vector search and embeddings."
  - name: "pinecone"
    title: "Vector Databases"
    image: "./static/images/pinecone.png"
    body: "Pinecone is a fully-managed, developer-friendly, easily scalable vector database, providing long-term memory for generative AI tasks and LLM integration."
  - name: "datahub"
    title: "Data Catalogs"
    category: "data"
    image: "./static/images/datahub.png"
    body: "DataHub is an extensible metadata platform that enables data discovery, data observability and federated governance for taming the complexity of enterprise data."
  - name: "gemfire"
    title: "In-Memory Datastores"
    category: "data"
    image: "./static/images/gemfire.jpeg"
    body: "Gemfire is a data management platform that provides real-time, consistent access to data-intensive applications throughout widely distributed cloud architectures."
  - name: "redis"
    title: "In-Memory Datastores"
    category: "data"
    image: "./static/images/redis.png"
    body: "Redis is an open source (BSD licensed), in-memory data structure store, used as a distributed, in-memory key–value database, cache and message broker."
  - name: "kubeflowpipelines"
    title: "MLOps Platforms"
    category: "clusters"
    image: "./static/images/kubeflow.png"
    body: "Kubeflow is an open-source platform for machine learning and MLOps on Kubernetes, handling model development, model training, model serving, and automated machine learning."
  - name: "ray"
    title: "Distributed ML"
    category: "clusters"
    image: "./static/images/ray.png"
    body: "Ray is an open-source unified compute framework for scaling AI and Python workloads, including reinforcement learning, deep learning to tuning and model serving."
  - name: "spark"
    title: "Distributed ML"
    category: "clusters"
    image: "./static/images/spark.png"
    body: "Spark is an open-source unified analytics engine for large-scale data processing, including an interface for programming clusters with data parallelism and fault tolerance."
  - name: "kubefate"
    title: "Federated ML"
    category: "clusters"
    image: "./static/images/kubefate.png"
    body: "KubeFATE enables federated learning tasks to run across public, private and hybrid cloud environments, based on FATE (Federated AI Technology Enabler)."
  - name: "openfl"
    title: "Federated ML"
    category: "clusters"
    image: "./static/images/openfl.png"
    body: "Open federated learning (OpenFL) framework is an open-source python-based tool for training ML/DL algorithms using the data-private collaborative learning paradigm of FL."
  - name: "jupyter"
    title: "Notebooks"
    category: "experiments"
    image: "./static/images/jupyterhub.png"
    body: "Jupyterhub is a multi-user Hub that spawns, manages, and proxies multiple instances of the single-user Jupyter notebook server."
  - name: "argo"
    title: "ML Pipelines"
    category: "pipelines"
    image: "./static/images/argoworkflows.png"
    body: "Argo Workflows is an open source container-native workflow engine for orchestrating parallel jobs on Kubernetes, where each step in the workflow is a container."
  - name: "airflow"
    title: "ML Pipelines"
    category: "pipelines"
    image: "./static/images/airflow.png"
    body: "Apache Airflow is an open-source platform for developing, scheduling, and monitoring batch-oriented workflows, providing ease-of-use, flexible UI and multiple integrations."
  - name: "kubeflow"
    title: "ML Pipelines"
    category: "pipelines"
    image: "./static/images/kubeflowpipelines.png"
    body: "Kubeflow Pipelines enables the development of reusable end-to-end ML workflows built using the Kubeflow Pipelines SDK for end-to-end ML orchestration."
  - name: "scdf"
    title: "Data Pipelines"
    category: "pipelines"
    image: "./static/images/springclouddataflow.png"
    body: "Spring Cloud Data Flow is a cloud-native engine for both batch and real-time data pieplines, with support for ETL processing, event streaming and predictive analytics."
  - name: "airflow"
    title: "Data Pipelines"
    category: "pipelines"
    image: "./static/images/airflow.png"
    body: "Apache Airflow is an open-source platform for developing, scheduling, and monitoring batch-oriented workflows, providing ease-of-use, flexible UI and multiple integrations."
  - name: "mlflow"
    title: "Model Repositories"
    category: "models"
    image: "./static/images/mlflow.png"
    body: "MLflow an open source platform for managing the end-to-end machine learning lifecycle, with components for tracking, serving, packaging and registering models."
  - name: "mlflow"
    title: "Model Training"
    category: "models"
    image: "./static/images/mlflow.png"
    body: "MLflow an open source platform for managing the end-to-end machine learning lifecycle, with components for tracking, serving, packaging and registering models."
  - name: "kubeflow"
    title: "Model Training"
    category: "models"
    image: "./static/images/kubeflow.png"
    body: "Kubeflow is an open-source platform for machine learning and MLOps on Kubernetes, handling model development, model training, model serving, and automated machine learning."
  - name: "huggingface"
    title: "Model Hubs"
    category: "models"
    image: "./static/images/huggingface.png"
    body: "HuggingFace Hub s a central repository where people can share and access machine learning models, datasets, demos, applications and more for easier collaboration."
  - name: "katib"
    title: "AutoML"
    category: "models"
    image: "./static/images/katib.png"
    body: "Katib is a Kubernetes-native project for automated machine learning (AutoML), supporting Hyperparameter Tuning, Early Stopping and Neural Architecture Search."
  - name: "evidently"
    title: "ML Monitoring"
    category: "models"
    image: "./static/images/evidently.jpeg"
    body: "Evidently is an open-source Python library for data scientists and ML engineers. It helps evaluate, test, and monitor data and ML models from validation to production. It works with tabular, text data and embeddings."
`;

export const MlBaseComponent = (props: any) => {

   /*** * Fetch ML Tool files * ***/

   const [mlFilesPayload, setFilesPayload]           = useState("");

   const [mlFilesPayloadError, setFilesPayloadError] = useState("");

//    const backendUrl = useApi(configApiRef).getString('backend.baseUrl');
//    fetch(`${backendUrl}/api/mlworkflows/files`)
//          .then(response => response.text())
//          .then(payload => setFilesPayload(yaml.load(payload)))
//          .catch(error => setFilesPayloadError(error));
   var { value, loading, error } = useAsync(async (): Promise<any[]> => {
       setFilesPayload(yaml.load(mlToolsStaticData));
       return [];
     }, []);

   if (mlFilesPayloadError) {
        console.log("Error: " + mlFilesPayloadError);
        return <><Progress /><WarningPanel title="Page loading (could take up to a minute). Please wait..."/></>;
   }
   else if (mlFilesPayload) {
     return  (
              <Page themeId="tool">
                <Header title=""
                        subtitle={props.subtitle}
                        style={{background: 'none'}}>
                </Header>
                <Content>
                   {[...new Set(mlFilesPayload.tools.filter((mlFile: any) => mlFile.category === props.category).map(mlFile => mlFile.title))].map((mlFileTitle: string, i: any) =>
                   <>
                      <ContentHeader title={mlFileTitle} variant="h3" key={props.category + "mlfiletitlecontent" + i}/>
                      <Grid container spacing={3} key={props.category + "mlfiletitlegrid" + i}>
                        {mlFilesPayload.tools.filter( (mlFile: any) => mlFile.title === mlFileTitle).map((mlFile: any, j: any) =>
                            <Grid item key={props.category + "mlfilegrid" + j}>
                              <MlCardComponent key={props.category + "mlfilecard" + j}
                                name={ mlFile.name }
                                title={ mlFile.title }
                                image={ mlFile.image }
                                category= { mlFile.category }
                                body={ mlFile.body }
                              />
                             </Grid>
                         )}
                      </Grid>
                      <br/><br/>
                  </>
                  )}
                </Content>
              </Page>
        );
     } else {
        return <><Progress /><WarningPanel title="Page loading. Please wait..."/></>;
     }
};
