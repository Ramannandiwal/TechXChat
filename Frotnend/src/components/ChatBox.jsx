import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react';
import SingleChat from './SingleChat';

function ChatBox({fetchAgain,setfetchAgain}) {
  const {selectedChat}=ChatState();

  return (
   <Box
   display={{base :selectedChat?"flex":"none",md:"flex"}}
 alignContent={"center"}
 flexDir={"column"}
 p={3}
 bg={"#212121"}
 color={"white"}
 w={{base:"100%",md:"68%"}}
 borderRadius={"lg"}
 borderWidth={"1px"}



   >
    <SingleChat fetchAgain={fetchAgain} setfetchAgain={setfetchAgain}  />
   </Box>
  )
}

export default ChatBox
