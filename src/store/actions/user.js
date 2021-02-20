
import * as actionTypes from "./actionTypes";

export const createUserCard = (data) => {
  return {
    type: actionTypes.CREATE_USER_CARD,
    data: data
  };
};

export const removeUserCard = ({ userData, token, userId, url }) => {
  return {
    type: actionTypes.REMOVE_USER_CARD,
    userData,
    token,
    userId,
    url,
  };
};

export const removeUserCardStart = () => {
  return {
    type: actionTypes.REMOVE_USER_CARD_START
  };
};

export const removeUserCardSuccess = () => {
  return {
    type: actionTypes.REMOVE_USER_CARD_SUCCESS,
  };
};

export const removeUserCardFailed = error => {
  return {
    type: actionTypes.REMOVE_USER_CARD_FAILED,
    error: error
  };
};

export const updateUserDataItemProperty = (value, name) => {
  return {
    type: actionTypes.UPDATE_USER_ITEM_DATA_PROPERTY,
    name: name,
    value: value,
  };
};
export const addUserDataItem = dataItem => {
  return {
    type: actionTypes.ADD_USER_DATA_ITEM,
    dataItem: dataItem
  };
};
export const addUserDataItemToState = dataItem => {
  return {
    type: actionTypes.ADD_USER_DATA_ITEM_TO_STATE,
    dataItem: dataItem
  };
};
export const fetchUserDataSuccess = userData => {
  return {
    type: actionTypes.FETCH_USER_DATA_SUCCESS,
    userData: userData
  };
};

export const fetchUserDataFail = error => {
  return {
    type: actionTypes.FETCH_USER_DATA_FAIL,
    error: error
  };
};

export const fetchUserDataStart = () => {
  return {
    type: actionTypes.FETCH_USER_DATA_START
  };
};

export const fetchUserData = (token, userId) => {
  return {
    type: actionTypes.FETCH_USER_DATA,
    token: token,
    userId: userId
  };
};

export const postUserData = (userData, token, userId = null) => {
  return {
    type: actionTypes.POST_USER_DATA,
    userData: userData,
    token: token,
    userId: userId,
  };
};

export const postUserDataStart = () => {
  return {
    type: actionTypes.POST_USER_DATA_START
  };
};

export const postUserDataSuccess = () => {
  return {
    type: actionTypes.POST_USER_DATA_SUCCESS,
  };
};

export const postUserDataFailed = error => {
  return {
    type: actionTypes.POST_USER_DATA_FAILED,
    error: error
  };
};

export const updateUserCard = ({ dataItem, token, userId, url }) => {
  return {
    type: actionTypes.UPDATE_USER_CARD,
    dataItem,
    token,
    userId,
    url,
  };
};

export const updateUserCardStart = (dataItem) => {
  return {
    type: actionTypes.UPDATE_USER_CARD_START,
    dataItem: dataItem,
  };
};

export const updateUserCardSuccess = () => {
  return {
    type: actionTypes.UPDATE_USER_CARD_SUCCESS,
  };
};

export const updateUserCardFailed = error => {
  return {
    type: actionTypes.UPDATE_USER_CARD_FAILED,
    error: error
  };
};