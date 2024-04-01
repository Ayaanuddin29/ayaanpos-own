import React from 'react'
import { useDispatch } from 'react-redux'

function Atem({item}) {
  const dispatch=useDispatch()
  function addToCart(){
  dispatch({type:'addToCart',payload:{...item,quantity:1}})
  }
  return (
    <div className='item'>
        <h4 className='name'>{item.name}</h4>
        <img className='hey' src={item.image} width='150px' height='150px'/>
        <h4 className='price'><b>Price:{item.price}$/-</b></h4>
        <div className='d-flex justify-content-end'>
            <button onClick={()=>addToCart()}>Add to Cart</button>
        </div>
    </div>
  )
}

export default Atem