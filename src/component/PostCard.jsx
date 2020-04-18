import React, { useState, useEffect } from 'react'
import  { useHistory } from 'react-router-dom'
import { useSelector }  from 'react-redux'
import moment from 'moment'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Show from '../component/showNum'
import svg from '../public/svg'
import axios from '../utils/axios'
import DeleteButton from '../component/DeleteButton'


function PostCard(props) {
    const user = useSelector(state => state.user)
    const history = useHistory()
    const { username, avatar, createdAt, _id,  commentCount, content, likeUser } = props.data
    const [likes, setLikes ] = useState(likeUser)
    
    function jumpUrl(){
         history.push(`/post/${_id}`)
    }
    
    useEffect(() => {
      setLikes(likeUser)
    }, [likeUser])
     
    function onClick(e){
        e.preventDefault()
        likes.includes(user.id) ? (
             axios.delete(`/post/like/${_id}`).then(res => {
               setLikes(res)
             })
        ) : (
            axios.put(`/post/like/${_id}`).then(res => {
                setLikes([...likes, res])
            })
        )
    }
    const like = likes.includes(user.id)
    return (      
        <div>
            <div className="userinfo" >
                <div className="left">
                    <div className="username">{username}</div>
                    <div className="time">{moment(createdAt).fromNow()}</div>
                </div>
                <div className="right">
                    <div className="avatar">
                        {avatar? <img src={avatar} alt='' /> : <Avatar shape='square' size={48} icon={<UserOutlined />} />}
                    </div>
                </div>
            </div>
            <div className="content"  onClick={jumpUrl}>
               <span>{content}</span>
            </div>
            <div className='show-container'>
                <span>
                    <Show num={likes.length} svg={like? svg.like : svg.disLike} onLike={onClick}/>
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