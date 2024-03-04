import * as React from "react";
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Homepage from "./pages/Homepage.jsx";
import ChatPage from "./pages/ChatPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    
    element:<Homepage/>,
 
  },
  {
    path: "/chats",
    
    element:<ChatPage/>,
 
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </ChakraProvider>
);