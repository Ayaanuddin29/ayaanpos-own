import React, { useRef, useState } from 'react'
import Defaultlayout from '../components/Defaultlayout'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
import { useEffect } from 'react';
import { Button, Modal, Table } from 'antd';
import { EyeFilled } from '@ant-design/icons';
function Customer() {
  const componentRef = useRef();
  const [billsdata,setBillsdata]=useState([]);

  const dispatch=useDispatch();
  const getAllBills=()=>{
    dispatch({type:'showLoading'})
    axios.get('/api/bills/get-all-bills').then((response)=>{
      dispatch({type:'hiddeLoading'})
      const data=response.data;
      data.reverse((a,b)=>(a.createAt-b.createdAt))
      setBillsdata(response.data);
    }).catch(err=>{
      dispatch({type:'hiddeLoading'})
      console.log(err);
    })
  };


  const columns=[
    {
        title:'Customer',
        dataIndex:'customerName'
    },
    {
        title:'Phone Number',
        dataIndex:'customerPhoneNumber'
    },
    {
        title:'Created On',
        dataIndex:'createdAt',
        render:(value)=>
          <span>{value.toString().substring(0,10)}</span>
        
    }
]

  useEffect(()=>{
    getAllBills();
  },[])



 return (
    <Defaultlayout>
      <div className='d-flex justify-content-between'>
      <h3>Customers</h3>
  
      </div>
      <Table columns={columns} dataSource={billsdata} bordered/>
       
    </Defaultlayout>
  );
 }
  
export default Customer;