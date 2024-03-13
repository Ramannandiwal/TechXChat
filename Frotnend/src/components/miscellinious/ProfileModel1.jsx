import { ViewIcon } from '@chakra-ui/icons'
import { Button, IconButton, useDisclosure,Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'

function ProfileModel1({children,user}) {
 
   
 
    const { isOpen, onOpen, onClose } = useDisclosure()
  return <>
  {children ?( <span onClick={onOpen}>{children}</span>):(
    <IconButton
     display={"flex"}
     icon={<ViewIcon/>}
     onClick={onOpen}
    
    />
   )
  }

<Modal size={"lg"} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h={"410px"}>
          <ModalHeader
           fontSize={"40px"}
           fontFamily={"fantasy"}
           display={"flex"}
           justifyContent={"center"}
          >
          
            { user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"}
              flexDir={"column"}
              alignItems={"center"}
              justifyContent={"center"}
          >
          <Image
           borderRadius={"full"}
           boxSize={"150px"}
           src={user && user.pic}
           alt={user && user.name}
          
          />
          <Text
          fontSize={{base:"18px",md:"24px"}}
          fontFamily={"serif"}
          >
      Email:{ user && user.email}
          </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
  
  
  </>

}

export default ProfileModel1
