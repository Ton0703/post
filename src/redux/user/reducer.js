import * as TYPES from '../types'
import { get, save, remove } from '../../utils/storage'
import decode from 'jwt-decode'

const initialState = {
    username: ''
}

if(get('userInfo')){
    const decodeToken = decode(get('userInfo'))
    if(decodeToken.exp * 1000 < Date.now()){
          remove('userInfo')
    } else {
        initialState.username = decodeToken.username
    }
}

export default function UserReducer(state = initialState, action){
    const { type, payload } = action
    switch(type){
        case TYPES.USER_LOGIN:
            save('userInfo', payload.token)
            return {...state, username: payload.username};
        case TYPES.USER_REGISTER:
            save('userInfo', payload.token)
            return {...state, username: payload.newUser.username};
        case TYPES.USER_LOGOUT:
            remove('userInfo')
            return {...state, username: ''}
        default:
            return state
    }
}