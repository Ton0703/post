import React, {useState, useEffect} from 'react'
import moment from 'moment'
import { Avatar } from 'antd'
import svg from '../public/svg'
import axios from '../utils/axios'
import DeleteButton from '../component/DeleteButton'

function Comment(props) {
    const postId = props.postId
    const userId = props.userId
    const [commentList, setCommentList] = useState([])
  
    
    useEffect(() => {
       axios.get(`/${postId}/discuss`).then(res => {
           setCommentList(res.comment)
       })
    },[])
    function callback(value){
         setCommentList(value)
    }
    return (
        <div className='comment-list'>
            {commentList.map((item, index) => {
                return (
                    <div key={index} className='comment-item'>
                        <div className="userInfo">
                            <div className="awatar">
                                <Avatar icon={svg.avatar} />
                            </div>
                            <div className="username">{item.userId.username}</div>
                        </div>
                        <div className="content-wrapper">
                            <div className="content">{item.content}</div>
                            <div className="time">{moment(item.createdAt).fromNow()}</div>
                        </div>
                        { userId && userId === item.userId._id && (
                            <div className='delete'>
                                <DeleteButton id={item._id} type='comment' callback={callback}/>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default Comment
