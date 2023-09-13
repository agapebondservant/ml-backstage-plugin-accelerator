import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import MaterialButton from '@material-ui/core/Button';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';

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
  },
});

const doConnect = () => {
    return 'Your click worked!';
};

export const MlCardComponent = (props) => {
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
        <MaterialButton href={props.console} target="_blank" rel="noopener">Console</MaterialButton>
      </CardActions>
    </Card>
  );
}