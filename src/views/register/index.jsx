import React from 'react'
import { Form, Input, Button } from 'antd'
import useForm from '../../hooks/useForm'
import { register } from '../../redux/user/action'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './index.scss'

function Register() {
    const { onChange, onSubmit, values } = useForm(registerUser, {       
        username:'',
        email:'',
        password:'',
        confirmPassword:''       
    })
    const dispatch = useDispatch()
    const history = useHistory()
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
    function registerUser(){
        dispatch(register(jump,values))
    }
    
    return (
        <div className='form-container'>
            <Form 
              {...Layout} 
              className='form'
              onFinish={onSubmit}
            >
                <Form.Item
                    label='Username'
                    name='username'
                    rules={[{ required: true, message: 'Please input your username!' }]}
                
                >
                    <Input name='username' onChange={onChange}/>
                </Form.Item>
                <Form.Item
                    label='Email'
                    name='email'
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input name='email' onChange={onChange} />
                </Form.Item>
                <Form.Item
                    label='Password'
                    name='password'
                    rules={[{ required: true, message: 'Please input your passwors!' }]}
                >
                    <Input name='password' onChange={onChange} />
                </Form.Item>
                <Form.Item
                    label='Confirm Password'
                    name='confirmPassword'
                    rules={[{ required: true, message: 'Please confirm your password!' }]}
                >
                    <Input name='confirmPassword' onChange={onChange} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type='primary' htmlType='submit' >
                        REGISTER
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register
