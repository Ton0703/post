//喜欢  取消喜欢
import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import axios from '../utils/axios'

function useLike(id) {
    const userId = useSelector(state => state.user._id)
    const [value, setValue] = useState([])
    useEffect(() => {
         axios.get(`/likes`).then(res => {
             setValue(res)
         })
    }, [id])
    const like = () => {
        axios.put(`/post/like/${id}`).then(res => {
            setValue([...value, res])       
          })
    }

    const disLike = () => {
        axios.delete(`/post/like/${id}`).then(res => {
            /* setValue(res) */
            /* console.log(value.splice(value.findIndex(item => item === res), 1)) */
            //这里搞不懂为什么用splice不行呢
            setValue(value.filter(item => item !== res))
          })
    }

    return {
        like, 
        disLike,
        value
    }
}

export default useLike
