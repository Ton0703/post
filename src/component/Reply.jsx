import React, {useState} from 'react'
import { Input, Button} from 'antd'
import moment from 'moment'


function Reply(props) {
    const [visible, setVisible] = useState(false)
    const {content, userId, replyTo, createdAt, onChange, onSubmit, value} = props
    const { TextArea } = Input
    
    

    function onClick(){
        setVisible(!visible)
    }
    function handleClick(){
        onSubmit()
        setVisible(false)
    }
    return (
        <>
            <div className='reply'>
                <div className='reply-user'>
                    <span className='username'>{userId.username}</span> 回复了 <span className='username'>{replyTo.username}</span>：
                    <div className="time">{moment(createdAt).fromNow()}</div>
                </div>
                <div className='reply-content'>{content}</div>
                <div className='button' onClick={onClick}>回复</div>
            </div>
            <div className={`reply-area ${ visible ? '' : 'visible'}`}>
                <TextArea rows={2} value={value} onChange={e => onChange(e.target.value.trim())}/>
                <Button type='primary' className='button' onClick={handleClick}>提交</Button>
            </div>
        </>
    )
}

export default Reply
