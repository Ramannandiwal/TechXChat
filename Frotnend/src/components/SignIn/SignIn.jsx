import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'

const SignIn = () => {
 
  const [show, setshow] = useState(false)
  const [name, setname] = useState()
  const [email,setemail] = useState()
  const [confirmPassword, setconfirmPassword] = useState()
  const [Password, setPassword] = useState()
  const [pic, setPic]=useState();
  const handleclick =()=>setshow(!show);
  const postDetails = (pics)=>{

  }
  const submitHandler = ()=>{

  }

  return (
    <VStack textColor={"black"} spacing={"5px"}>
      
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
         placeholder='Enter your Name'
         onChange={(e)=>setname(e.target.value)
        }/>
      </FormControl>

      {/* email */}
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
         placeholder='Enter your email'
         onChange={(e)=>setemail(e.target.value)
        }/>
      </FormControl>

      {/* password */}
      <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input
        type={show?"text":"password"}
       
         placeholder='Enter your Password'
         onChange={(e)=>setPassword(e.target.value)
        }/>
        <InputRightElement width={"4.5rem"}>
        <Button h={"1.75rem"} size={"sm"} onClick={handleclick} >
          {show ?"Hide":"Show"}

        </Button>
        
        </InputRightElement>
        
        </InputGroup>
      </FormControl>


      {/* confirm Password */}
      <FormControl>
        <FormLabel>ConfirmPassword</FormLabel>
        <InputGroup>
        <Input
        type={show?"text":"password"}
         placeholder='Enter your Password again'
         onChange={(e)=>setconfirmPassword(e.target.value)
        }/>
        <InputRightElement width={"4.5rem"}>
        <Button h={"1.75rem"} size={"sm"} onClick={handleclick} >
          {show ?"Hide":"Show"}

        </Button>
        
        </InputRightElement>
        
        </InputGroup>
      </FormControl>
    

{/* pic */}
<FormControl>
        <FormLabel>Upload Your Picture</FormLabel>
       
        <Input
        type="file"
      p={1.5}
      accept='image/*'
         onChange={(e)=>postDetails(e.target.value[0])
        }/>
      
        
       
      </FormControl>

      <Button
      colorScheme='blue'
      width={"100%"}
      style={{marginTop:15}}
      onClick={submitHandler}
      >
      SignUp
      </Button>

    </VStack>
  )
}

export default SignIn
