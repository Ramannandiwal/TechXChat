const express = require('express');
const { chats } = require('./data/data');
const path = require("path")
const { faker, ro } = require('@faker-js/faker');
const cors = require("cors");
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const corsOptions = {
    origin: 'http://localhost:5173/chats', // Allow requests from localhost:5173
    methods: 'GET,POST', // Allow only GET and POST requests
    allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
  };
  

 
const colors = require("colors");
require("dotenv").config();
const messageRoutes = require("./routes/messageRoutes")
const app = express();

app.use(cors())
app.use(express.json());
const connectDB = require("./config/db");
const { notFound, errorhandler } = require('./middleware/errorMiddleware');
const User = require('./Models/userModel');
const generateToken = require('./config/generateToken');
connectDB();
const port = process.env.PORT

//hello 

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
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`.yellow.bold))
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    },
    pingTimeout: 60000
  });
  
  io.on("connection", (socket) => {
    socket.on('setup', (userData) => {
      // Join user-specific room based on user ID
      socket.join(userData._id);
      socket.emit("connected")
      console.log(`${userData.name} connected.`);
    });
  
    socket.on("join chat", (room) => {
      // Join chat-specific room
      socket.join(room);
      console.log(`User joined chat room ${room}`);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageReceived) => {
      const chat = newMessageReceived.chat;
      if (!chat.users) {
        return console.log(`Chat users not defined`);
      }
  
      chat.users.forEach(user => {
        if (user._id !== newMessageReceived.sender._id) {
         
          // Emit message to each user in the chat room except the sender
          socket.to(user._id).emit("message recieved", newMessageReceived);
        }
      });
    });
  });
  // --------------------------------------Deployement 
const __dirname1=path.resolve();

if(process.env.NODE_ENV==='production'){
         app.use(express.static(path.join(__dirname1,'/frontend/build')));
}else{
app.get("/",(req,res)=>{
  res.send("Api is running Succesfully ")
})
}

// --------------------------------
app.use(notFound)
app.use(errorhandler)













{/* <Badge content={notification.length}>
    <MenuButton p={1}>
      <BellIcon fontSize={"2xl"} m={1}/>
      </MenuButton>
    </Badge> */}