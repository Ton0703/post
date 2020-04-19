import React, { useState, useEffect } from 'react'
import  { useHistory } from 'react-router-dom'
import { useSelector }  from 'react-redux'
import moment from 'moment'
import { Avatar } from 'antd'
import useLike from '../hooks/useLike'
import Show from './ClickButton'
import svg from '../public/svg'
import DeleteButton from '../component/DeleteButton'


function PostCard(props) {
    const user = useSelector(state => state.user)
    const history = useHistory()
    const { username, avatar, createdAt, _id,   content, likeUser } = props.data
    const [likes, setLikes ] = useState(likeUser)
    const { like, disLike, value } = useLike(likes, _id)
    
    function jumpUrl(){
         history.push(`/post/${_id}`)
    }

    useEffect(() => {
        setLikes(likeUser)
      }, [likeUser])


    useEffect(() => {
      setLikes(value)
    }, [value])
     
    function onClick(e){
        e.preventDefault()
        likePost ? (
            disLike()
        ) : (
            like()
        )
    }
    const likePost = likes.includes(user.id)
    return (      
        <div>
            <div className="userinfo" >
                <div className="left">
                    <div className="username">{username}</div>
                    <div className="time">{moment(createdAt).fromNow()}</div>
                </div>
                <div className="right">
                    <div className="avatar">
                        {avatar? <img src={avatar} alt='' /> : <Avatar size={48} icon={svg.avatar} />}
                    </div>
                </div>
            </div>
            <div className="content"  onClick={jumpUrl}>
               <span>{content}</span>
            </div>
            <div className='show-container'>
                <span>
                    <Show num={likes.length} svg={likePost ? svg.like : svg.disLike} onLike={onClick}/>
                </span>
                {user && user.username === username && (
                    <div className='delete'>
                        <DeleteButton id={_id} type='post' callback={props.deleteCallback}/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostCard