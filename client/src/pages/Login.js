import { Col, Row, message } from 'antd'
import React, { useEffect } from 'react'
import Form from 'antd/es/form/Form'
import Input from 'antd/es/input/Input'
import {Button} from 'antd'
import '../resources/authentication.css'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Login() {
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const onFinish=(values)=>{
    dispatch({type:'show Loading'})
    axios.post('/api/users/login',values).then((res)=>{
    dispatch({type:'hide Loading'});  
      message.success('Login Successfull')
      localStorage.setItem('pos users',JSON.stringify(res.data));
      navigate('/home');
    }).catch(err=>{
      message.error('Invalid authentication')
    })
  }
  useEffect(()=>{
    if(localStorage.getItem('pos users')){
      navigate('/home')
    }
  })
  return (
    <div className='authentication'>
      <Row>
        <Col>
        <Form layout='vertical' className='hhh' onFinish={onFinish}>
        <b><h1>FreshMart</h1></b>
         <hr></hr>
          <h3>Login</h3>
          <Form.Item name='userid' label='User Id'>
            <Input placeholder='enter the userid'/>
          </Form.Item>
          <Form.Item name='password' label='Password'>
            <Input type='password' placeholder='enter the password'/>
          </Form.Item>
          <div className='d-flex justify-content-between'>
          <Link to='/register'>Not Yet Login ? click here to register</Link>
            <Button htmlType='submit' className='btn-primary ml-5'>Login</Button>
          </div>
        </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Login