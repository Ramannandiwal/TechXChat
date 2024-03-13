const express = require('express');
const { chats } = require('./data/data');
const { faker } = require('@faker-js/faker');
const cors = require("cors");
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const colors = require("colors");
require("dotenv").config();
const messageRoutes = require("./routes/messageRoutes")
const app = express();
app.use(express.json());
const connectDB = require("./config/db");
const { notFound, errorhandler } = require('./middleware/errorMiddleware');
const User = require('./Models/userModel');
const generateToken = require('./config/generateToken');
connectDB();
const port = process.env.PORT
app.use(cors())
//hello 
app.get('/', (req, res) => res.send('Hello World!'))
// app.get("/api/chat",(req,res)=>{
//   res.send(chats)
// })
// app.get("/api/chat/:id",(req,res)=>{
//     console.log(req.params.id);
//     const singleChat =chats.find(c=>c._id === req.params.id)
//  res.send(singleChat)
// })
// app.post("/register",async(req,res)=>{
//     const generateRandomData = () => {
//         const name = faker.internet.userName(); // Generate random name
//         const email = faker.internet.email(); // Generate random email
//         const password = faker.internet.password(); // Generate random password
    
//         return {
//             name,
//             email,
//             password
//         };}
//     const userDataArray = Array.from({ length: 50 }, generateRandomData);
//     const createdUsers = [];
//     for (const userData of userDataArray) {
//         const { name, email, password, pic } = userData;

//         if (!name || !email || !password) {
           
//             continue;
//         }

//         // Check if user already exists
//         const userExists = await User.findOne({ email });

//         if (userExists) {
//             // Skip if user already exists
//             continue;
//         }

//         // Create user
//         const user = await User.create({
//             name,
//             email,
//             password,
//             pic,
//         });

//         createdUsers.push({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             pic: user.pic,
//             token: generateToken(user._id),
//         });
//     }

//     res.status(201).json(createdUsers);

// });
app.use('/api/user',userRoutes)
app.use("/api/chat",chatRoutes)
app.use("/api/message",messageRoutes);
app.use(notFound)
app.use(errorhandler)


app.listen(port, () => console.log(`Example app listening on port ${port}!`.yellow.bold))