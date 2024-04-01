const mongoose=require('mongoose');

const url="mongodb+srv://KhajaAyaanuddin:mmLTzg3psGIHADcy@cluster0.ldj36lx.mongodb.net/AyaanPOS"

mongoose.connect(url);
let connectionObj=mongoose.connection
connectionObj.on('connected',()=>{
    console.log('mongodb is connected successfully');
})
connectionObj.on('errror',()=>{
    console.log("Mongodb connection failed");
})