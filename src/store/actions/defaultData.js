import * as actionTypes from './actionTypes';


export const setDefaultData = ( defaultData ) => {
    return {
        type: actionTypes.SET_DEFAULT_DATA,
        defaultData: defaultData
    };
};

export const fetchDefaultDataFailed = () => {
    return {
        type: actionTypes.FETCH_DEFAULT_DATA_FAILED
    };
};

export const initDefaultData = () => {
    return {
        type: actionTypes.INIT_DEFAULT_DATA
    };
};

export const postDefaultData = (privateData, token, userId = null) => {
    return {
      type: actionTypes.POST_DEFAULT_DATA,
      privateData: privateData,
      token: token,
      userId: userId,
    };
  };

export const postDefaultDataStart = () => {
    return {
      type: actionTypes.POST_DEFAULT_DATA_START
    };
  };

  export const postDefaultDataSuccess = () => {
    return {
      type: actionTypes.POST_DEFAULT_DATA_SUCCESS,
    };
  };

  export const postDefaultDataFailed = error => {
    return {
      type: actionTypes.POST_DEFAULT_DATA_FAILED,
      error: error
    };
  };