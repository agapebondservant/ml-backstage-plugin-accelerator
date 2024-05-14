// @ts-nocheck
import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
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

   const homeOptions =
   [ { title: 'Deploy an opensource MLOps platform',
       description: 'Build an automated MLOps platform on Tanzu (model training, ML pipelines, data pipelines, model deployments, monitoring, governance, notebooks, etc)',
       link: '/create/templates/mlplatform'},
     { title: 'Launch an ML workspace',
       description: 'Use Jupyter notebooks and similar IDEs for experimentation and preprocessing tasks',
       link: 'https://tap-gui.tanzudatatap.com/mlworkflows/mlworkflows-experiments'},
     { title: 'Generate an ML pipeline from samples',
       description: 'Generate an automated ML pipeline from a predesigned template',
       link: '/create?filters%5Bkind%5D=template&filters%5Buser%5D=all&filters%5Btags%5D=sample&filters%5Btags%5D=pipeline'},
     { title: 'Build an ML app from samples',
       description: 'Discover, reuse and customize pre-existing templates for ML applications',
       link: '/create?filters%5Bkind%5D=template&filters%5Buser%5D=all&filters%5Btags%5D=sample&filters%5Btags%5D=app'},
    ];

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
            return (
                <>
                <Header title='Tanzu Spaces for AI and Machine Learning'
                        subtitle='What would you like to do?'
                        style={{background: 'none', boxShadow: 'none', width: '30%', paddingBottom: '0'}}>
                </Header>
                <Content>
                    <List sx={{ minWidth: 275 }}>
                      { homeOptions.map(( homeOption: any ) =>
                      <ListItem sx={{margin: '30px 0;', padding: '20px', bgcolor: 'background.paper', border: '1px solid #404e60', borderRadius: '4px'}} >
                        <ListItemAvatar><Avatar component="a" href={homeOption.link} target="_blank"><ArrowForwardIcon /></Avatar></ListItemAvatar>
                        <ListItemText primary={<Typography style={{ color: 'gray' }}>{homeOption.title}</Typography>}
                                      secondary={homeOption.description}/>
                      </ListItem>
                      )}
                    </List>
                </Content>
                </>
            );
         }
         else {
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
