import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation} from 'react-router-dom'
import { Pagination } from 'antd'
import './index.scss'
import PostCard from '../../component/PostCard'
import UserPost from '../../component/UserPost'
import useFetchList from '../../hooks/useFetchData'
import axios from '../../utils/axios'

function Home() {      
    const location = useLocation()

    const { dataList ,setDataList, loading, pagination } = useFetchList({url: location.search, dependence: location.search})
       
    const username = useSelector(state => state.user.username)
    //add Post 的回调
    
    function setPost(list){
          setDataList(list)
    }
   
    function DeleteCallback(){
        axios.get(`/post${location.search}`).then(res => {
            setDataList(res.post)
        })
    }
    
    return (
        <div className='home'>
            {loading ? (
                <h1 className='loading'>Loading...</h1>
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
            {username ? (
                <UserPost  setPost={setPost}/>
            ) : (
                null
            )}
            <Pagination className='pagination' {...pagination}/>
        </div>
        )
    }
export default Home