import { Box, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure,Lorem, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import "../Screens/homescreen/home.scss";
import { useDispatch, useSelector } from "react-redux";
import { setTotalPrice, setcartItems } from "../../Redux/actions/cartaction";
import RatingStar from "./RatingStar";
import { handleDelete, handleminus, handleplus } from "./comoncard";
const CartCard = ({ product, CartScreen }) => {
  const [quant, setQuant] = useState(
    localStorage.getItem(`quan_${product.id}`) || 1
  );
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch();
  const { totalPrice } = useSelector((state) => state.cart);
 
  
   

   
function handdleDelete(){

  handleDelete(product, dispatch, totalPrice)
  onClose()
}
  return (
    <Box
      display="flex"
      borderBottom="1px solid gray"
      gap="1rem"
      padding=".5rem"
      mb=".5rem"
    >
      <Box w="40%" height= {CartScreen?"27vh":"20vh"} >
        <Image src={product.image} w="100%" height="100%" />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        gap=".5rem"
        position="relative"
        width="100%"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap=".5rem"
          fontSize="17px"
        >
          <p style={{ fontWeight: "700" }}>{product.title}</p>
          <MdDeleteForever
            onClick={onOpen}
            className="deletebtn"
            size={22}
          />
            <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <Text fontSize="19px" fontWeight="700"> do you really want to delete this item?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button  _hover={{background:"red.600"}} backgroundColor="red.500" color="#fff" onClick={handdleDelete}>OK</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <h3 style={{ fontSize: "16px" }}>
            Price : ${(quant * Math.floor(product.price)).toFixed(0)}
          </h3>
        </Box>
        {CartScreen && (
          <>
            <Box display="flex" alignItems={"center"} gap={"2rem"}>
              <RatingStar rate={product.rating.rate} />
              
            </Box>
             
          </>
        )}
        <Box display="flex" alignItems="center" gap=".5rem">
          <FaMinus
            onClick={() => handleminus(product, dispatch, totalPrice, setQuant)}
          />
          <span className="quantityspan">{quant}</span>
          <FaPlus
            onClick={() => handleplus(product, dispatch, totalPrice, setQuant)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CartCard;
