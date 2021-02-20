import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    defaultData: [],
    error: false,
    loading: false,
};

const fetchDefaultDataSuccess = (state, action) => {
    return updateObject( state, {
        defaultData: action.defaultData,
        error: false,
        loading: false,
    } );
};

const fetchDefaultDataFail = (state, action) => {
    return updateObject( state, { error: action.error, loading: false } );
};

const fetchDefaultDataStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        
        case actionTypes.FETCH_DEFAULT_DATA_START: return fetchDefaultDataStart(state, action);
        case actionTypes.FETCH_DEFAULT_DATA_SUCCESS: return fetchDefaultDataSuccess(state, action);    
        case actionTypes.FETCH_DEFAULT_DATA_FAIL: return fetchDefaultDataFail(state, action);

        default:
             return state;
    }
};

export default reducer;