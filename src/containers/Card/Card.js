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
import {cloneDeep} from 'lodash';
import { updateObject } from '../../shared/utility';
import Badge from '@material-ui/core/Badge';


//import get from 'lodash/get';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "auto",
    maxWidth: 500,
  },
  paper: {
    padding: theme.spacing(2),
    margin: '20px 5px',
  },
  image: {
    width: "100%",
    maxHeight: 300,
    overflow: "hidden",
  },
  img: {
    maxHeight: 300,
    maxWidth: '100%',
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
  const [checked, setChecked] = useState(false);
  const [notification, setNotification] = useState([]);

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

  useEffect(() => {
    const ElementItem = cloneDeep(props.item);
    const arrElements = []
      if (ElementItem.insurance.reminder.switchKey &&ElementItem.insurance.reminder.value < (new Date()).getTime()) {
        const tab =ElementItem.insurance.reminder.tab
        const panel =ElementItem.insurance.reminder.panel
        const type =ElementItem.insurance.reminder.type
        const path = 'insurance.reminder'
        const element = updateObject(ElementItem, { notification: {tab, panel, type, path} })
        arrElements.push(element)
      }
     ElementItem.maintenance.forEach((arr, i) => {
        if ( arr[arr.length - 1].switchKey && arr[arr.length - 1].value < (new Date()).getTime()) {
          const tab = arr[arr.length - 1].tab
          const type = arr[arr.length - 1].type
          const path = `maintenance[${i}][${arr.length - 1}]`
          const element = updateObject(ElementItem, { notification: {tab, type, path} })
          arrElements.push(element)
        }
        
      } )
    setNotification(arrElements)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.item])
  return (
    <Slide direction="right" in={checked} mountOnEnter unmountOnExit>

    <div className={classes.root}>
      <Paper elevation={4} className={classes.paper}>
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
              {notification.length ? <IconButton aria-label={`show ${notification.length} new notifications`} color="inherit" onClick={() => props.open(notification[0])}>
                                        <Badge badgeContent={notification.length} color="secondary">
                                            <NotificationsIcon />
                                        </Badge>
                                    </IconButton> : null}
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