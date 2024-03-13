import { Box, Button, FormControl, Input, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios'
import UserListItem from '../UserAvatar/UserListItem'
import UserBadgeItem from '../UserAvatar/UserBadgeItem'

function GroupChatModal({children}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setgroupChatName] = useState()
    const [selectedUser,setSelectedUsers]=useState([])
    const [search, setSearch] = useState("")
    const [searchResult,setSearchResult]=useState([])
    const [loading, setloading]=useState(false)
   const toast =  useToast();
  const {user,chats,setChats}= ChatState()
    const handleDelete = (delUser)=>{
        setSelectedUsers(selectedUser.filter(sel =>sel._id !== delUser._id))

    }
    const handleSubmit = async()=>{
        if(!groupChatName|| !selectedUser){
            toast({
                title:"Fill All the Fields",
            description:"Error fields are empty ",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"bottom",
            })
            return
        }
        try {
            const config ={
                headers:{
                  Authorization:`Bearer ${user.token}`,
                },
              };
            const data = await axios.post("http://localhost:3000/api/chat/group",{
                name:groupChatName,
                users:JSON.stringify(selectedUser.map((u)=>u._id)),
            },config)


        setChats([data.data,...chats]);
        onClose();
        toast({
            title:"New Group Chat Created",
      
        status:"success",
        duration:5000,
        isClosable:true,
        position:"bottom",
        })

        } catch (error) {
            toast({
                title:"Fill All the Fields",
            description:error.message,
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"bottom",
            })
        }

       



    }
    const handleGroup = (usertoAdd)=>{
        if(selectedUser.includes(usertoAdd)){
            toast({
                title:"User Already  added",
          
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"bottom-left",
            })
            return
        }
        setSelectedUsers([...selectedUser,usertoAdd]);


    }
const handleSearch = async(query )=>{
    setSearch(query);
    if(!query){
        return ;
    }
    try {
        setloading(true)
        const config ={
            headers:{
              Authorization:`Bearer ${user.token}`,
            },
          };

        const {data}= await axios.get(`http://localhost:3000/api/user?search=${search}`,config);
        setloading(false)
     
        setSearchResult(data);
    } catch (error) {
        toast({
            title:"Error Occured",
            description:"Failed to Load the Search results ",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"bottom-left",
          });
    }

}
  return (
  <div >
    <span onClick={onOpen}>{children}</span>

<Modal  isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent color={"white"} background={"#212121"}>

    <ModalHeader
   
    fontSize={"35px"}
    fontFamily={"fantasy"}
    display={"flex"}
    justifyContent={"center"}
    
    >Create Group Chat </ModalHeader>
    <ModalCloseButton />
    <ModalBody
    display={"flex"}
    flexDir={"column"}
    alignItems={"center"}

    
    >
      
        <FormControl>
            <Input
            placeholder='Chat Name'
            mb={3}
            onChange={(e)=>setgroupChatName(e.target.value)}
            />
        </FormControl>
        <FormControl>
            <Input
            placeholder='Add Users :'
            mb={1}
            onChange={(e)=>handleSearch(e.target.value)}
            />
        </FormControl>

      {/* selected users */}
     <Box w={"100%"} display={"flex"} flexWrap={"wrap"}>

     {selectedUser.map(u =>(
          
          <UserBadgeItem key = {nanoid()}  user={u} handleFunction={()=>handleDelete(u)}   />
        ))}

     </Box>

    {/* render Searched user */}
    {loading?<div>loading</div>:
    
    (searchResult.slice(0,4)).map(user=>(
        <UserListItem key={nanoid()} user={user} handleFunction={()=>handleGroup(user)} />
    ))
    
    }
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='blue'  onClick={handleSubmit}>

        Close
      </Button>
    
    </ModalFooter>
  </ModalContent>
</Modal>
  
  </div>
  )
}

export default GroupChatModal
