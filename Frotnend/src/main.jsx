import * as React from "react";
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import ChatPage from "./pages/ChatPage.jsx";
import App  from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    
    element:<App/>,
 
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