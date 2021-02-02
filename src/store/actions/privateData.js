
import * as actionTypes from "./actionTypes";

export const fetchPrivateDataSuccess = privateData => {
    return {
      type: actionTypes.FETCH_PRIVATE_DATA_SUCCESS,
      privateData: privateData
    };
  };
  
  export const fetchPrivateDataFail = error => {
    return {
      type: actionTypes.FETCH_PRIVATE_DATA_FAIL,
      error: error
    };
  };
  
  export const fetchPrivateDataStart = () => {
    return {
      type: actionTypes.FETCH_PRIVATE_DATA_START
    };
  };
  
  export const fetchPrivateData = (token, userId) => {
    return {
      type: actionTypes.FETCH_PRIVATE_DATA,
      token: token,
      userId: userId
    };
  };
  