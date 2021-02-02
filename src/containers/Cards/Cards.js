import React, { createContext, useEffect, useContext } from "react";
import { connect } from 'react-redux';
import Dialog from '../../components/dialog/dialog'
import Card from '../../components/Card/Card';
import * as actions from "../../store/actions/index.js";


export const itemContext = createContext();

export function useCardContext() {
  return useContext(itemContext)
}
const Cards = (props) => {
  const [state, setState] = React.useState({
    open: false,
    item: {}
  });


  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    props.defaultData && !props.defaultData.length ? props.onInitDefaultData() : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openDialog = (item) => {

    setState({
      open: true,
      item: item
    });
  };

  const closeDialog = () => {
    setState({
      open: false,
      item: {}
    });
  };

  const cardElements = props.isAuthenticated ? [...props.privateData] : [...props.defaultData];
  return (
    <>
      {  cardElements.map(item => <Card key={item.id} item={item} open={openDialog} />)}
      <itemContext.Provider value={{ item: state.item }}>
        <Dialog open={state.open} close={closeDialog} />
      </itemContext.Provider>
    </>

  );

}

const mapStateToProps = state => {
  return {
    defaultData: state.defaultData.defaultData,
    privateData: state.privateData.privateData,
    isAuthenticated: state.auth.token !== null,

    //orders: state.order.orders,
    //loading: state.order.loading,
    //token: state.auth.token,
    //userId: state.auth.userId
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onInitDefaultData: () => dispatch(actions.initDefaultData()),

    //onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);