import React, {useState} from 'react'
import moment from 'moment'


function Reply(props) {
    const [visible, setVisible] = useState(false)
    const {content, userId, replyTo, createdAt, commentId} = props

    
    function onClick(){
        setVisible(!visible)
    }
    
    return (
        <>
            <div className='reply'>
                <div className='reply-user'>
                    <span className='username'>{userId.username}</span> 回复 <span className='username'>{replyTo.username}</span>：
                    <div className="time">{moment(createdAt).fromNow()}</div>
                </div>
                <div className='content'>{content}</div>
                <div className='button' onClick={onClick}>回复</div>
            </div>
        </>
    )
}

export default Reply
