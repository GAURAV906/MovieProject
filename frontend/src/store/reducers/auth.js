import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utilities';

const initialState = {
    token: null,
    error: false,
    loading: false,
}

const authStart =( state, action )=>{
    return updateObject(state, {
        error: null,
        loading: true
    })
}

const authSucess =( state, action )=>{
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: false
    })
}

const authFailure =( state, action )=>{
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const authLogout =(state, action) =>{
    return updateObject(state, {
        token: null
    })
}

const reducer=(state=initialState, action)=>{
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCESS: return authSucess(state, action);
        case actionTypes.AUTH_FALIURE: return authFailure(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default:
            return state;
    }
}

export default reducer;