import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types';

export default function(state ={}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess : action.payload} //백엔드의 data를 action.payload로 가져옴
          
        case REGISTER_USER : 
            return {...state, registerSuccess : action.payload}

        case AUTH_USER : 
            return {...state, userData : action.payload} //action.payload 모든 user데이터 들어있음
          
        
        default:
            return state;
    }
}