const express = require('express')
const dbconnect=require('./dbconnect')
const app = express()
app.use(express.json())

const billsRoute=require('./routes/billsRoute')
const itemsRoute=require('./routes/itemsroute')
const userRoute=require('./routes/userRoute');
app.use('/api/users/',userRoute);
app.use('/api/items/',itemsRoute);
app.use('/api/bills/',billsRoute);
const path=require('path');
if(process.env.NODE_ENV==='production'){
    app.use('/',express.static('/client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client/build/index.html'))
    })
}
const port=process.env.PORT||5000
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Node js server listening at${port}!`))