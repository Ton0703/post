import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { Pagination } from 'antd'
import './index.scss'
import PostCard from '../../component/PostCard'
import UserPost from '../../component/UserPost'
import useFetchList from '../../hooks/useFetchData'
import axios from '../../utils/axios'

function Home() {   
    
    const location = useLocation()
    const history = useHistory()


    const { dataList,setDataList, loading, pagination } = useFetchList({url: location.search, dependence: location.search})
    
    
    const username = useSelector(state => state.user.username)
    //add Post 的回调
    function setPost(list){
          setDataList(list)
    }
    //页码跳转
    const onChange = useCallback(
        (page) => {
            const url = `/?page=${page}`
            history.push(url)
        },
        []
    )
    function DeleteCallback(){
        axios.get(`/post${location.search}`).then(res => {
            setDataList(res.post)
            console.log(res)
        })
    }
    
    return (
        <div className='home'>
            <div className="home-header">Recent Posts</div>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className='post-list'>
                    {dataList && dataList.map((item, index) => {
                        return (
                            <div className='post-item' key={index}>
                                <PostCard data={item} deleteCallback={DeleteCallback}/>
                            </div>
                        )
                    })}
                </div>
                )
            }
            <Pagination {...pagination} onChange={onChange} className='pagination'/>
            {username && <UserPost setPost={setPost}/>}
        </div>
        )
    }
export default Home