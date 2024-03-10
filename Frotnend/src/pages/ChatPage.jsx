// ChatPage.jsx
import React from 'react';
import { Box } from "@chakra-ui/layout";
import "./ChatPage.css"
import SideDrawer from '../components/miscellinious/SideDrawer';
import MyChat from '../components/MyChat';
import ChatBox from '../components/ChatBox';

const ChatPage = () => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

    return (
        <div className='ChatPage w-[100%] h-screen '>
            {user && <SideDrawer />}
            <Box
            display={"flex"}
             justifyContent={"space-between"}
             w={"100%"}
             h={"91.5vh"}
             p={"10px"}
            
            
            >
                {user && <MyChat />}
                {user && <ChatBox />}
            </Box>
        </div>
    );
};

export default ChatPage;
