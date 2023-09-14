import React, { useState } from 'react';
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
import { createTheme } from '@mui/material/styles';
import MaterialTable from 'material-table';
import { Button, Divider } from '@mui/material';
import MaterialButton from '@material-ui/core/Button';
import Avatar from '@mui/material/Avatar';
import { lightGreen } from '@mui/material/colors';
import axios from 'axios';

export const MlDialogComponent = (props) => {
    return (
          <MaterialTable
                columns={[
                  { title: 'avatar', field: 'avatar', render: rowData => <Avatar sx={{ bgcolor: lightGreen[500] }}>GP</Avatar> },
                  { title: 'description', field: 'description', render: rowData => <div style={{color: '#fff'}}>{rowData.description}</div> },
                  { title: 'connect', field: 'connectlink', render: rowData =>
                    <MaterialButton href={props.connector} target="_blank" rel="noopener">Connect</MaterialButton>
                  }
                ]}
                data={[{ name: 'Mehmet', description: props.description || 'Cluster Instance', connectlink: 'true' }]}
                options={{ search: false, showTitle: false, toolbar: false, paging: false, rowStyle: { backgroundColor: '#424242', color: '#fff'}, }}
                components={{  Pagination: props => (<div/>), Toolbar: props => (<div/>), Header: props => (<div/>), }}
              />
    );
}
