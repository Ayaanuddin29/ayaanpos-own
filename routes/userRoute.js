const express=require('express');
const router=express.Router();
const UserModel=require('../models/userModel');
router.post('/login',async (req,res)=>{
    try{
     const user= await UserModel.findOne({userId:req.body.userId,password:req.body.password,verified:true})
     if(user)
     res.send(user);
    else
    res.status(400).json("error")
    }
    catch(error){
     res.status(400).json(error)
    }
    })

router.post('/register',async (req,res)=>{
    try{
     const newuser=new UserModel({...req.body,verified:false});
     await newuser.save();
     res.send('user Registered successfully');
    }
    catch(error){
     res.status(400).json(error)
    }
    })
   
module.exports=router;