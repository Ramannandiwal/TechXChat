import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, IconButton, Text } from '@chakra-ui/react';
import { ArrowBackIcon} from '@chakra-ui/icons'
import { getSender,getSenderFull } from '../config/ChatLogics';
import ProfileModel from './miscellinious/ProfileModel';
import UpdateGroupChatModal from './miscellinious/UpdateGroupChatModal';
import ProfileModel1 from './miscellinious/ProfileModel1';
function SingleChat({fetchAgain,setfetchAgain}) {
    const {user,selectedChat,setSelectedChat}=ChatState();
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
                <UpdateGroupChatModal fetchAgain = {fetchAgain} setfetchAgain = {setfetchAgain}/>
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
