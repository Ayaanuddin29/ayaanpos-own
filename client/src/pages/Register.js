import React, { useEffect } from 'react'
import Form from 'antd/es/form/Form'
import Input from 'antd/es/input/Input'
import { Button, Col, Row,message} from 'antd'
import axios from 'axios'
import '../resources/authentication.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Register() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
    const onFinish=(values)=>{
      dispatch({type:'show Loading'})
          axios.post('/api/users/register',values).then((res)=>{
           dispatch({type:'hidde Loading'})
            message.success('Registration Successfull wait for verification')
          }).catch(err=>{
            dispatch({type:'hidde Loading'})
            message.error('something went wrong')
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
        <Col lg={8} xs={22}>
        <Form layout='vertical' className='hhh' onFinish={onFinish}>
         <b><h1>FreshMart</h1></b>
         <hr></hr>
          <h3>Register</h3><Form.Item name='name' label='Name'>
            <Input placeholder='enter the name'/>
          </Form.Item>
          <Form.Item name='userid' label='User Id'>
            <Input placeholder='enter the userid'/>
          </Form.Item>
          <Form.Item name='password' label='Password'>
            <Input type='password' placeholder='enter the password'/>
          </Form.Item>
          
          <div className='d-flex justify-content-between'>
            <Link to='/login'>Already Registered ? click here to login</Link>
            <Button htmlType='submit' className='btn-primary'>Register</Button>
          </div>
        </Form>
        </Col>
       </Row>
    </div>
  )
}

export default Register