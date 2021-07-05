import {
    AUTH_USER,
    LOGOUT_USER
} from '../types';

const INITIAL_STATE = {
    isAuth: false,
    user: null,
    checkingAuth: false
}


export default function(state=INITIAL_STATE,action){
    switch(action.type){
        case AUTH_USER:
            return {...action.payload, checkingAuth:true}
        case LOGOUT_USER:
            return {...state, user:null, isAuth:false}
        default:
            return state;
    }
}