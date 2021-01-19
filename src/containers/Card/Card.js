import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import DatePickerRange from '../DatePicker/DatePicker';
import bmw from '../../assets/images/bmw.jpg';
import mercedes from '../../assets/images/mercedes.jpg';
import toyota4x4 from '../../assets/images/toyota-4x4.jpg';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "5px auto"
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: "100%",
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const defaultData = {
  contacts: [
    {
      id: 'ryan',
      name: 'Ryan Florence',
      email: 'ryan@reacttraining.com',
      avatarURL: bmw
    },
    {
      id: 'michael',
      name: 'Michael Jackson',
      email: 'michael@reacttraining.com',
      avatarURL: mercedes
    },
    {
      id: 'tyler',
      name: 'Tyler McGinnis',
      email: 'tyler@reacttraining.com',
      avatarURL: toyota4x4
    }
  ]
}

function ComplexGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={4} item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={props.avatarURL} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm={8} container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <DatePickerRange />
                <Typography gutterBottom variant="subtitle1">
                  Standard license
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Full resolution 1920x1080 • JPEG
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: 1030115
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Remove
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">$19.00</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}


export default function Card() {
  return (
    defaultData.contacts.map(item => <ComplexGrid key={item.id} avatarURL={item.avatarURL} />)
  );
  
}