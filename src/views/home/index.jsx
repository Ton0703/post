import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { Pagination } from 'antd'
import './index.scss'
import PostCard from '../../component/PostCard'
import UserPost from '../../component/UserPost'
import axios from '../../utils/axios'

function Home() {   
    const [dataList, setDataList] = useState([])
    const [loading, setLoading] = useState(false)
    
    const location = useLocation()
    const history = useHistory()

    const [pagination, setPagination] = useState({current: 1, pageSize: 9, total: null})

    useEffect(() => {
        const fetch = () => {
            axios.get(`/post${location.search}`).then(res => {
                console.log(res)
                setDataList(res.post)
                setPagination({...pagination, total: res.total, current: res.current})
                setLoading(false)
            })
        }
        setLoading(true)
        fetch()
    }, [location])
    
    const username = useSelector(state => state.user.username)
    function setPost(list){
          setDataList(list)
    }
    
    const onChange = useCallback(
        (page) => {
            const url = `/?page=${page}`
            history.push(url)
        },
        []
    )
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
                                <PostCard data={item} />
                            </div>
                        )
                    })}
                </div>
                )
            }
            <Pagination {...pagination} onChange={onChange} />
        </div>
        )
    }
export default Home