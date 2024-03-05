import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { useState } from 'react'

function Login() {
    const [show, setshow] = useState(false)
    const [Email, setEmail] = useState(undefined) 
    const [Password, setPassword] = useState(undefined) 
 const submitHandler = ()=>{

 }
    const handleclick = () => setshow(!show);

    return (
        <VStack textColor={"black"} spacing={"5px"}>
            {/* email */}
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter your email'
                    value={Email ? Email : ""} 
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        value={Password ? Password : ""} // Check if Password is defined before using it
                        placeholder='Enter your Password'
                        onChange={(e) => setPassword(e.target.value)}
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
                    setEmail("guest@example.com");
                    setPassword("123456");
                }}
            >
                Get Guest User Credentials
            </Button>
        </VStack>
    )
}

export default Login
