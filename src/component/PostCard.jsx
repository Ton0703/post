import React, {useState}  from 'react'
import  { useHistory } from 'react-router-dom'
import { useSelector }  from 'react-redux'
import moment from 'moment'
import { Avatar, message } from 'antd'
import useLike from '../hooks/useLike'
import Show from './ClickButton'
import svg from '../public/svg'
import DeleteButton from '../component/DeleteButton'


function PostCard(props) {
    const user = useSelector(state => state.user)
   
    const history = useHistory()
    const { userId , avatar, createdAt, _id,  content } = props.data

    const { like, disLike, value } = useLike({id: _id})

    const likePost = value.includes(_id)
    
    function jumpUrl(){
         history.push(`/post/${_id}`)
    }
     
    function onClick(e){
        e.preventDefault()
        user.username ? (
            likePost ? (
               disLike()
            ) : (
                like()
            )
        )  : (
        message.info('请先登录！')
        )
    }
    return (      
        <div>
            <div className="userinfo" >
                <div className="left">
                    <div className="username">{userId.username}</div>
                    <div className="time">{moment(createdAt).fromNow()}</div>
                </div>
                <div className="right">
                    <div className="avatar">
                        {avatar? <img src={avatar} alt='' /> : <Avatar size={48} icon={svg.avatar} />}
                    </div>
                </div>
            </div>
            <div className="content"  onClick={jumpUrl}>
               <span>{content.substr(0, 40)}</span>
            </div>
            <div className='show-container'>
                <span>
                    <Show svg={likePost ? svg.like : svg.disLike} onLike={onClick}/>
                </span>
                {user && user.username === userId.username && (
                    <div className='delete'>
                        <DeleteButton id={_id} type='post' callback={props.deleteCallback}/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostCard