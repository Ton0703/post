import React from 'react'
import moment from 'moment'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Show from '../component/showNum'
import svg from '../public/svg'


function PostCard(props) {
    const { username, avatar, createdAt, _id, likeCount , commentCount, content } = props.data
    return (
        <div>
            <div className="userinfo">
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
            <div className="content">
               <span>{content}</span>
            </div>
            <div className='show-container'>
               <span>
                  <Show num={111} svg={svg.like} />
               </span>
               <span>
                  <Show num={111} svg={svg.comment} />
               </span>
            </div>
        </div>
    )
}

export default PostCard