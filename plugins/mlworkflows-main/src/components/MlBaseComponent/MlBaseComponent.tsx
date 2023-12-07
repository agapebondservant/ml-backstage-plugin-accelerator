// @ts-nocheck
import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Header, Page, Content, Progress, WarningPanel } from '@backstage/core-components';
import { MlCardComponent } from '../MlCardComponent';
import { useApi, configApiRef } from '@backstage/core-plugin-api';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import useAsync from 'react-use/lib/useAsync';

export const MlBaseComponent = (props: any) => {

   /*** * Fetch ML Tool files * ***/

   const [mlFilesPayload, setFilesPayload]           = useState("");

   const [mlFilesPayloadError, setFilesPayloadError] = useState("");

   const catalogApi = useApi( catalogApiRef );

   var { value, loading, error } = useAsync(async (): Promise<any[]> => {
        const payload = await catalogApi.getEntityByRef({ kind: "Component", name: "mltools-metadata"});
        console.debug(payload);
        setFilesPayload(payload?.spec);
        return [];
     }, []);

   if (mlFilesPayloadError) {
        console.log("Error: " + mlFilesPayloadError);
        return <><Progress /><WarningPanel title="Page loading (could take up to a minute). Please wait..."/></>;
   }
   else if (mlFilesPayload) {
     return  (
                <>
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
                                color={ mlFile.color }
                              />
                             </Grid>
                         )}
                      </Grid>
                      <br/><br/>
                  </>
                  )}
                </Content>
                </>
        );
     } else {
        return <><Progress /><WarningPanel title="Page loading. Please wait..."/></>;
     }
};
