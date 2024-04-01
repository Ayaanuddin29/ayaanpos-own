import React, { useState } from 'react'
import Defaultlayout from '../components/Defaultlayout'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import axios from 'axios'
import { message } from 'antd';
import { Button, Input, Modal, Table } from 'antd';
import {Select,Form} from 'antd';
import {DeleteOutlined,PlusCircleOutlined,MinusCircleOutlined} from '@ant-design/icons';
function CartPages() {
    const {cartItems}=useSelector(state=>state.rootreducer)||{};
    const [billChargeModel,setBillChargeModel]=useState(false);
    const [subTotal,setSubTotal]=useState(0)
    const dispatch=useDispatch();
    const increaseQuantiy=(record)=>{
   dispatch({type:'updateCart',payload:{...record,quantity:record.quantity+1}})
    }
    const decreaseQuantity=(record)=>{
        if(record.quantity!==1){
        dispatch({type:'updateCart',payload:{...record,quantity:record.quantity+(-1)}})
        }
    }
  
    const columns=[
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title:'Image',
            dataIndex:'image',
            render:(image,record)=> <img src={image} height='60p' width='60px'/>
        },
        {
            title:'Price',
            dataIndex:'price'
        },
        {
            title:"Quantity",
            dataIndex:'_id',
            render:(id,record)=><div>
                <PlusCircleOutlined className='mx-3' onClick={()=>increaseQuantiy(record)}/>
                <b className='mb-2'>{record.quantity}</b>
                <MinusCircleOutlined className='mx-3' onClick={()=>decreaseQuantity(record)}/>
            </div>
        },
        {
            title:"Actions",
            dataIndex:"_id",
            render:(id,record)=><DeleteOutlined onClick={()=>dispatch({type:'deleteFromCart',payload:record})}/>
        }
    ]
    useEffect(()=>{
        let temp=0;
        cartItems.forEach((item)=>{
            temp=temp+item.price*item.quantity;
        })
        setSubTotal(temp)
    },[cartItems])
    const onFinish=(values)=>{
    const reqObject={
        ...values,
        subTotal,
        cartItems,
        tax:Number(((subTotal/100)*10).toFixed(2)),
        totalAmount:Number(subTotal+Number(((subTotal/100)*10).toFixed(2))),
        userid:JSON.parse(localStorage.getItem('pos users')),
    };
    axios
    .post('/api/bills/charge-bill',reqObject).then(()=>{
      message.success('Bill Charged Successfully');
     window.location.href='/bills'
    }).catch((err)=>{
      message.error('something went wrong');
    })
    }
  return (
    <Defaultlayout>
        <h1>Cart</h1>
        <Table columns={columns} dataSource={cartItems} bordered/>
     <hr></hr>
    <div className='d-flex justify-content-end flex-column align-items-end'>
    <div className='subtotal'>
      <h3><b>Sub Total:</b>{subTotal}$/-</h3>
    </div>
    <Button type='primary' onClick={()=>{
       setBillChargeModel(true)
    }}>CHARGE</Button>
    </div>
    <Modal title='chargeBill' open={billChargeModel} footer={false} onCancel={()=>{
        setBillChargeModel(false)
    }}>
    <Form layout='vertical'  onFinish={onFinish}>
          <Form.Item name='customerName' label='Customer Name'>
            <Input placeholder='enter the name'/>
          </Form.Item>
          <Form.Item name='customerPhoneNumber' label='Customer Phone Number'>
            <Input placeholder='enter the Phone number'/>
          </Form.Item>
          <Form.Item name='paymentMode' label='Payment Mode'>
            <Select>
              <Select.Option values='cash'>Cash</Select.Option>
              <Select.Option value='card'>Card</Select.Option>
            </Select>
          </Form.Item>
          <div className='charge-bill-amount'>
            <h4><b>SubTotal</b></h4>
                <h5>Tax:<b>{((subTotal / 100) * 10).toFixed(2)}</b></h5>
                <hr></hr>
                <h2>Grand Total:<b>{subTotal + (subTotal / 100) * 10}</b></h2>
          </div>
          <div className='d-flex justify-content-end'>
            <Button htmlType='submit' className='btn-primary'>Generate Bill</Button>
          </div>
        </Form> 
    </Modal>
    </Defaultlayout>
  )
}

export default CartPages