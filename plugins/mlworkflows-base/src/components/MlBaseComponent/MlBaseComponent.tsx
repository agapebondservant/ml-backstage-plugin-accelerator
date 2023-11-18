import { React, useState, useEffect } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { InfoCard, Header, Page, Content, ContentHeader, HeaderLabel, SupportButton, Progress, ResponseErrorPanel, WarningPanel } from '@backstage/core-components';
import { MlCardComponent } from '@internal/plugin-mlworkflows-card';
import { createTheme } from '@mui/material/styles';
import { useApi, configApiRef, fetchApiRef } from '@backstage/core-plugin-api';
import { LinearProgress } from '@mui/material';
import { kubernetesApiRef } from '@backstage/plugin-kubernetes';
import useAsync from 'react-use/lib/useAsync';
import * as yaml from 'js-yaml';

export const MlBaseComponent = (props) => {

   /*** * Fetch Kubernetes metadata * ***/
   const kubernetesApi = useApi(kubernetesApiRef);

   const { value, loading, error } = useAsync(async (): Promise<any> => {
       const CLUSTER_NAME = 'local';

       const response = await kubernetesApi.proxy({
            clusterName: CLUSTER_NAME,
            path: '/apis/kappctrl.k14s.io/v1alpha1/apps',
       });

       const clusterInfo = await response.json();

       return clusterInfo;
   }, []);

   if (error) {
    console.log('error')
   }

   /*** * Fetch ML Tool files * ***/
   const backendUrl = useApi(configApiRef).getString('backend.baseUrl');

   const [mlFilesPayload, setFilesPayload]           = useState("");

   const [mlFilesPayloadError, setFilesPayloadError] = useState("");

   fetch(`${backendUrl}/api/mlworkflows/files`)
         .then(response => response.text())
         .then(payload => setFilesPayload(yaml.load(payload)))
         .catch(error => setFilesPayloadError(error));

   if (mlFilesPayloadError) {
        console.log("Error: " + mlFilesPayloadError);
        return <><Progress /><WarningPanel title="Page loading (could take up to a minute). Please wait..."/></>;
   }
   else if (mlFilesPayload) {
     return  (
              <Page themeId="tool">
                <Header title={props.title}
                        subtitle={props.subtitle}
                        style={{background: 'none', color: '#7EF3E0'}}>
                </Header>
                <Content>
                   {[...new Set(mlFilesPayload.tools.filter(mlFile => mlFile.category === props.category).map(mlFile => mlFile.title))].map((mlFileTitle, i) =>
                   <>
                      <ContentHeader title={mlFileTitle} variant="h3" key={props.category + "mlfiletitlecontent" + i}/>
                      <Grid container spacing={3} key={props.category + "mlfiletitlegrid" + i}>
                        {mlFilesPayload.tools.filter(mlFile => mlFile.title === mlFileTitle).map((mlFile, j) =>
                            <Grid item key={props.category + "mlfilegrid" + j}>
                              <MlCardComponent key={props.category + "mlfilecard" + j}
                                name={ mlFile.name }
                                title={ mlFile.title }
                                image={ mlFile.image }
                                console={ mlFile.console }
                                connector={ mlFile.connector }
                                description={ mlFile.description }
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
