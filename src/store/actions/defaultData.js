import * as actionTypes from './actionTypes';


export const fetchDefaultDataSuccess = ( defaultData ) => {
    return {
        type: actionTypes.FETCH_DEFAULT_DATA_SUCCESS,
        defaultData: defaultData
    };
};

export const fetchDefaultDataFail = () => {
    return {
        type: actionTypes.FETCH_DEFAULT_DATA_FAIL
    };
};
export const fetchDefaultDataStart = () => {
    return {
      type: actionTypes.FETCH_DEFAULT_DATA_START
    };
  };

export const fetchDefaultData = () => {
    return {
        type: actionTypes.FETCH_DEFAULT_DATA
    };
};
