import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    privateData: [],
    loading: false,
};

const fetchPrivateDataStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchPrivateDataSuccess = ( state, action ) => {
    return updateObject( state, {
        privateData: action.privateData,
        loading: false
    } );
};

const fetchPrivateDataFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_PRIVATE_DATA_START: return fetchPrivateDataStart( state, action );
        case actionTypes.FETCH_PRIVATE_DATA_SUCCESS: return fetchPrivateDataSuccess( state, action );
        case actionTypes.FETCH_PRIVATE_DATA_FAIL: return fetchPrivateDataFail( state, action );
        default: return state;
    }
};

export default reducer;