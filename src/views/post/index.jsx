import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import axios from '../../utils/axios'
import { Avatar } from 'antd'
import moment from 'moment'
import LikeButton from '../../component/ClickButton'
import DeleteButton from '../../component/DeleteButton'
import svg from '../../public/svg'
import './index.scss'
import useLike from '../../hooks/useLike'
import Comment from '../../component/Comment'

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
    },[value])
    

    function onLike(e){
        e.preventDefault()
        likePost ? (
           disLike()
        ) : (
          like()
        )
    }
    function callback(){
        props.history.push('/')
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
                            <div className="username">
                                <p>{username}</p>
                            </div>
                            <div className="time">发布于 {moment(createdAt).fromNow()}</div>
                            <div className='content'>{content}</div>
                            <div className='button'>
                                <div className='like'>
                                    <LikeButton svg={likePost ? svg.like : svg.disLike} num={likeUser.length} onLike={onLike}/>
                                </div>
                                <div className="delete">
                                    <DeleteButton id={postId} type='post' callback={callback}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="comment-wrapper">
                        <h4>评论列表</h4>
                        <Comment  postId={postId} userId={userId}/>
                    </div>
               </>
           )}
        </div>
    )
}

export default Post
