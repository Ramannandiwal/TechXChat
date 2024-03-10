import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Button, Tooltip,Text, Menu, MenuButton, MenuList, MenuItem, MenuDivider} from "@chakra-ui/react"
import {Box} from "@chakra-ui/layout"
import {BellIcon,ChevronDownIcon} from "@chakra-ui/icons"
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import ProfileModel from './ProfileModel'
function SideDrawer() {
  const navigate = useNavigate();
  const [search, setsearch] = useState("")
  const [serachResult, setserachResult] = useState([])
  const [loading, setloading] = useState(false)
  const [loadingChat,setloadingChat]=useState()
  const [user, setuser] = useState()
  const logouthandler = ()=>{
    localStorage.removeItem("userInfo");
    navigate("/")
    
  };
  useEffect(()=>{
      const uservalue = JSON.parse(localStorage.getItem("userInfo"));
      setuser(uservalue)
  
  },[localStorage.getItem("userInfo")])
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
<Button variant={"ghost"}>
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



    </div>
  )
}

export default SideDrawer
