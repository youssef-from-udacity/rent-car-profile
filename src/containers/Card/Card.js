import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import * as actions from "../../store/actions/index";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import DatePickerRange from '../DatePicker/DatePicker';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SaveIcon from '@material-ui/icons/Save';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import Slide from '@material-ui/core/Slide';
import { CarAvatar } from '../../components/UI/CustomIcons/CustomIcons';



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
    maxHeight: 300,
    overflow: "hidden",
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    height: '100%',
    maxHeight: 300,
    overflow: 'hidden',
  },
  label: {
    fontSize: 12,
    [theme.breakpoints.up(354)]: {
      fontSize: 14,
    }
  },
  plate: {
    backgroundColor: '#fff',
    cursor: 'unset',
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.success.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
}))(Button);

function Card(props) {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [rerender, setRerender] = useState();
  const [save, setSave] = useState(false);
  const [reset, setReset] = useState(false);
  const [checked, setChecked] = React.useState(false);

  const { updateUserData } = props

  const onChange = dates => {
    let [start, end] = dates;
    //props.updateUserDataItem();
    const hours = start.getHours()
    const minutes = start.getMinutes()
    end = end ? new Date(new Date(end.setHours(hours)).setMinutes(minutes)) : null;
    // eslint-disable-next-line no-unused-expressions
    end && end > new Date() ? setSave(true) : setSave(false);
    
    setStartDate(start);
    setEndDate(end);
    props.onAddUserDataItemToState(props.item)
    props.onUpdateInfo({ bookingStartDay: start.getTime(), bookingEndDay: end?.getTime(), }, 'booking')
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      setRerender(new Date())
      clearTimeout(timer)
    }, 60000)

    return () => {
      clearTimeout(timer)
    }

  }, [rerender])

  useEffect(() => {

    setChecked(true);
    const booking = props.item.booking
    booking?.bookingStartDay ? setStartDate(new Date(booking.bookingStartDay)) : setStartDate(new Date())
    booking?.bookingEndDay ? (booking.bookingEndDay > new Date() ? setEndDate(new Date(booking.bookingEndDay)) : setEndDate(null)) : setEndDate(null)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateUserDataItem = () => {
    setSave(false)
    updateUserData()
  };

  const removeUserDataItem = () => {
    props.onAddUserDataItemToState(props.item)
    props.removeUserData()
    setChecked(false)

  }

  const resetDates = () => {
    setEndDate(new Date())
    setSave(false);
    props.onAddUserDataItemToState(props.item)
    props.onUpdateInfo({ bookingStartDay: startDate.getTime(), bookingEndDay: new Date().getTime(), }, 'booking')
    setReset(true)

  };
  useEffect(() => {
    if (reset) {
      setReset(false)
      updateUserData()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset])


  return (
    <Slide direction="right" in={checked} mountOnEnter unmountOnExit>

    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={4} item>
            <ButtonBase className={classes.image}>
              {props.item.information.avatarURL ? <img className={classes.img} alt="complex" src={props.item.information.avatarURL} /> :
              <CarAvatar />}
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm={8} container>
            <Grid item xs container direction="column" spacing={2}>

              <Grid item xs>
                <Button
                  component={'div'} style={{ backgroundColor: '#fff', cursor: 'unset' }}
                  variant="contained"
                  className={classes.label}
                  disabled
                  color="secondary">Faites votre réservation ici</Button>
                <DatePickerRange startDate={startDate} endDate={endDate} handleChange={onChange} rerender={rerender} />
                {props.item.information.plate &&<div>
                  <Typography variant="body2" color="textSecondary" style={{ padding: 10 }}>
                    Plaque d'immatriculation
                </Typography>
                  <Button variant="outlined" component={'div'} className={classes.plate}>
                    {props.item.information.plate}
                  </Button>
                </div>}
              </Grid>

            </Grid>
            <Grid item>
              <IconButton aria-label="reminder">
                <NotificationsIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item>
            <IconButton aria-label="edit config" onClick={() => props.open(props.item)}>
              <SettingsIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={removeUserDataItem}>
              <DeleteIcon />
            </IconButton>
          </Grid>
          <Grid item style={{ marginLeft: "auto", }}>
            <ButtonGroup>
              {endDate > new Date() && <Button
                onClick={resetDates}
                variant="outlined"
                color="secondary"
                startIcon={<SettingsBackupRestoreIcon />}
              >Reset</Button>}
              {save && <ColorButton
                onClick={updateUserDataItem}
                variant="outlined"
                startIcon={<SaveIcon />}
              >Save</ColorButton>}
            </ButtonGroup>
          </Grid>
        </Grid>
      </Paper>
    </div>
    </Slide>
  );
}



const mapStateToProps = state => {
  return {
    dataItem: state.user.dataItem,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateInfo: (value, name) => dispatch(actions.updateUserDataItemProperty(value, name)),
    onAddUserDataItemToState: (item) => dispatch(actions.addUserDataItemToState(item)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);