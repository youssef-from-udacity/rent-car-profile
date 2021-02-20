import React, { useEffect, useState, useRef, useCallback } from "react";
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '../dialog/dialog'
import Card from '../Card/Card';
import * as actions from "../../store/actions/index.js";
import cloneDeep from 'lodash.clonedeep';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import getDataObj from './obj';


const useStyles = makeStyles((theme) => ({

  fab: {
    position: 'absolute',
    left: '10px',
    top: '-26px',
    zIndex: 9,
    [theme.breakpoints.up(600)]: {
      top: '-64px',
      left: 'calc(50% - 250px)',
    }
  }
}));


const Cards = (props) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false);
  const [waitForDataItem, setWaitForDataItem] = useState()
  const [fetchDataObj, setFetchDataObj] = useState({})
  const [scrollToElement, setScrollToElement] = useState()
  const [elementsToRender, setElementsToRender] = useState([])
  const myRef = useRef(null)

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
      userId: obj.userId,
      url: obj.userId + '/' + obj.id + '/'
    }
    props.onUpdateUserCard(data)
    closeDialog()
  }

  const removeUserData = () => {
    if (!waitForDataItem) {
      setWaitForDataItem(true)
      return;
    }

    const obj = {}
    Object.keys(props.dataItem).map((key) => obj[key] = props.dataItem[key]);
    const data = {
      userData: obj,
      token: props.token,
      userId: obj.userId,
      url: obj.userId + '/' + obj.id + '/'
    }
    props.onRemoveUserCard(data)
    setWaitForDataItem(false)

  }

  const createUserDataItem = (e) => {
    e.preventDefault();
    const data = { ...fetchDataObj, userId: props.userId, id: Math.random().toString(36).substr(-8) }
    props.onCreateUserCard(data);
    setScrollToElement(true)
    setElementsToRender([...elementsToRender, data])
  }

  useEffect(() => {
      const cardElements = cloneDeep(props.userData);
      if(cardElements.length){
        setElementsToRender(cardElements)
      }
    return !Object.keys(fetchDataObj).length ? getDataObj().then(d => setFetchDataObj(d)) : null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userData])

  const scrollToElementCallBack = useCallback((e) => {
    if (scrollToElement) {
      myRef.current.scrollIntoView({ behavior: 'smooth' })
      setScrollToElement(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementsToRender])


  useEffect(() => {
    if (scrollToElement && myRef.current) {
      scrollToElementCallBack()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollToElementCallBack])

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    waitForDataItem ? removeUserData() : null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitForDataItem, props.dataItem])


  return (
    <>
      <div style={{
        position: 'relative',
      }}>
        <Fab className={classes.fab} color="secondary" aria-label="add" onClick={createUserDataItem}>
          <AddIcon />
        </Fab>
      </div>
      {
        elementsToRender.map((item) => {
          return (<Card
            key={item.id}
            item={item}
            open={openDialog}
            updateUserData={updateUserData}
            removeUserData={removeUserData}
          />)
        })
      }
        <Dialog open={open} close={closeDialog} updateUserData={updateUserData} />

      <div ref={myRef} style={{ height: 300 }}></div>
    </>

  );

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
    onCreateUserCard: (data) => dispatch(actions.createUserCard(data)),
    onUpdateUserCard: (data) => dispatch(actions.updateUserCard(data)),
    onRemoveUserCard: (data) => dispatch(actions.removeUserCard(data)),
    onAddUserDataItemToState: (item) => dispatch(actions.addUserDataItemToState(item)),
    onPostUserData: (data, token, userId) => dispatch(actions.postUserData(data, token, userId)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);