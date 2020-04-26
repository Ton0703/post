import { get } from './storage'

export function getToken(){
    let token = ''
    const userInfo = get('userInfo')
    if(userInfo){
        token = 'Bearer ' + userInfo
    }

    return token

}
