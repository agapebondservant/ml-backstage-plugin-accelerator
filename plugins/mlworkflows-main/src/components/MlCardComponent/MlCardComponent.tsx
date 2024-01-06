// @ts-nocheck
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import MaterialButton from '@material-ui/core/Button';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { MlDialogComponent } from '../MlDialogComponent';
import { useApi, configApiRef } from '@backstage/core-plugin-api';
import { kubernetesApiRef } from '@backstage/plugin-kubernetes';
import useAsync from 'react-use/lib/useAsync';
import * as yaml from 'js-yaml';

const mlCardTheme = createTheme({
  components: {
    MuiCardMedia: {
      styleOverrides: {
        root: {
          backgroundSize: '200px',
          objectFit: "scaleDown",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(to bottom, #1B2B32, #1B2B32)',
          color: 'white',
          fontSize: '0.675rem',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: '0.675rem',
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          backgroundColor: '#1B2B32',
          padding: 0,
        },
      },
    }
  },
});

export const MlCardComponent = (props: any) => {
  const [open, setOpen] = React.useState(false);

  const configApi = useApi(configApiRef);

  const openDialog = () => {
       setOpen(true);
  }

  const closeDialog = () => {
      setOpen(false);
  }

  const [mlServiceBindings, setServiceBindings] = React.useState([]);

  const [mlConsoleLinks, setConsoleLinks] = React.useState([]);

  const CLUSTER_NAME = configApi.getOptionalString('mlbackstage.clusterName');

  const BACKEND_BASE_URL = configApi.getOptionalString('backend.baseUrl');

  /*** * Fetch Kubernetes metadata * ***/
  const kubernetesApi = useApi(kubernetesApiRef);
  var { value, loading, error } = useAsync(async (): Promise<any> => {

       await Promise.all([
          kubernetesApi.proxy({
                clusterName: CLUSTER_NAME,
                path: `/apis/services.apps.tanzu.vmware.com/v1alpha1/classclaims?labelSelector=backstage-dashboard-category=${props.name}`
          }),
          kubernetesApi.proxy({
               clusterName: CLUSTER_NAME,
               path: `/api/v1/configmaps?limit=1&labelSelector=backstage-dashboard-category=${props.name}`
          })
       ]).then(async ([bindingResponse, consoleResponse]) => {
            setServiceBindings( await bindingResponse.json() );
            setConsoleLinks( await consoleResponse.json() );
            return true;
       }).catch(([errBinding, errConsole]) => {
            console.log(errBinding);
            console.log(errConsole);
       });
  }, []);

  if (error) {
    console.log(error);
  }
  return (
    <Card
        sx={{ maxWidth: 345, border: '1px solid #404E60' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={ `${BACKEND_BASE_URL}/api/mlworkflows/images/` + props.image }
        theme={ mlCardTheme }
      />
      <CardContent
        theme= { mlCardTheme }>
        <Typography variant="body2" sx={{ fontSize: '14px'}}>
          { props.body }
        </Typography>
      </CardContent>
      <CardActions
        theme= { mlCardTheme }>
        <MaterialButton onClick={openDialog}>
            <Typography sx={{ color: 'white', textTransform: 'uppercase', fontSize: '14px', fontWeight: '500' }}>Connect</Typography>
        </MaterialButton>
        <Dialog
            open={open}
            onClose={closeDialog}
            aria-labelledby="dialog-instances"
            aria-describedby="List of instances"
            maxWidth="sm"
            fullWidth="true"
            scroll="body"
        >
            <DialogTitle>Instances <IconButton style={{ float: 'right' }} aria-label="close" onClick={closeDialog}><CloseIcon/></IconButton></DialogTitle>
            <DialogContent>
                <MlDialogComponent
                        category={props.name}
                        items={mlServiceBindings?.items}/>
                        <br/>
            </DialogContent>
        </Dialog>
        { mlConsoleLinks.items?.map((item: any) =>
            <><MaterialButton
                href={ `${item.data?.link}` }
                target="_blank"
                rel="noopener">
                <Typography sx={{ color: 'white', textTransform: 'uppercase', fontSize: '14px', fontWeight: '500' }}>Console</Typography>
            </MaterialButton></>
         )}
      </CardActions>
    </Card>
  );
}