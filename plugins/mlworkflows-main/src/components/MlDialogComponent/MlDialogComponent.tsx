import React from 'react';
import MaterialTable from 'material-table';
import Avatar from '@mui/material/Avatar';
import { lightGreen } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Grid } from '@material-ui/core';
import { CopyTextButton } from '@backstage/core-components';

export const MlDialogComponent = (props: any) => {

    const data = props.items?.length
        ? props.items.map((item: any) => {
            return {
                name: 'Mehmet',
                binding: item.metadata?.name,
                copy: true
            };
        })
        : [ {name: 'Mehmet', binding: '', copy: true} ];

    return (
          <>
          <Typography variant="body2">
            <Link href="https://servicebinding.io/application-developer/"
               target="_blank"
               color={lightGreen[500]}
               sx={{fontSize: '14px'}}>
                <Grid container direction="row" alignItems="flex-start" justifyContent="flex-start">
                  <Grid item>Connecting to a service with ServiceBindings</Grid>
                </Grid>
            </Link>
          </Typography>
          <br/>
          <MaterialTable
                columns={[
                  { title: 'icon', field: 'avatar', render: () => <Avatar sx={{ bgcolor: lightGreen[500] }}>{props.category.charAt(0).toUpperCase()}</Avatar> },
                  { title: 'serviceBinding', field: 'binding', render: rowData => <><div style={{color: '#fff'}}>{rowData.binding || 'No instances found.'}</div></> },
                  { title: 'copy', field: 'copy', render: rowData => rowData.binding ? <><span>Service Binding: </span><CopyTextButton text={rowData.binding}/></> : '' }
                ]}
                data={ data }
                options={{ search: false, showTitle: true, toolbar: false, paging: false, rowStyle: { backgroundColor: '#424242', color: '#fff'}, }}
                components={{  Pagination: () => (<div/>), Toolbar: () => (<div/>), Header: () => (<div/>), }}
              />
           </>
    );
}
