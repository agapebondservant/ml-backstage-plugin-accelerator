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
          backgroundColor: '#424242',
          color: '#ffffff',
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          backgroundColor: '#424242',
        },
      },
    },
  },
});

export const MlCardComponent = (props: any) => {
  const [open, setOpen] = React.useState(false);

  const openDialog = () => {
       setOpen(true);
  }

  const closeDialog = () => {
      setOpen(false);
  }

  const [mlServiceBindings, setServiceBindings] = React.useState([]);

  const [mlConsoleLinks, setConsoleLinks] = React.useState([]);

  const CLUSTER_NAME = "local"; // useApi(configApiRef).getOptionalString('mlbackstage.clusterName');

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
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140, backgroundImage: 'radial-gradient(white,lightgray)', backgroundSize: '100%' }}
        theme={ mlCardTheme } >
      <Typography style={{color: `${props.color || 'darkgreen'}`,textTransform: 'capitalize',padding: '1em',textAlign: 'center',letterSpacing: '.2rem',font: '3em "Calibri", sans-serif'}}>
        { props.name }
      </Typography>
      </CardMedia>
      <CardContent
        theme= { mlCardTheme }>
        <Typography variant="body2">
          { props.body }
        </Typography>
      </CardContent>
      <CardActions
        theme= { mlCardTheme }>
        <MaterialButton onClick={openDialog}>Connect</MaterialButton>
        <Dialog
            open={open}
            onClose={closeDialog}
            aria-labelledby="dialog-instances"
            aria-describedby="List of instances"
            maxWidth="xl"
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
                rel="noopener">Console
            </MaterialButton></>
         )}
      </CardActions>
    </Card>
  );
}