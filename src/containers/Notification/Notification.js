import React, { useEffect, useState } from "react";
import { cloneDeep } from 'lodash';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from "../../store/actions/index.js";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import { CarAvatar } from '../../components/UI/CustomIcons/CustomIcons';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '../dialog/dialog';
import { updateObject } from '../../shared/utility';
import LaunchIcon from '@material-ui/icons/Launch';
import DeleteIcon from '@material-ui/icons/Delete';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';








const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "5px auto",
    minHeight: '100vh',
    maxWidth: 500,
  },
  tabPanel: {
    padding: theme.spacing(5, 1, 1, 1),
    [theme.breakpoints.up(400)]: {
      padding: theme.spacing(5, 3, 3, 3),
    },
  },
  paper: {
    padding: theme.spacing(2, 1),
    margin: '15px 5px',
    maxWidth: 500,
    backgroundColor: '#e2e8f0',
    [theme.breakpoints.up(500)]: {
      padding: theme.spacing(2),
    },
  },
  image: {
    overflow: "hidden",
    borderRadius: "50%",
    border: "5px solid #4fdaf1",

    height: 60,
    width: 60,
    [theme.breakpoints.up(500)]: {
      height: 100,
      width: 100,
    },

  },
  img: {
    height: 50,
    [theme.breakpoints.up(500)]: {
      height: 100,
    },
  },
  notificationType: {
    fontSize: 16,
  },
  notificationTypeIcon: {
    margin: '5px 5px 5px -5px',
    verticalAlign: "bottom",
  }
}));



function Notification(props) {
  const classes = useStyles();
  const [elementsToRender, setElementsToRender] = useState([])
  const [open, setOpen] = useState(false);

  const openDialog = (item) => {
    props.onAddUserDataItemToState(item)
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };
  const updateUserData = () => {
    props.onAddUserDataItemToState()
    const obj = {}
    Object.keys(props.dataItem).map((key) => obj[key] = props.dataItem[key]);
    const data = {
      dataItem: obj,
      token: props.token,
      userId: props.userId,
      url: props.userId + '/' + obj.id + '/'
    }
    props.onUpdateUserCard(data)
    closeDialog()
  }

  const removeNotification = (item) => {
    const obj = cloneDeep(item)
    //obj.insurance.reminder.switch = false
    const objReference = get(obj, obj.notification.path)
    objReference.switchKey = false
    delete obj.notification

    const data = {
      dataItem: obj,
      token: props.token,
      userId: props.userId,
      url: props.userId + '/' + obj.id + '/'
    }
    props.onUpdateUserCard(data)
  }


  useEffect(() => {
    const cardElements = cloneDeep(props.userData);
    const arrElements = []
    cardElements.forEach((e) => {
      if (e.insurance.reminder.switchKey && e.insurance.reminder.value < (new Date()).getTime()) {
        const tab = e.insurance.reminder.tab
        const panel = e.insurance.reminder.panel
        const type = e.insurance.reminder.type
        const path = 'insurance.reminder'
        const element = updateObject(e, { notification: { tab, panel, type, path } })
        arrElements.push(element)
      }
      e.maintenance.forEach((arr, i) => {
        if (arr[arr.length - 1].switchKey && arr[arr.length - 1].value < (new Date()).getTime()) {
          const tab = arr[arr.length - 1].tab
          const type = arr[arr.length - 1].type
          const path = `maintenance[${i}][${arr.length - 1}]`
          const element = updateObject(e, { notification: { tab, type, path } })
          arrElements.push(element)
        }

      })
    })
    setElementsToRender(arrElements)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userData])

  return (<div className={classes.root}>{
    elementsToRender.map((element) => {
      return (<Paper elevation={4} className={classes.paper} key={Math.random().toString(36).substr(-8)}>
        <Grid container spacing={2}>
          <Grid xs={3} item style={{ alignSelf: 'center', textAlign: 'center' }}>
            <ButtonBase className={classes.image}>
              {element.information?.avatarURL ? <img className={classes.img} alt="complex" src={element.information.avatarURL} /> :
                <CarAvatar />}
            </ButtonBase>
          </Grid>
          <Grid item xs={9} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  <strong className={classes.notificationType}>
                    <NotificationImportantIcon className={classes.notificationTypeIcon} />
                    {element.notification.type}</strong>
                </Typography>

                <Typography variant="body2" color="textSecondary">
                  <span>Plate: </span>
                  <strong>
                    {element.information.plate}
                  </strong>
                </Typography>
              </Grid>
              <Grid item>

              </Grid>
            </Grid>
            <Grid item style={{ display: "flex", justifyContent: "space-between", flexDirection: "column", }}>
              <IconButton variant="outlined" onClick={() => removeNotification(element)}>
                <DeleteIcon />
              </IconButton>
              <IconButton variant="outlined" style={{color: '#2bb8d0'}} onClick={() => openDialog(element)}>
                <LaunchIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Paper>)
    })
  }
    <Dialog open={open} close={closeDialog} updateUserData={updateUserData} />

  </div>)

}

const mapStateToProps = state => {
  return {
    defaultData: state.defaultData.defaultData,
    dataItem: state.user.dataItem,
    userData: state.user.userData,
    token: state.auth.token,
    userId: state.auth.userId,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateInfo: (value, name) => dispatch(actions.updateUserDataItemProperty(value, name)),
    onStartRendering: () => dispatch(actions.triggerLoadingToTrue()),
    onFinishRendering: () => dispatch(actions.triggerLoadingToFalse()),

    onUpdateUserCard: (data) => dispatch(actions.updateUserCard(data)),
    //onRemoveUserCard: (data) => dispatch(actions.removeUserCard(data)),
    onAddUserDataItemToState: (item) => dispatch(actions.addUserDataItemToState(item)),
    //onPostUserData: (data, token, userId) => dispatch(actions.postUserData(data, token, userId)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);