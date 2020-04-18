import {useState, useEffect} from 'react'
import axios from '../utils/axios'
function useFetchData({url = '', dependence = null}) {
    const [dataList, setDataList] = useState([])
    const [loading, setLoading] = useState(false)
    const [pagination, setPagination] = useState({current: 2,defaultCurrent: 1, pageSize: 9, total: null})

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
    return ({
        dataList,
        setDataList,
        loading,
        pagination
    })
}

export default useFetchData
