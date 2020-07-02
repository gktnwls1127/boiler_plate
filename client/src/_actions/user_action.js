import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types'

export function loginUser(dataTosubmit){

    const request = axios.post('/api/users/login', dataTosubmit) // server에서 받은 데이터 request 저장
        .then(response => response.data)

    return { //reducer로 return하기
        type : LOGIN_USER,
        payload : request
    }
}

export function registerUser(dataTosubmit){
    const request = axios.post('/api/users/register', dataTosubmit) // server에서 받은 데이터 request 저장
        .then(res => res.data)

    return { //reducer로 return하기
        type : REGISTER_USER,
        payload : request
    }
}


export function auth(){
    const request = axios.get('/api/users/auth') // server에서 받은 데이터 request 저장
        .then(res => res.data)

    return { //reducer로 return하기
        type : AUTH_USER,
        payload : request
    }
}
