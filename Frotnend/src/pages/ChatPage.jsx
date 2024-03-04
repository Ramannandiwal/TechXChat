import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
const ChatPage = () => {
  const [chats, setchats] = useState([])
  const fetchdata= async()=>{
    const {data} = await axios.get("http://localhost:3000/api/chat");
    setchats(data);
    console.log(data)
  };
  useEffect(() => {
  fetchdata()
  }, [])
  return (
    <div>
      {
        chats.map((item)=>  <div key={item._id}>{item.chatName}</div>)
      }
    </div>
  )
}

export default ChatPage
