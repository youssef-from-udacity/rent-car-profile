import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    defaultData: [],
    error: false,
    loading: false,
};

const setDefaultData = (state, action) => {
    return updateObject( state, {
        defaultData: action.defaultData,
        error: false,
    } );
};

const fetchDefaultDataFailed = (state, action) => {
    return updateObject( state, { error: action.error, loading: false } );
};

const postDefaultDataStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const postDefaultDataSuccess = ( state, action ) => {
    return updateObject( state, {
        loading: false,
    } );
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_DEFAULT_DATA: return setDefaultData(state, action);    
        case actionTypes.FETCH_DEFAULT_DATA_FAILED: return fetchDefaultDataFailed(state, action);
        case actionTypes.POST_DEFAULT_DATA_START: return postDefaultDataStart( state, action );
        case actionTypes.POST_DEFAULT_DATA_SUCCESS: return postDefaultDataSuccess( state, action )

        default: return state;
    }
};

export default reducer;