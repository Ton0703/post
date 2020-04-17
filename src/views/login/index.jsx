import React from 'react'
import { Form, Input, Button } from 'antd'
import useForm from '../../hooks/useForm'
import { login } from '../../redux/user/action'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

function Login() {
    const dispatch = useDispatch()
    const history = useHistory()
    const {onSubmit, onChange, values } = useForm(loginUser, {
        username:'',
        password:''
    })
    const Layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16}
    }
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };
    function jump(){
         history.push('/')
    }
    function loginUser(){
        dispatch(login(jump, values))
    }
    return (
        <div className='form-container'>
            <Form 
                className='form'
                onFinish={onSubmit}
                {...Layout}
            >
                <Form.Item
                  label='Username'
                  name='username'
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                     <Input name='username' onChange={onChange} />
                </Form.Item>
                <Form.Item
                   label="Password"
                   name="password"
                   rules={[{ required: true, message: 'Please input your password!' }]}
                >
                      <Input.Password name='password' onChange={onChange} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type='primary' htmlType='submit'>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login
