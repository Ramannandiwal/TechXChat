import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false)
  const [show, setshow] = useState(false)
  const [name, setname] = useState()
  const [email, setemail] = useState()
  const [confirmPassword, setconfirmPassword] = useState()
  const [Password, setPassword] = useState()
  const [pic, setPic] = useState();
  const toast = useToast()
  const handleclick = () => setshow(!show);
  const postDetails = (pics) => {
   
    setloading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "TechxChat");
      data.append("cloud_name", "dv7fjx6eb");
      fetch("https://api.cloudinary.com/v1_1/dv7fjx6eb/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
      return;
    }


  }
  const submitHandler = async () => {
    setloading(true);
    if (!name || !email || !Password || !confirmPassword) {
        toast({
            title: "Please Fill all the Fields",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        setloading(false);
        return;
    }
    if (Password !== confirmPassword) {
        toast({
            title: "Passwords Do Not Match",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        setloading(false);
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password: Password, pic }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to register user");
        }

        console.log(data);
        toast({
            title: "Registration Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setloading(false);
        navigate("/chats");
    } catch (error) {
        console.error(error);
        toast({
            title: "Error Occurred!",
            description: error.message || "Failed to register user",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        setloading(false);
    }
};


  return (
    <VStack textColor={"black"} spacing={"5px"}>

      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder='Enter your Name'
          onChange={(e) => setname(e.target.value)
          } />
      </FormControl>

      {/* email */}
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder='Enter your email'
          onChange={(e) => setemail(e.target.value)
          } />
      </FormControl>

      {/* password */}
      <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}

            placeholder='Enter your Password'
            onChange={(e) => setPassword(e.target.value)
            } />
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={handleclick} >
              {show ? "Hide" : "Show"}

            </Button>

          </InputRightElement>

        </InputGroup>
      </FormControl>


      {/* confirm Password */}
      <FormControl>
        <FormLabel>ConfirmPassword</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder='Enter your Password again'
            onChange={(e) => setconfirmPassword(e.target.value)
            } />
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={handleclick} >
              {show ? "Hide" : "Show"}

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
          onChange={(e) => postDetails(e.target.files[0])
          } />



      </FormControl>

      <Button
        colorScheme='blue'
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        SignUp
      </Button>

    </VStack>
  )
}

export default SignIn
