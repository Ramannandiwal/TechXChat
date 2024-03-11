import { Box, Container, Text } from '@chakra-ui/react'

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../components/Login/Login'
import SignIn from "../components/SignIn/SignIn"
import { useNavigate } from 'react-router-dom'

import { ChatState } from '../Context/ChatProvider'
import { useEffect } from 'react'
function Homepage() {
const {user}= ChatState();

  const navigate= useNavigate();
  useEffect(()=>{
       
          if(user) navigate("/chats")
  },user)

  return (
 <Container maxW={"xl"} centerContent>
   <Box     
   d="flex"
   justifyContent="center"
   p={3}
   bg={'white'}
   w="100%"
   m="40px 0 15px 0"
   borderRadius={"lg"}
   borderWidth={"1px"}
  
   >
<Text textAlign="center"  textColor={"black"} fontFamily={"fantasy"} fontSize={"4xl"}>TECHxCHAT</Text>

   </Box>
  <Box textColor={"black"} bg="white"  w={"100%"} p={4} borderRadius={"lg"} borderWidth={"1px"}>
  <Tabs variant='soft-rounded'>
  <TabList mb={"1em"}>
    <Tab w={"50%"}>Login</Tab>
    <Tab w={"50%"}>SignUp</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
    <Login/>
    </TabPanel>
    <TabPanel>
    <SignIn/>
    </TabPanel>
  </TabPanels>
</Tabs>
    </Box>  

 </Container>
  )
}

export default Homepage
