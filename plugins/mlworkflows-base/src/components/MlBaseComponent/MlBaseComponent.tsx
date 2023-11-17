import { React, useState, useEffect } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { InfoCard, Header, Page, Content, ContentHeader, HeaderLabel, SupportButton, Progress, ResponseErrorPanel, WarningPanel } from '@backstage/core-components';
import { MlCardComponent } from '@internal/plugin-mlworkflows-card';
import { createTheme } from '@mui/material/styles';
import { useApi, configApiRef, fetchApiRef } from '@backstage/core-plugin-api';
import { LinearProgress } from '@mui/material';
import * as yaml from 'js-yaml';

export const MlBaseComponent = (props) => {
   const backendUrl = useApi(configApiRef).getString('backend.baseUrl');

   const [mlFilesPayload, setFilesPayload]           = useState("");

   const [mlFilesPayloadError, setFilesPayloadError] = useState("");

   fetch(`${backendUrl}/api/mlworkflows/files`)
         .then(response => response.text())
         .then(payload => setFilesPayload(yaml.load(payload)))
         .catch(error => setFilesPayloadError(error));

   if (mlFilesPayloadError) {
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
                   {[...new Set(mlFilesPayload.tools.filter(mlFile => mlFile.category === props.category).map(mlFile => mlFile.title))].map(mlFileTitle =>
                   <>
                      <ContentHeader title={mlFileTitle} variant="h3"/>
                      <Grid container spacing={3}>
                        {mlFilesPayload.tools.filter(mlFile => mlFile.title === mlFileTitle).map(mlFile =>
                            <Grid item>
                              <MlCardComponent
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
