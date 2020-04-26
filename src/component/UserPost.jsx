import React, {useState} from 'react'
import { Input, Button, message } from 'antd'
import axios from '../utils/axios'





function UserPost(props) {
    const { TextArea } = Input
    const [ post, setPost ] = useState({content:''})
    const onChange = (e) => {
        setPost({...post, content: e.target.value.trim()})
    }
    function onClick(){       
        if(post.content === ''){
            message.info('请输入完整内容')
        } else {
        axios.post('/api/post', post).then(res => {
            setPost({content: ''})
            props.setPost(res)
            document.documentElement.scrollTop = 0
        })   
    }  
    }
    return (
        <div className='user-post'>
            <TextArea value={post.content} onChange={onChange} rows={1} className='textInput' placeholder='请输入内容'/>
            <Button type='primary' onClick={onClick} className='submitBut'>提交</Button>
        </div>
    )
}

export default UserPost
