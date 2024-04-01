import React, { useEffect, useState } from 'react'
import Defaultlayout from '../components/Defaultlayout'
import axios from 'axios';
import { Col, Row } from 'antd';
import Atem from '../components/Atem';
import '../resources/items.css'
import { useDispatch } from 'react-redux';
function HomePage() {
  const [itemsdata,setItemsdata]=useState([]);
  const [selectedCategory,setSelectedCategory]=useState('fruits');
  const categories=[
    {
      name:'fruits',
      imageURL:'https://tse1.mm.bing.net/th?id=OIP.22XOhxYrd_Pu__NkrGadMgHaEo&pid=Api&P=0&h=180'
    },
    {
      name:'vegetables',
      imageURL:'https://tse3.mm.bing.net/th?id=OIP.M_uTN2k98i4NeTXVfw5STgHaFj&pid=Api&P=0&h=180'
    },
    {
      name:'non-veg',
      imageURL:'https://tse1.mm.bing.net/th?id=OIP.dENTJ9ZPwZRm4rWuE_J82gHaEe&pid=Api&P=0&h=180'
    },
  
    ]
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
  }
  useEffect(()=>{
    getAllItems();
  },[])
  return (
   <Defaultlayout>
   <div className='d-flex'>
    {categories.map((category)=>{
        return <div onClick={()=>setSelectedCategory(category.name)} className={`d-flex category ${selectedCategory===category.name&&'selected-category'}`}>
          <h4>{category.name}</h4>
          <img src={category.imageURL} height='50px' width='80px'/>
        </div>
       })}
   </div>
   <hr></hr>
   <Row gutter={20}>
   {itemsdata.filter((i)=>i.category===selectedCategory).map((item)=>{
    return <Col xs={24} lg={6} md={12} sm={6}>
      <Atem item={item}/>
    </Col>
   })}
   </Row>
   </Defaultlayout>
  )
}

export default HomePage