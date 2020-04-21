//喜欢  取消喜欢
import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import axios from '../utils/axios'
import { message } from 'antd'

function useLike({id = ''}) {
    const userId = useSelector(state => state.user.id)
    const [value, setValue] = useState([])
    useEffect(() => {
         const fetch = () => {
            axios.get(`/likes`).then(res => {
                setValue(res)
            })
         }
         userId && fetch()
    }, [id])

    const like = () => {
        axios.put(`/post/like/${id}`).then(res => {
            setValue([...value, res])
            message.success('关注成功')    
          })
    }

    const disLike = () => {
        axios.delete(`/post/like/${id}`).then(res => {
            /* setValue(res) */
            /* console.log(value.splice(value.findIndex(item => item === res), 1)) */
            //这里搞不懂为什么用splice不行呢
            setValue(value.filter(item => item !== res))
            message.success('取消成功')
          })
    }

    return {
        like, 
        disLike,
        value
    }
}

export default useLike
