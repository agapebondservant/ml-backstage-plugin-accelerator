import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import MaterialButton from '@material-ui/core/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { Icon } from "@material-ui/core";
import { Link } from '@backstage/plugin-ilert';
import { Avatar } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';
import { MlDialogComponent } from '@internal/plugin-mlworkflows-dialog';

const mlCardTheme = createTheme({
  components: {
    MuiCardMedia: {
      styleOverrides: {
        root: {
          backgroundSize: '200px',
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
    MuiIconButton: {
      styleOverrides: {
        label: {
          float: 'right',
        },
      },
    },
  },
});

const doConnect = () => {
    return 'Your click worked!';
};

const defaultMaterialTheme = createTheme();

export const MlCardComponent = (props) => {
  const [open, setOpen] = React.useState(false);

  const openDialog = () => {
      setOpen(true);
  }

  const closeDialog = () => {
      setOpen(false);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={ require('' + props.image + '') }
        theme={ mlCardTheme }
      />
      <CardContent
        theme= { mlCardTheme }>
        <Typography variant="body2">
          { props.body }
        </Typography>
      </CardContent>
      <CardActions
        theme= { mlCardTheme }>
        <MaterialButton href={props.connector} target="_blank" rel="noopener">Connect</MaterialButton>
        <MaterialButton onClick={openDialog}>Console</MaterialButton>
        <Dialog
            open={open}
            onClose={closeDialog}
            aria-labelledBy="dialog-instances"
            aria-describedBy="List of instances"
            maxWidth="xl"
            scroll="body"
        >
            <DialogTitle>Instances <IconButton style={{ float: 'right' }} aria-label="close" onClick={closeDialog}><CloseIcon/></IconButton></DialogTitle>
            <DialogContent><MlDialogComponent connector={props.console} description={props.description}/><br/></DialogContent>
        </Dialog>
      </CardActions>
    </Card>
  );
}