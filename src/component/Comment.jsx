import React, { useState } from 'react'
import moment from 'moment'
import { Avatar, Input, Button, message} from 'antd'
import svg from '../public/svg'
import DeleteButton from '../component/DeleteButton'
import Reply from '../component/Reply'

import useFetchReply from '../hooks/useFetchReply'

function Comment(props) {
    const user = props.user
    const { TextArea } = Input
    
    const { content, createdAt, _id, userId, postId } = props
    const [visible, setVisible] = useState(false)

    const { onChange, onSubmit, replyList, inputContent } = useFetchReply({postId, commentId: _id, callback }) 
    
    function callback(){
        setVisible(false)
        message.success('回复成功')
    }

    function onClick(){
        setVisible(!visible)
    }
    return (
        <>                       
            <div className='comment-item'>
                <div className="userInfo">
                    <div className="avatar">
                        <Avatar icon={svg.avatar} />
                    </div>
                    <div className="username">{userId.username}</div>
                </div>
                <div>
                    <div className="time">{moment(createdAt).fromNow()}</div>
                    {user && (
                        <div className='replyButton' onClick={onClick}>回复</div>
                    )}
                    </div>
                <div className="content-wrapper">
                    <div className="content">{content}</div>
                </div>
                {/* { user && user === userId._id && (
                    <div className='delete'>
                        <DeleteButton id={_id} type='comment' callback={props.callback}/>
                    </div>
                )} */}
            </div>
            <div className={`reply-item  ${visible ? '' : 'visible'}`}>
                <TextArea row={2} value={inputContent}  onChange={e => onChange(e.target.value)}/>
                <Button type='primary' className='reply' onClick={onSubmit}>回复</Button>
            </div>       
            <div className="reply-list">
                {replyList && replyList.map((item, index) => {
                    return (
                        <Reply {...item} key={index}  postId={postId} onChange={onChange} onSubmit={onSubmit} value={inputContent}/>
                    )
                })}
            </div>
        </>
    )
}

export default Comment
