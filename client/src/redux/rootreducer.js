const initialState={
    loading:false,
    cartItems:[]
}
export const rootreducer=(state=initialState,action)=>{
     switch(action.type){
        case "addToCart":return{
            ...state,
            cartItems:[...state.cartItems,action.payload]
        }
        case "updateCart":return{
            ...state,
            cartItems:state.cartItems.map((item)=>item._id==action.payload._id?{...item,quantity:action.payload.quantity}:item)
        }
        case "deleteFromCart":return{
            ...state,
            cartItems:state.cartItems.filter((item)=>item._id!==action.payload._id)
        }
        case "showLoading":return{
            ...state,
            loading:true
        }
        case "hiddeLoading":return{
            ...state,
            loading:false
        }
        default:return state;
     }
}