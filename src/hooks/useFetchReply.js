import  {useState, useEffect} from 'react'
import axios from '../utils/axios'

function useFetchReply({commentId = '', postId = '', callback}) {
    const [replyList, setReplyList] = useState([])
    const [content, setContent] = useState('')
    useEffect(() => {
       axios.get(`/${commentId}/reply`).then(res => {
           setReplyList(res)
       })
    }, [commentId])
    const onChange = (e) => {
       setContent(e)
    }
    const onSubmit = () => {
        axios.post(`/${postId}/discuss`, {commentId, content}).then(res => {
            console.log(res)
            setReplyList(res)
            if(callback) callback()
            setContent('')
        }) 
    }
    return {
        onSubmit,
        onChange,
        replyList,
        inputContent : content
    }
}

export default useFetchReply
