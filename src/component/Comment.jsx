import React, {useState, useEffect} from 'react'
import moment from 'moment'
import { Avatar, Input, Button, message  } from 'antd'
import svg from '../public/svg'
import axios from '../utils/axios'
import DeleteButton from '../component/DeleteButton'

function Comment(props) {
    const postId = props.postId
    const userId = props.userId
    const { TextArea } = Input
    const [commentList, setCommentList] = useState([])
    const [input, setInput] = useState('')
  
    
    useEffect(() => {
       axios.get(`/${postId}/discuss`).then(res => {
           setCommentList(res.comment)
       }).catch(error => { console.log(error)})
    },[])
    function callback(value){
         setCommentList(value)
    }
    function onSubmit(e){
         e.preventDefault()
         axios.post(`/${postId}/discuss`, {content: input}).then(res => {
             setCommentList(res)
             setInput('')
             message.success('评论成功')
             document.documentElement.scrollTop = 0
         })
    }
    function onChange(e){
        setInput(e)
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
            {userId && (
                <div className='comment-input'>
                    <TextArea row={4} onChange={e => onChange(e.target.value)} value={input} />
                    <Button type='primary' className='submit' onClick={onSubmit} >提交</Button>
                </div>
            )}
        </div>
    )
}

export default Comment
