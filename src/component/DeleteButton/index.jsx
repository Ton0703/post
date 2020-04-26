import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import axios from '../../utils/axios'
import './index.scss'

function DeleteButton({id, type, callback}) {
    const [visible, setVisible] = useState(false)
    function changeVisible(){
        setVisible(!visible)
    }
    function deleteItem(){
        axios.delete(`/api/${type}/${id}`).then(
           (res) => {
               setVisible(false)
               if( callback )  callback(res) 
           }
        )
    }
    return (
        <div>
            <Button type='danger' onClick={changeVisible} className='deleteButton'>删除</Button>
            <Modal visible={visible} onCancel={changeVisible} onOk={deleteItem}>
                <p>确认删除？</p>
            </Modal>
        </div>
    )
}

export default DeleteButton
