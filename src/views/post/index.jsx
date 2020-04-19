import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import axios from '../../utils/axios'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Divider } from 'antd'
import moment from 'moment'
import Show from '../../component/showNum'
import svg from '../../public/svg'
import './index.scss'
import useLike from '../../hooks/useLike'

function Post(props) {
    const userId = useSelector(state => state.user.id)
    const postId = props.match.params.id
    const [post, setPost] = useState({
        username:'',
        content:'',
        createdAt: '',
        likeUser: []
    })
    const [loading, setLoading] = useState(false)
    const { username, content, createdAt, likeUser } = post
    useEffect(() => {
          const fetch = () => {
            axios.get(`/post/${postId}`).then(res => {
                setPost(res)
                setLoading(false)
            })
          }
          setLoading(true)
          fetch()
    },[postId])

    //判断用户是否喜欢这个帖子
    const likePost = likeUser.includes(userId)

    const { like, disLike, value } = useLike(likeUser, postId)
    
    useEffect(()=> {
        setPost({...post, likeUser: value})
        console.log(value)
    },[value])
    

    function onLike(e){
        e.preventDefault()
        likePost ? (
           disLike()
        ) : (
          like()
        )
    }
    return (
        <div className='post'>
           {loading? (
               <div>Loading</div>
           ) : (
               <>
                    <div className="post-wrapper">
                        <div className="avatar-wrapper">
                            <Avatar size={100} icon={svg.avatar} />
                        </div>
                    <div className="content-wrapper">           
                        <div className="username">{username}</div>
                        <div className="time">发布于 {moment(createdAt).fromNow()}</div>
                        <div className='content'>{content}</div>
                        <div>
                            <Show svg={likePost ? svg.like : svg.disLike} num={likeUser.length} onLike={onLike}/>
                        </div>
                    </div>
                    </div>
                    <div className="comment-wrapper"></div>
               </>
           )}
        </div>
    )
}

export default Post
