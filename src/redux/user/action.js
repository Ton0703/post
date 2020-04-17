import axios from '../../utils/axios'
import * as TYPES from '../types'
import { message } from 'antd'



export function register(callback,userinfo){
    return dispatch => {
        axios.post('/register', userinfo).then(res => {
            dispatch({
                type: TYPES.USER_REGISTER,
                payload: res
            })
            message.success(`注册成功，欢迎你${res.username}`)
            callback()
        })
    }
}
export function login(callback, userinfo){
    return dispatch => {
        axios.post('/login', userinfo).then(res => {
            dispatch({
                type: TYPES.USER_LOGIN,
                payload: res
            })
        })
        callback()
    }
}
export function logout(){
    return dispatch => {
        dispatch({
            type: TYPES.USER_LOGOUT
        })
    }
}