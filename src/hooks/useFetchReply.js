import  {useState, useEffect} from 'react'
import axios from '../utils/axios'
import { message } from 'antd'

function useFetchReply({commentId = '', postId = '', callback}) {
    const [replyList, setReplyList] = useState([])
    const [content, setContent] = useState('')
    useEffect(() => {
       axios.get(`/api/${commentId}/reply`).then(res => {
           setReplyList(res)
       })
    }, [commentId])
    const onChange = (e) => {
       setContent(e)
    }
    const onSubmit = () => {
        if(content === ''){
            message.info('请输入完整内容')
        } else {
            axios.post(`/api/${postId}/discuss`, {commentId, content}).then(res => {
                console.log(res)
                setReplyList(res)
                if(callback) callback()
                setContent('')
            }) 
        }
    }
    return {
        onSubmit,
        onChange,
        replyList,
        inputContent : content
    }
}

export default useFetchReply
