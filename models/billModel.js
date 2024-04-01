const mongoose=require('mongoose');
const billSchema=mongoose.Schema({
    customerName:{type:String,require:true},
    customerPhoneNumber:{type:String,require:true},
    totalAmount:{type:Number,require:true},
    tax:{type:Number,require:true},
    subTotal:{type:Number,require:true},
    paymentMode:{type:String,require:true},
    cartItems:{type:Array,require:true}
},{timestamps:true})
const billModel=mongoose.model('bills',billSchema);
module.exports=billModel