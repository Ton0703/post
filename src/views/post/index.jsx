import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import axios from '../../utils/axios'
import { Avatar, Input, Button, message } from 'antd'
import moment from 'moment'
import LikeButton from '../../component/ClickButton'
import DeleteButton from '../../component/DeleteButton'
import svg from '../../public/svg'
import './index.scss'
import useLike from '../../hooks/useLike'
import Comment from '../../component/Comment'

function Post(props) {
    const user = useSelector(state => state.user.id)
    const postId = props.match.params.id
    const [post, setPost] = useState({
        userId:'',
        content:'',
        createdAt: ''
    })
    const { userId, content, createdAt } = post
    const { like, disLike, value } = useLike({id: postId})
    //判断用户是否喜欢这个帖子
    const likePost =value && value.includes(postId)
    
    const { TextArea } = Input
    const [commentList, setCommentList] = useState([])
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState('')

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
    
    //获取评论
    useEffect(() => {
        axios.get(`/${postId}/discuss`).then(res => {
            setCommentList(res)
        })
     },[postId])

    
    

    function onLike(e){
        e.preventDefault()
        user ?(
            likePost ? (
                disLike()
             ) : (
               like()
             )
        ) : (
            message.info('请先登陆！')
        )
    }
    function callback(){
        props.history.push('/')
    }
    function Callback(value){
        setCommentList(value)
        message.success('删除成功')
   }
    function onSubmit(e){
        e.preventDefault()
        if( input === ''){
            message.info('请输入内容')
        }  else {
            axios.post(`/${postId}/discuss`, {content: input}).then(res => {
                setCommentList(res)
                setInput('')
                message.success('评论成功')
                document.documentElement.scrollTop = 0
            })
        }
    }
    function onChange(e){
        setInput(e)
    }
    function jumpLogin(){
        props.history.push('/login')
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
                                {userId.username}
                            </div>
                            <div className="time">发布于 {moment(createdAt).fromNow()}</div>
                            <div className='content'>{content}</div>
                            <div className='button'>
                                <div className='like'>
                                    <LikeButton svg={likePost ? svg.like : svg.disLike} onLike={onLike}/>
                                </div>
                                {user && user === userId._id && (
                                    <DeleteButton type='post' id={postId} callback={callback} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='comment-area'>
                        {user ? (
                        <div className='comment-input'>
                            <TextArea row={4} onChange={e => onChange(e.target.value.trim())} value={input} />
                            <Button type='primary' className='submit' onClick={onSubmit} >提交</Button>
                        </div>
                        ): (
                            <div className='unLogin'>
                                请先<span onClick={jumpLogin}> 登录 </span>再进行评论！
                            </div>
                        )}
                    </div>
                    
                    <div className="comment-wrapper">
                        <h4>评论列表 （共 {commentList.length} 条）</h4>
                        <div className='comment-list'>
                        {commentList && commentList.map((item, index) => {
                            return (
                                <Comment callback={Callback} {...item} user={user} key={index}/>
                            )
                        })}
                        </div>
                    </div>
               </>
           )}
        </div>
    )
}

export default Post
