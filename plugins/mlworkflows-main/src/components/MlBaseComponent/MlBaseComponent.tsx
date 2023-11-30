// @ts-nocheck
import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Header, Page, Content, Progress, WarningPanel } from '@backstage/core-components';
import { MlCardComponent } from '../MlCardComponent';
import { useApi, configApiRef } from '@backstage/core-plugin-api';
import useAsync from 'react-use/lib/useAsync';
import * as yaml from 'js-yaml';
import mlTools from './yaml/mlTools.yaml';

export const MlBaseComponent = (props: any) => {

   /*** * Fetch ML Tool files * ***/

   const [mlFilesPayload, setFilesPayload]           = useState("");

   const [mlFilesPayloadError, setFilesPayloadError] = useState("");

   var { value, loading, error } = useAsync(async (): Promise<any[]> => {
        console.debug(mlTools);
        setFilesPayload(mlTools);
        return [];
     }, []);

   if (mlFilesPayloadError) {
        console.log("Error: " + mlFilesPayloadError);
        return <><Progress /><WarningPanel title="Page loading (could take up to a minute). Please wait..."/></>;
   }
   else if (mlFilesPayload) {
     return  (
              <Page themeId="tool">
                <Header title={props.title}
                        subtitle={props.subtitle}
                        style={{background: 'none'}}>
                </Header>
                <Content>
                   {[...new Set(mlFilesPayload.tools.filter((mlFile: any) => mlFile.category === props.category).map(mlFile => mlFile.title))].map((mlFileTitle: string, i: any) =>
                   <>
                      <Typography variant="h6">{mlFileTitle}</Typography>
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
