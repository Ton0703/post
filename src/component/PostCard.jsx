import React, { useState } from 'react'
import  { useHistory } from 'react-router-dom'
import { useSelector }  from 'react-redux'
import moment from 'moment'
import { Avatar, Button } from 'antd'
import { UserOutlined, DeleteOutlined } from '@ant-design/icons'
import Show from '../component/showNum'
import svg from '../public/svg'
import axios from '../utils/axios'


function PostCard(props) {
    const user = useSelector(state => state.user)
    const history = useHistory()
    const { username, avatar, createdAt, _id,  commentCount, content, likeUser } = props.data
    const [likes, setLikes ] = useState(likeUser)
    function jumpUrl(){
         history.push(`/post/${_id}`)
    }
    function onDelete(e){
        e.preventDefault()
        axios.delete(`/post/${_id}`).then(res => {
            history.go(0)
        })
    }
    function onClick(e){
        e.preventDefault()
        likes.includes(user.id) ? (
             axios.delete(`/post/like/${_id}`).then(res => {
               setLikes(likes.splice(res, 1))
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
               <span>
                  <Show num={111} svg={svg.comment} />
               </span>
               { user && user.username === username && (
                   <Button type='primary' danger className='delete' onClick={onDelete} ><DeleteOutlined style={{fontSize: '18px', margin: 0}}/></Button>
               )}
            </div>
        </div>
    )
}

export default PostCard