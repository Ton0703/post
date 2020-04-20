import React, {useState, useEffect} from 'react'
import moment from 'moment'
import { Avatar, Input, Button, message} from 'antd'
import axios from '../utils/axios'
import svg from '../public/svg'
import DeleteButton from '../component/DeleteButton'
import Reply from '../component/Reply'

function Comment(props) {
    const user = props.user
    const { TextArea } = Input
    
    const { content, createdAt, _id, userId, postId } = props
    const [visible, setVisible] = useState(false)
    const [value, setValue] = useState('')
    const [replyList, setReplyList] = useState([])

    useEffect(() => {
        axios.get(`/${_id}/reply`).then((res) => {
            setReplyList(res)
            console.log(res)
        })
    }, [props])
    

    function onClick(){
        setVisible(!visible)
    }
    function onSubmit(e){
        e.preventDefault()
        axios.post(`/${postId}/discuss`, {content: value, commentId: _id}).then(res => {
            setReplyList(res)
            setValue('')
            setVisible(false)
            message.success('回复成功')
        })

    }
    function onChange(value){
        setValue(value)
    }
    return (
        <>                       
            <div className='comment-item'>
                <div className="userInfo">
                    <div className="awatar">
                        <Avatar icon={svg.avatar} />
                    </div>
                    <div className="username">{userId.username}</div>
                </div>
                <div className="content-wrapper">
                    <div className="content">{content}</div>
                    <div className="time">{moment(createdAt).fromNow()}</div>
                    {userId && (
                        <div className='replyButton' onClick={onClick}>回复</div>
                    )}
                </div>
                { user && user === userId._id && (
                    <div className='delete'>
                        <DeleteButton id={_id} type='comment' callback={props.callback}/>
                    </div>
                )}
            </div>
            <div className={`reply-item  ${visible ? '' : 'visible'}`}>
                <TextArea row={2} value={value} onChange={e => onChange(e.target.value)}/>
                <Button type='primary' className='reply' onClick={onSubmit}>回复</Button>
            </div>       
            <div className="reply-list">
                {replyList && replyList.map((item, index) => {
                    return (
                        <Reply {...item} key={index} commentId={_id} postId={postId}/>
                    )
                })}
            </div>
        </>
    )
}

export default Comment
