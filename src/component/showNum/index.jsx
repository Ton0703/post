import React from 'react'
import './index.scss'

function show(props) {
    const { svg, num } = props
    return (
        <div className='show'>
            <div className='svg'>
               {svg}
            </div>
            <div className="num">
                {num}
            </div>
        </div>
    )
}

export default show
