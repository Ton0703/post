import React, {useEffect, useState} from 'react'
import axios from '../../utils/axios'

function Post(props) {
    const postId = props.match.params.id
    const [post, setPost] = useState({})
    useEffect(() => {
          axios.get(`/post/${postId}`).then(res => {
              setPost(res)
              console.log(res)
          })
    },[postId])
    return (
        <div className='post'>
            {props.match.params.id}
        </div>
    )
}

export default Post
