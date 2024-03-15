import React, { useEffect, useState } from 'react'

import { ChatState } from '../Context/ChatProvider'
import { Box, FormControl, IconButton, Input, Spinner, Text, Toast, useToast } from '@chakra-ui/react';
import { ArrowBackIcon} from '@chakra-ui/icons'
import { getSender,getSenderFull } from '../config/ChatLogics';
import ProfileModel from './miscellinious/ProfileModel';
import UpdateGroupChatModal from './miscellinious/UpdateGroupChatModal';
import ProfileModel1 from './miscellinious/ProfileModel1';
import axios from 'axios';
import ScrollableChat from './ScrollableChat';
import io from "socket.io-client"
const ENDPOINT = "http://localhost:3000/";
var socket,selectedChatCompare;

function SingleChat({fetchAgain,setfetchAgain}) {
  const[socketConnected,setsocketConnected]=useState(false);
  const [messages, setMessages] = useState([])
  const [loading ,setLoading] = useState(false)
  const [newmessage,setnewMessage]=useState("");
  const toast = useToast();
  const typingHandler = (e)=>{
    setnewMessage(e.target.value);
  }
  useEffect(() => {
  
    socket = io(ENDPOINT);
    socket.emit("setup",user);
    socket.on("connection",()=>setsocketConnected(true))

}, []);
  const fetchMessages = async()=>{
    if(!selectedChat){
      return
    }
    
        try {
          const config = {
            headers: {
          
              Authorization: `Bearer ${user.token}`,
            },
          };
          setLoading(true);
          const data = await axios.get(`http://localhost:3000/api/message/${selectedChat._id}`,config)
          
          setMessages(data.data);
          setLoading(false)
          socket.emit("join chat",selectedChat._id);
          
        } catch (error) {
          toast({
            title: error.message,
            description: "FAiled to fetch the Messages",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        }

  }
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {///}
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });
  const sendMessage = async(event)=>{
         if(event.key === "Enter" && newmessage){
             try {
              const config = {
                headers: {
                  "Content-Type":"application/json",
                  Authorization: `Bearer ${user.token}`,
                },
              };
              setnewMessage("");
              
              const { data } = await axios.post("http://localhost:3000/api/message",{
                content:newmessage,
                chatId:selectedChat._id,
              }, config);
   
            socket.emit("new message",data);
              setMessages([...messages,data])

             } catch (error) {
              toast({
                title: error.message,
                description: "Failed to send the Messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
             }
         }
  }



    const {user,selectedChat,setSelectedChat}=ChatState();
    useEffect(()=>{
      fetchMessages();
      selectedChatCompare = selectedChat;

    },[selectedChat])
  return (
 <>
 
 {selectedChat?(
 <>
   <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />

            {!selectedChat.isGroupChat?(<>
                 {getSender(user,selectedChat.users)}
                 <ProfileModel1 user={getSenderFull(user,selectedChat.users)}/>
            
            </>):(
              <>
              {selectedChat.chatName.toUpperCase()}
              {
                <UpdateGroupChatModal
                fetchMessages={fetchMessages}
                fetchAgain = {fetchAgain} setfetchAgain = {setfetchAgain}/>
              }
              </>
            )

            }
         
          </Text>
          <Box 
          display={"flex"}
          flexDir={"column"}
          justifyContent={"flex-end"}
          p={3}
          bg={"#3c3c3c"}
          w={"100%"}
          h={"100%"}
          borderRadius={"lg"}
          overflowY={"hidden"}
          
          >

            {/* message here  */}

         {loading?(<Spinner size={"xl"} w={20} h={20} margin={"auto"} alignSelf={"center"}/>):(<>
         
         <div style={{scrollbarWidth:"none"}} className=' flex flex-col overflow-y-auto '>

            <ScrollableChat  messages={messages}/>

          {/* messages */}
          </div> 
          <FormControl isRequired mt={3} onKeyDown={sendMessage} >
            <Input w={"100%"}
            variant="filled"
            bg={"#E0E0E0"}
            placeholder='Enter  a Message ....'
            onChange={typingHandler}
            value={newmessage}
            />
          </FormControl>
   
         
         
         
         
         
         </>)}


          </Box>
 
 </>):
(<Box
display={"flex"}
justifyContent={"center"}
alignItems={"center"}
h={"100%"}

>
<Text 
fontSize={"3xl"} pb={3}
justifyContent={"center"}
>Click on a User to Start A Chat</Text>
</Box>) 
}
 
 </>
  )
}

export default SingleChat
