import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    userData: [],
    dataItem: {},
    loading: false,
};

const createUserCard = (state, action) => {
    const newUserData = [...state.userData]
    newUserData.push(action.data)
    return updateObject(state, { userData: newUserData });
};

const removeUserDataStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const removeUserDataSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
    });
};
const removeUserDataFailed = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};


const updateUserDataItemProperty = (state, action) => {
    const updatedProperty = updateObject(state["dataItem"], { [action.name]: action.value });
    return updateObject(state, { dataItem: updatedProperty });
};

const addUserDataItemToState = (state, action) => {
    return updateObject(state, { dataItem: action.dataItem });
};

const fetchUserDataStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchUserDataSuccess = (state, action) => {
    return updateObject(state, {
        userData: action.userData,
        loading: false
    });
};

const fetchUserDataFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const postUserDataStart = (state, action) => {

    return updateObject(state, { loading: true });
};

const postUserDataSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
    });
};
const postUserDataFailed = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const updateUserCardStart = (state, action) => {
    return updateObject(state, {
        loading: true,
    });
};

const updateUserCardSuccess = (state, action) => {  
    const newUserData = [...state.userData].map((element)=>{
        return element.id === action.dataItem.id? action.dataItem: element
    })
    return updateObject(state, { loading: false, userData: newUserData });
};

const updateUserCardFailed = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_DATA_START: return fetchUserDataStart(state, action);
        case actionTypes.FETCH_USER_DATA_SUCCESS: return fetchUserDataSuccess(state, action);
        case actionTypes.FETCH_USER_DATA_FAIL: return fetchUserDataFail(state, action);

        case actionTypes.POST_USER_DATA_START: return postUserDataStart(state, action);
        case actionTypes.POST_USER_DATA_SUCCESS: return postUserDataSuccess(state, action);
        case actionTypes.POST_USER_DATA_FAILED: return postUserDataFailed(state, action);
        
        case actionTypes.UPDATE_USER_CARD_START: return updateUserCardStart(state, action);
        case actionTypes.UPDATE_USER_CARD_SUCCESS: return updateUserCardSuccess(state, action);
        case actionTypes.UPDATE_USER_CARD_FAILED: return updateUserCardFailed(state, action);
        
        case actionTypes.REMOVE_USER_CARD_START: return removeUserDataStart(state, action);
        case actionTypes.REMOVE_USER_CARD_SUCCESS: return removeUserDataSuccess(state, action);
        case actionTypes.REMOVE_USER_CARD_FAILED: return removeUserDataFailed(state, action);

        case actionTypes.ADD_USER_DATA_ITEM_TO_STATE: return addUserDataItemToState(state, action);
        case actionTypes.UPDATE_USER_ITEM_DATA_PROPERTY: return updateUserDataItemProperty(state, action);

        case actionTypes.CREATE_USER_CARD: return createUserCard(state, action);
        default:
            return state;
    }
};

export default reducer;