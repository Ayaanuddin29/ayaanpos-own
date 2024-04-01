import React, { useState } from 'react'
import Defaultlayout from '../components/Defaultlayout'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import {DeleteOutlined,EditOutlined} from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table } from 'antd';
import { message } from 'antd';
function Items() {
  const [itemsdata,setItemsdata]=useState([]);
  const [addEditModelVisibilty,setAddEditModelVisibilty]=useState(false)
  const [editingItems,setEditingItems]=useState(null);
  const dispatch=useDispatch();
  const getAllItems=()=>{
    dispatch({type:'showLoading'})
    axios.get('/api/items/get-all-items').then((response)=>{
      dispatch({type:'hiddeLoading'})
      setItemsdata(response.data);
    }).catch(err=>{
      dispatch({type:'hiddeLoading'})
      console.log(err);
    })
  };
  const deleteItem=(record)=>{
    dispatch({type:'showLoading'})
  axios.post('/api/items/delete-item',{itemId:record._id}).then((response)=>{
    dispatch({type:'hiddeLoading'})
    message.success('Deleted Successfully')
    getAllItems();
  }).catch(err=>{
    dispatch({type:'hiddeLoading'})
    message.error('something went wrong')
    console.log(err);
  })
};

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
        title:'Category',
        dataIndex:'category'
    },
    {
        title:"Actions",
        dataIndex:"_id",
        render:(id,record)=><div className='d-flex'>
        <DeleteOutlined className='mx-2' onClick={()=>{
          deleteItem(record);
        }}/>
        <EditOutlined className='mx-2' onClick={()=>{
          setEditingItems(record);
          setAddEditModelVisibilty(true);
        }}/>
        </div>
    }
]
  useEffect(()=>{
    getAllItems();
  },[])
  const onFinish=(values)=>{
    dispatch({type:'showLoading'})
   if(editingItems===null){
    axios.post('/api/items/add-item',values).then((response)=>{
      dispatch({type:'hiddeLoading'});
      message.success("Item added successfully")
      setAddEditModelVisibilty(false);
      getAllItems();
    }).catch(err=>{
      dispatch({type:'hiddeLoading'})
      message.error('something went wrong')
      console.log(err);
    })
  }
  else{
    axios.post('/api/items/edit-item',{...values,itemId:editingItems._id}).then((response)=>{
      dispatch({type:'hiddeLoading'});
      message.success("Item Edited successfully")
      setEditingItems(null)
      setAddEditModelVisibilty(false);
      getAllItems();
    }).catch(err=>{
      dispatch({type:'hiddeLoading'})
      message.error('something went wrong')
      console.log(err);
    })
  }
   }
   
 return (
    <Defaultlayout>
      <div className='d-flex justify-content-between'>
      <h3>Items</h3>
      <Button type='primary' onClick={()=>setAddEditModelVisibilty(true)}>Add Items</Button>
      </div>
      <Table columns={columns} dataSource={itemsdata} bordered/>
       {addEditModelVisibilty&&(
        <Modal onCancel={()=>{
        setEditingItems(null)
        setAddEditModelVisibilty(false)}} visible={addEditModelVisibilty} title={`${editingItems!==null?'Edit Item':'Add Item'}`} footer={false}>
        <Form layout='vertical' initialValues={editingItems} onFinish={onFinish}>
          <Form.Item name='name' label='Name'>
            <Input placeholder='enter the name'/>
          </Form.Item>
          <Form.Item name='price' label='Price'>
            <Input placeholder='enter the Price'/>
          </Form.Item>
          <Form.Item name='image' label='Image'>
            <Input placeholder='enter the Image URL'/>
          </Form.Item>
          <Form.Item name='category' label='Category'>
            <Select>
              <Select.Option values='vegetables'>Vegetables</Select.Option>
              <Select.Option value='fruits'>Fruits</Select.Option>
              <Select.Option value='Non-veg'>Non-Veg</Select.Option>
              <Select.Option value='grocery'>Grocery</Select.Option>
            </Select>
          </Form.Item>
          <div className='d-flex justify-content-end'>
            <Button htmlType='submit' className='btn-primary'>SAVE</Button>
          </div>
        </Form>
      </Modal>
       )}
    </Defaultlayout>
  );
 }
  
export default Items;