import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/user/action'

function Header() {
    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()
    const path = location.pathname === '/' ? 'home' : location.pathname.substr(1)
    
    const username = useSelector(state => state.user.username)

    function jumpUrl(url){
        history.push(url)
    }
    
    function logoutUser(){
        dispatch(logout())
    }
    return (
        <div className='header'>
            <div className='left'>                     
                <span  className={path === 'home' ? 'active home' : 'home'} onClick={() => jumpUrl('/')}>
                   {username? username : 'Home'}    
                </span>                   
            </div>
            <div className="right">
                {username ? 
                   <span className='nav' onClick={() => logoutUser()}>Logout</span> :
                   <>
                   <span className={path === 'login' ? 'active nav' : 'nav'} onClick={() => jumpUrl('/login')}>Login</span>
                   <span className={path === 'register' ? 'active nav' : 'nav'} onClick={() => jumpUrl('/register')}>Register</span>
                   </>
                 }
            </div>
        </div>
    )
}

export default Header
