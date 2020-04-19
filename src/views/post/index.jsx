import React, {useEffect, useState} from 'react'
import axios from '../../utils/axios'
import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import moment from 'moment'
import './index.scss'

function Post(props) {
    const postId = props.match.params.id
    const [post, setPost] = useState({})
    useEffect(() => {
          axios.get(`/post/${postId}`).then(res => {
              setPost(res)
              console.log(res)
          })
    },[postId])
    const { likeUser, username, _id , createdAt, content } = post
    return (
        <div className='post'>
           <div className="post-wrapper">
               <div className="avatar-wrapper">
                   <Avatar shape='square' className='avatar' icon={<UserOutlined />} />
               </div>
               <div className="content-wrapper">
                   <div className="username">{username}</div>
                   <div className="time">{moment(createdAt).fromNow()}</div>
                   <h4>{content}</h4>
               </div>
           </div>
           <div className="comment-wrapper"></div>
        </div>
    )
}

export default Post
