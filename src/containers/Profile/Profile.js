import React, { useState } from "react";
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from "../../store/actions/index.js";
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import ImageInput from '../ImageInput/ImageInput';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { NoSsr } from '@material-ui/core';
import clsx from 'clsx';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import PhoneEnabledOutlinedIcon from '@material-ui/icons/PhoneEnabledOutlined';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';

//import {cloneDeep} from 'lodash';
//import getDataObj from './obj';



const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    padding: theme.spacing(5, 0, 3, 0),
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 3, 3, 3),
    },
  },
  textField: {
    margin: theme.spacing(1, 0),
    width: '25ch',
    '& .Mui-focused svg': {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.up(394)]: {
      marginLeft: theme.spacing(2),
    },
  },
  disabledButton: {
    backgroundColor: theme.palette.primary.contrastText,
    position: "absolute",
    top: 0,
    transform: "translateY(-50%)",
    [theme.breakpoints.down('sm')]: {
      left: theme.spacing(2),
    },
  },
  imageContainer: {
    position: 'relative',
    display: "inline-block",
    marginLeft: "10px",
    marginBottom: "10px",
    maxWidth: "20em",
    width: "90%",
    height: 160,
    overflow: 'hidden',
    border: '10px solid transparent',
    [theme.breakpoints.up(590)]: {
      float: 'left',
    },
  },
  img: {
    width: '100%',
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  },
  fab: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: "5px",
  },
}));


/* 
const useStyles = makeStyles((theme) => ({

  root: {
    width: '80%',
    margin: 'auto'
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
  imageContainer: {
    position: 'relative',
    display: "inline-block",
    marginLeft: "10px",
    marginBottom: "10px",
    maxWidth: "20em",
    width: "90%",
    height: 160,
    overflow: 'hidden',
    border: '10px solid transparent',
    [theme.breakpoints.up(590)]: {
      float: 'left',
    },
  },
})); */

const handleChange = (value, name) => {
  /* const obj = cloneDeep(formData)
  obj[name].value = value
  const obj2 = {}
  Object.keys(obj).map((key) => obj2[key] = obj[key].value);
  setFormData(obj)
  clearTimeout(timer.current)
  timer.current = setTimeout(()=>props.onUpdateInfo(cloneDeep(obj2), 'information'),300) */
}

const Profile = (props) => {
  const classes = useStyles()
  const [formData, setFormData] = useState();




  return (
    <div className={classes.root}>
      <Box color="text.secondary">
        <Typography variant='h4'>Profile</Typography>
      </Box>
      <Divider />

      <div className={clsx('clearfix', classes.root)}>


        <div>
          <Paper className={classes.imageContainer} elevation={3}>
            <ButtonBase style={{ position: 'static', width: '100%', height: '100%' }}>
              <ImageInput
                name='avatarURL'
                maxHeight={330}
                avatarURL=""
                fileChange={handleChange}
                style={{ display: 'block' }}
              />
            </ButtonBase>
          </Paper>

          <NoSsr>
            <TextField
              className={classes.textField}
              id="last-name-input"
              label="nom"
              value=""
              onChange={(event) => handleChange(event.target.value, 'name')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBoxIcon />
                  </InputAdornment>
                )
              }}
            />
          </NoSsr>
          <NoSsr>
            <TextField
              className={classes.textField}
              id="first-name-input"
              label="prénom"
              value=""
              onChange={(event) => handleChange(event.target.value, 'name')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBoxOutlinedIcon />
                  </InputAdornment>
                )
              }}
            />
          </NoSsr>
          <NoSsr>
            <TextField
              className={classes.textField}
              type="number"
              id="phone-input"
              label="Tél"
              value=""
              onChange={(event) => handleChange(event.target.value, 'name')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneEnabledOutlinedIcon />
                  </InputAdornment>
                )
              }}
            />
          </NoSsr>
          <NoSsr>
            <TextField
              className={classes.textField}
              id="Address-input"
              label="Addresse"
              value=""
              onChange={(event) => handleChange(event.target.value, 'name')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                )
              }}
            />
          </NoSsr>
          <NoSsr>
            <TextField
              className={classes.textField}
              type="email"
              id="Address-input"
              label="E-mail"
              value=""
              onChange={(event) => handleChange(event.target.value, 'name')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailIcon />
                  </InputAdornment>
                )
              }}
            />
          </NoSsr>
        </div>

      </div>

    </div>

  )

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
    onUpdateUserCard: (data) => dispatch(actions.updateUserCard(data)),
    onRemoveUserCard: (data) => dispatch(actions.removeUserCard(data)),
    onAddUserDataItemToState: (item) => dispatch(actions.addUserDataItemToState(item)),
    onPostUserData: (data, token, userId) => dispatch(actions.postUserData(data, token, userId)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);