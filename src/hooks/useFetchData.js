import {useState, useEffect, useCallback} from 'react'
import { useHistory } from 'react-router-dom'
import axios from '../utils/axios'
function useFetchData({url = '', dependence = null}) {
    const [dataList, setDataList] = useState([])
    const [loading, setLoading] = useState(false)
    const [pagination, setPagination] = useState({current: 1, pageSize: 12, total: null})

    const history = useHistory()

    useEffect(() => {
        const fetch = () => {
            axios.get(`/post${url}`).then(res => {
                setDataList(res.post)
                setPagination({...pagination, total: res.total, current: parseInt(res.current) })
                setLoading(false)
            })
        }
        setLoading(true)
        fetch()
    }, [dependence])
    
    const onChange = useCallback(
        (page) => {
            document.documentElement.scrollTop = 0;
            const url = `/?page=${page}`
            history.push(url)
        },
        []
    )
    return ({
        dataList,
        setDataList,
        loading,
        pagination : {
            ...pagination,
            onChange : onChange
        }
    })
}

export default useFetchData
