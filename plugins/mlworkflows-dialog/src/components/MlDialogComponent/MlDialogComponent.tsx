// @ts-nocheck
import React from 'react';
import MaterialTable from 'material-table';
import MaterialButton from '@material-ui/core/Button';
import Avatar from '@mui/material/Avatar';
import { lightGreen } from '@mui/material/colors';

export const MlDialogComponent = (props: any) => {
    return (
          <MaterialTable
                columns={[
                  { title: 'avatar', field: 'avatar', render: () => <Avatar sx={{ bgcolor: lightGreen[500] }}>GP</Avatar> },
                  { title: 'description', field: 'description', render: rowData => <div style={{color: '#fff'}}>{rowData.description}</div> },
                  { title: 'connect', field: 'connectlink', render: () =>
                    <MaterialButton href={props.connector} target="_blank" rel="noopener">Connect</MaterialButton>
                  }
                ]}
                data={[{ name: 'Mehmet', description: props.description || 'Cluster Instance', connectlink: 'true' }]}
                options={{ search: false, showTitle: false, toolbar: false, paging: false, rowStyle: { backgroundColor: '#424242', color: '#fff'}, }}
                components={{  Pagination: () => (<div/>), Toolbar: () => (<div/>), Header: () => (<div/>), }}
              />
    );
}
