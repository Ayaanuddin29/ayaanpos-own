const express=require('express');
const BillModel=require('../models/billModel');
const router=express.Router();


router.post('/charge-bill',async (req,res)=>{
    try{
    const newBill=new BillModel(req.body)
    await newBill.save();
    res.send('Bill Charged Successfully')
    }
    catch(error){
     res.status(400).json(error)
    }
    })

    router.get('/get-all-bills',async(req,res)=>{
        try{
             const bills=await BillModel.find();
             res.send(bills);
        }
        catch(err){
            res.status(400).json(err);
        }
    })
module.exports=router;