const express = require('express');
const { chats } = require('./data/data');
const cors = require("cors");
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const colors = require("colors");
require("dotenv").config();

const app = express();
app.use(express.json());
const connectDB = require("./config/db");
const { notFound, errorhandler } = require('./middleware/errorMiddleware');
connectDB();
const port = process.env.PORT
app.use(cors())
app.get('/', (req, res) => res.send('Hello World!'))
// app.get("/api/chat",(req,res)=>{
//   res.send(chats)
// })
// app.get("/api/chat/:id",(req,res)=>{
//     console.log(req.params.id);
//     const singleChat =chats.find(c=>c._id === req.params.id)
//  res.send(singleChat)
// })
app.use('/api/user',userRoutes)
app.use("/api/chat",chatRoutes)
app.use(notFound)
app.use(errorhandler)


app.listen(port, () => console.log(`Example app listening on port ${port}!`.yellow.bold))