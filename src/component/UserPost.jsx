import React, {useState} from 'react'
import { Input, Button } from 'antd'
import axios from '../utils/axios'



function UserPost(props) {
    const [ post, setPost ] = useState({content:''})
    const onChange = (e) => {
        setPost({...post, content: e.target.value})
    }
    function onClick(){
        axios.post('/post', post).then(res => {
            setPost({content: ''})
            props.setPost(res)
        })
    }
    return (
        <div>
            <Input value={post.content} onChange={onChange}/>
            <Button type='primary' onClick={onClick}>提交</Button>
        </div>
    )
}

export default UserPost
