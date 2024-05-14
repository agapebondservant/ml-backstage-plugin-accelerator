// @ts-nocheck
import React, { useState } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { Header, Page, Content, Progress, WarningPanel } from '@backstage/core-components';
import { MlCardComponent } from '../MlCardComponent';
import { useApi, configApiRef } from '@backstage/core-plugin-api';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import useAsync from 'react-use/lib/useAsync';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

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
   else if (mlFilesPayload ) {
       if (props.title === "Entry") {
            /*** * Home / Entry Page * ***/
            return (
                <>
                <Header title='Tanzu Spaces for AI and Machine Learning'
                        subtitle='What would you like to do?'
                        style={{background: 'none', boxShadow: 'none', width: '30%', paddingBottom: '0'}}>
                </Header>
                <Content>
                    <List sx={{ minWidth: 275 }}>
                      {[...new Set(mlFilesPayload.tools.filter((mlFile: any) => mlFile.category === 'entry'))].map((mlFile: any, i: any) =>
                      <Paper elevation={3}>
                      <ListItem sx={{margin: '30px 0;', padding: '20px', bgcolor: 'background.paper', border: '1px solid #404e60', borderRadius: '4px', "&:hover": {"backgroundColor": "#f3f2ee"}}}
                                component="a" href={mlFile.route} target="_blank">
                        <ListItemAvatar><Avatar><ArrowForwardIcon /></Avatar></ListItemAvatar>
                        <ListItemText primary={<Typography style={{ color: 'gray' }}>{mlFile.title}</Typography>}
                                      secondary={mlFile.body}/>
                      </ListItem>
                      </Paper>
                      )}
                    </List>
                </Content>
                </>
            );
         }
         else {
            /*** * MLOps Tools * ***/
            return (
                    <>
                    <Header title={props.title}
                            subtitle={props.subtitle}
                            style={{background: 'none', boxShadow: 'none', width: '30%', paddingBottom: '0'}}>
                    </Header>
                    <Content>
                       {[...new Set(mlFilesPayload.tools.filter((mlFile: any) => mlFile.category === props.category).map(mlFile => mlFile.title))].map((mlFileTitle: string, i: any) =>
                       <>
                          <Typography variant="h5">{mlFileTitle}</Typography>
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
          }
     } else {
        return <><Progress /><WarningPanel title="Page loading. Please wait..."/></>;
     }
};
