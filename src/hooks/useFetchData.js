import React, {useState, useEffect} from 'react'
import axios from '../utils/axios'
function useFetchData({url = ''}) {
    const [dataList, setDataList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetch = () => {
            axios.get(url).then(res => {
                setDataList(res)
                setLoading(false)
            })
        }
        setLoading(true)
        fetch()
    }, [])
    return ({
        dataList,
        loading
    })
}

export default useFetchData
