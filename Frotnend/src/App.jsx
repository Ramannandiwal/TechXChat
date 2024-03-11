
import "../src/App.css"
import ChatProvider from "./Context/ChatProvider.jsx";
import { Router } from "react-router-dom"
import Homepage from "./pages/Homepage"
function App() {


  return (
    <>
      
     <div className="App h-screen">
     <ChatProvider >
     <Homepage/>
        </ChatProvider>
        
     </div>



    </>
  )
}

export default App
