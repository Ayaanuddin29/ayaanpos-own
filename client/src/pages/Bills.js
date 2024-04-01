import React, { useRef, useState } from 'react'
import Defaultlayout from '../components/Defaultlayout'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
import { useEffect } from 'react';
import { Button, Modal, Table } from 'antd';
import { EyeFilled } from '@ant-design/icons';
function Bills() {
  const componentRef = useRef();
  const [billsdata,setBillsdata]=useState([]);
  const [printBillModelVisibilty,setPrintBillModelVisibilty]=useState(false)
 const  [selectedBill,setSelectedBill]=useState(true);
  const dispatch=useDispatch();
  const getAllBills=()=>{
    dispatch({type:'showLoading'})
    axios.get('/api/bills/get-all-bills').then((response)=>{
      dispatch({type:'hiddeLoading'})
      const data=response.data;
      data.reverse((a,b)=>
        a.createdAt-b.createdAt)
      setBillsdata(data);
    }).catch(err=>{
      dispatch({type:'hiddeLoading'})
      console.log(err);
    })
  };


  const columns=[
    {
        title: 'id',
        dataIndex: '_id'
    },
    {
        title:'Customer',
        dataIndex:'customerName'
    },
    {
        title:'SubTotal',
        dataIndex:'subTotal'
    },
    {
        title:'Tax',
        dataIndex:'tax'
    },
    {
        title:'TotalAmount',
        dataIndex:'totalAmount'
    },
    {
        title:"Actions",
        dataIndex:"_id",
        render:(id,record)=><div className='d-flex'>
        <EyeFilled onClick={()=>{
            setSelectedBill(record);
            setPrintBillModelVisibilty(true);
        }}/>
        </div>
    }
]
const cartcolumns=[
    {
        title: 'Name',
        dataIndex: 'name'
    },
    {
        title:'Price',
        dataIndex:'price'
    },
    {
       title:'Quantity',
       dataIndex:'_id',
       render:(id,record)=>(
        <div>
            <b>{record.quantity}</b>
        </div>
       )
    },
    {
        title:'Total Fare',
        dataIndex:'_id',
        render:(id,record)=>(
         <div>
             <b>{record.quantity*record.price}</b>
         </div>
        )
     },
]
  useEffect(()=>{
    getAllBills();
  },[])

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

 return (
    <Defaultlayout>
      <div className='d-flex justify-content-between'>
      <h3>Bills</h3>
  
      </div>
      <Table columns={columns} dataSource={billsdata} bordered/>
       {setPrintBillModelVisibilty&&(
        <Modal onCancel={()=>{
        // setEditingItems(null)
        setPrintBillModelVisibilty(false)}} visible={printBillModelVisibilty} title='Bill Details' footer={false} width={800}>
<div className='bill-model p-3' ref={componentRef}>
<div className='d-flex justify-content-between bill-header pb-2'>
<div>
<h3><b>Fresh Mart</b></h3>
</div>
<div>
<p>Hyderbad</p>
<p>Jubliee Hills</p>
<p>Phone:8908908900</p>
</div>
</div>
<div className='bill-customer-details mt-2'>
<p><b>Name:</b>{selectedBill.customerName}</p>
<p><b>Phone:</b>{selectedBill.customerPhoneNumber}</p>
{/* <p><b>Date:</b>{selectedBill.createdAt.toString().substring(0,11)}</p> */}
</div>
<Table dataSource={selectedBill.cartItems} columns={cartcolumns} pagination={false}/>
<div className='dotted-border mt-2 pb-2'>
    <p><b>SubTotal:</b>{selectedBill.subTotal}</p>
    <p><b>tax:</b>{selectedBill.tax}</p>
</div>
<div className='mt-2'>
    <h2><b>TOTAL:</b>{selectedBill.totalAmount}</h2>
</div>
<div className='dotted-border'></div>
<div className='text-center'>
<p>Thanks </p>
<p>Visit Again :)</p>
</div>
</div>
<div className="d-flex justify-content-end">
                  <Button type='primary' onClick={handlePrint}>Print Bill</Button>
          </div>
      </Modal>
       )}
    </Defaultlayout>
  );
 }
  
export default Bills;