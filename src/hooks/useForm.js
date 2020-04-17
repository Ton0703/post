import { useState } from 'react'

function useForm(callback, initialState = {}){
        const [values, setValues] = useState(initialState)

        const onChange = (e) => {
            setValues({...values, [e.target.name]: e.target.value})
        }

        const onSubmit = (e) => {
            callback()
        }

        return {
            onChange,
            onSubmit,
            values
        }
}

export default useForm