import React from 'react'
import './index.scss'

function show(props) {
    const { svg } = props
    return (
        <div className='show'>
            <div className='svg' onClick={props.onLike}>
               {svg}
            </div>
        </div>
    )
}

export default show
