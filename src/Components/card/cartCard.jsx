import {
  Box,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa6";
import "../Screens/homescreen/home.scss";
import { useDispatch, useSelector } from "react-redux";
import { setTotalPrice, setcartItems } from "../../Redux/actions/cartaction";
import RatingStar from "./RatingStar";
import { handleDelete, handleminus, handleplus } from "./comoncard";

const CartCard = ({ product, CartScreen }) => {
  const [quant, setQuant] = useState(
    localStorage.getItem(`quan_${product.id}`) || 1
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { totalPrice } = useSelector((state) => state.cart);

  function handdleDelete() {
    handleDelete(product, dispatch, totalPrice);
    onClose();
  }

  return (
    <Box
      display="flex"
      borderBottom="1px solid gray"
      gap="1rem"
      padding=".5rem"
      mb=".5rem"
    >
     <Box w={{ base: "90%", md: "40%" }} height={CartScreen ? "27vh" : "20vh"}>
  <Image src={product.image} w="100%" h="100%" objectFit="contain" />
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
            style={{ cursor: "pointer" }}
          />
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Confirmation</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text fontSize="19px" fontWeight="700">
                  Do you really want to delete this item?
                </Text>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose} style={{ cursor: "pointer" }}>
                  Close
                </Button>
                <Button
                  _hover={{ background: "red.600" }}
                  backgroundColor="red.500"
                  color="#fff"
                  onClick={handdleDelete}
                  style={{ cursor: "pointer" }}
                >
                  OK
                </Button>
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
            onClick={() =>
              handleminus(product, dispatch, totalPrice, setQuant)
            }
            style={{ cursor: "pointer" }}
          />
          <span className="quantityspan">{quant}</span>
          <FaPlus
            onClick={() => handleplus(product, dispatch, totalPrice, setQuant)}
            style={{ cursor: "pointer" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CartCard;
