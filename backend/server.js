const express = require('express');
const { chats } = require('./data/data');
const cors = require("cors");


require("dotenv").config();
const app = express()
const port = process.env.PORT
app.use(cors())
app.get('/', (req, res) => res.send('Hello World!'))
app.get("/api/chat",(req,res)=>{
  res.send(chats)
})
app.get("/api/chat/:id",(req,res)=>{
    console.log(req.params.id);
    const singleChat =chats.find(c=>c._id === req.params.id)
 res.send(singleChat)
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))