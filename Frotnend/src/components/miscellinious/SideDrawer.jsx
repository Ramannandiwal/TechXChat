import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Button, Tooltip,Text, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, Input, useToast, Spinner} from "@chakra-ui/react"
import {Box} from "@chakra-ui/layout"
import axios from "axios"
import {BellIcon,ChevronDownIcon} from "@chakra-ui/icons"
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import ProfileModel from './ProfileModel'
import ChatLoading from '../ChatLoading'
import UserListItem from '../UserAvatar/UserListItem'
import { ChatState } from '../../Context/ChatProvider'
function SideDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate();
  const [search, setsearch] = useState("")
  const [serachResult, setserachResult] = useState([])
  const [loading, setloading] = useState(false)
  const [loadingChat,setloadingChat]=useState()
 
const {user,setSelectedChat,chats,setChats}= ChatState();
  const toast = useToast();
  const logouthandler = ()=>{
    localStorage.removeItem("userInfo");
    navigate("/")
    
  };



  const handleSearch= async()=>{
         if(!search){
        toast({
          title:"Please Enter something in search",
          status:"warning",
          duration:5000,
          isClosable:true,
          position:"top-left",
        });
        return;
         }
         try {
          setloading(true)
          const config ={
            headers:{
              Authorization:`Bearer ${user.token}`,
            },
          };

        const {data}= await axios.get(`http://localhost:3000/api/user?search =${search}`,config);
             setloading(false);
             setserachResult(data);

         } catch (error) {
          toast({
            title:"Error Occured",
            description:"Failed to Load the Search result ",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"bottom-left",
          });
         }
  }
  const accessChat =  async(userId)=>{
       try {
        setloadingChat(true);
        const config ={
          headers:{
            "Content-type":"application/json",
            Authorization:`Bearer ${user.token}`,
          },
        };

        const {data}= await axios.post("http://localhost:3000/api/chat",{userId},config)
        if(!chats.find((c)=>c._id===data._id)){
          setChats([data,...chats]);
        }

        setSelectedChat(data);
        setloadingChat(false)
       onClose()
        
       } catch (error) {
        toast({
          title:"Error fetching the chat",
          description:error.message,
          status:"warning",
          duration:5000,
          isClosable:true,
          position:"bottom-left",
        });
       }
  }
  return (
    <div>
   <Box 
    display={"flex"}
    justifyContent={"space-between"}
    alignItems={"center"}
    bg={"#212121"}
    w={"100%"}
    p={"5px 10px 5px 10px "}
     textColor={"white"}
   
   >
<Tooltip label="Search Users to chat "  hasArrow placeContent={"bottom-end"}>
<Button onClick={onOpen} variant={"ghost"}>
<i className='fas fa-search text-white'></i>
<Text textColor={"white"} display={{base:"none",md:"flex"}}>Search User</Text>

</Button>
</Tooltip>
<Text fontSize={"3xl"} fontFamily={"fantasy"}>TECHxCHAT</Text>
  
  <div>
    <Menu>
      <MenuButton p={1}>
      <BellIcon fontSize={"2xl"} m={1}/>
      </MenuButton>
      {/* <MenuList>

      </MenuList> */}

    </Menu>
    <Menu>
    <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
    <Avatar 
    size={"sm"}
     cursor={"pointer"} 
     name={user && user.name}
     src={ user && user.pic}
    
    
    />

      
      </MenuButton>
      <MenuList bg={"#212121"}>
       <ProfileModel user={user}>
       <MenuItem bg={"#212121"} textColor={"white"}>MyPRofile</MenuItem>
       </ProfileModel>
        <MenuDivider/>
        <MenuItem onClick={logouthandler} bg={"#212121"}>Logout</MenuItem>
      </MenuList>
    </Menu>
  </div>
  
  
   </Box>
<Drawer  placement='left' onClose={onClose} isOpen={isOpen}>
<DrawerOverlay/>
<DrawerContent backgroundColor={"#171717"} textColor={"white"}>
  <DrawerHeader borderBottomWidth={"1px"}>Search User</DrawerHeader>
  <DrawerBody>
<Box 
display={"flex"}
paddingBottom={2}
>
<Input 
placeholder='Search by name or email'
mr={2}
value={search}
onChange={(e)=>setsearch(e.target.value)}/>
<Button 
onClick={handleSearch}
>Go</Button>
</Box>
{loading?(
  <ChatLoading/>
):(
  
  serachResult?.map(user=>(
    <UserListItem
    key={user._id}
    user={user}
    handleFunction={()=>accessChat(user._id)}
    />
  ))
)}
  {loadingChat && <Spinner ml={"auto"} display={"flex"}/>}
</DrawerBody>
</DrawerContent>


</Drawer>


    </div>
  )
}

export default SideDrawer
