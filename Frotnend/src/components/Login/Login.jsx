import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import {useNavigate} from "react-router-dom"
import { useToast } from '@chakra-ui/react'

import axios from "axios"
function Login() {
    const [show, setshow] = useState(false)
    const navigate = useNavigate()
    const toast = useToast()
    const [email, setemail] = useState(undefined) 
    const [password, setpassword] = useState(undefined) 
    const [Loading, setLoading] = useState(false)
 const submitHandler =async ()=>{
    setLoading(true);
    if (!email || !password) {
        toast({
            title: 'Please Fill all the Fields',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
        });
        setLoading(false);
        return;
    }
    console.log(password,email)

    try {
        const response = await fetch('http://localhost:3000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log(data)

        if (!response.ok) {
            throw new Error(data.message || 'Failed to login');
        }

        toast({
            title: 'Login Successful',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
        setLoading(false);
        navigate('/chats');
    } catch (error) {
        console.error(error);
        toast({
            title: 'Error Occurred!',
            description: error.message || 'Failed to login',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
        });
        setLoading(false);
    }
 }
    const handleclick = () => setshow(!show);

    return (
        <VStack textColor={"black"} spacing={"5px"}>
            {/* email */}
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter your email'
                    value={email ? email : ""} 
                    onChange={(e) => setemail(e.target.value)}
                />
            </FormControl>

            <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        value={password ? password : ""} // Check if Password is defined before using it
                        placeholder='Enter your Password'
                        onChange={(e) => setpassword(e.target.value)}
                    />
                    <InputRightElement width={"4.5rem"}>
                        <Button h={"1.75rem"} size={"sm"} onClick={handleclick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>



            <Button
            variant={"solid"}
      colorScheme='blue'
      width={"100%"}
      style={{marginTop:15}}
      onClick={submitHandler}
      >
     Login
      </Button>

            <Button
                variant="solid"
                colorScheme="red"
                width="100%"
                onClick={() => {
                    setemail("guest@example.com");
                    setpassword("123456");
                }}
            >
                Get Guest User Credentials
            </Button>
        </VStack>
    )
}

export default Login
