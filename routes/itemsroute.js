const express=require('express');
const router=express.Router();
const ItemModel=require('../models/itemsModel');
const itemsModel = require('../models/itemsModel');
router.get('/get-all-items',async (req,res)=>{
try{
const items=await ItemModel.find();
res.send(items);
}
catch(error){
 res.status(400).json(error)
}
})
router.post('/add-item',async (req,res)=>{
    try{
    const newItem=new ItemModel(req.body)
    await newItem.save();
    res.send('Item Added Successfully')
    }
    catch(error){
     res.status(400).json(error)
    }
    })
    router.post('/edit-item',async (req,res)=>{
        try{
         await ItemModel.findOneAndUpdate({_id:req.body.itemId},req.body)
        res.send('Item updated Successfully')
        }
        catch(error){
         res.status(400).json(error)
        }
        })
        router.post('/delete-item',async (req,res)=>{
            try{
             await itemsModel.findOneAndDelete({_id:req.body.itemId})
             res.send('item deleted successfully')
            }
            catch(error){
             res.status(400).json(error)
            }
            })
        
module.exports=router;