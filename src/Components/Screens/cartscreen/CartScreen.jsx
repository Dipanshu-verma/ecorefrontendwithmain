import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "../../card/cartCard";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { setTotalPrice, setcartItems } from "../../../Redux/actions/cartaction";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CartScreen = () => {
  const [input, setInput] = useState("");
  const [discount, setdiscount] = useState(0);
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const [show, setShow] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    mobile: "",
    name: "",
  });
  const toast = useToast();
  function handleDiscount() {
    if (input === "ECORE10") {
      setShow(false);
      setInput("");
      setdiscount(((Math.floor(totalPrice) * 10) / 100).toFixed(0));
      localStorage.setItem("discountprice", discount);
    } else {
      setShow(true);
      setInput("");
    }
  }
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BACKEND_API = "https://ecorebackendappi.onrender.com"
  async function handlecheckoutok() {
   
    const token = localStorage.getItem("user_accesstoken");
    const profile = localStorage.getItem("user_profile");
    const isMobileValid = /^[0-9]{10}$/.test(address.mobile);
    const iszipValid = /^[0-9]{6}$/.test(address.zip);
    
    if (
      address.name &&
      address.street &&
      address.city &&
      address.state &&
      iszipValid &&
      isMobileValid
    ) {
      toast({
        title:"Order Successfull",
        description: `Thank you! Your order is confirmed and you'll be redirected to the home page shortly.`,
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      try {
        const total  = Math.floor(totalPrice)-discount
        
       
        const res = await axios.post(`${BACKEND_API}/checkout`, {
          token,
          address,
          total
           
        });

        localStorage.clear();
        localStorage.setItem("user_accesstoken", token);
        if (profile) {
          localStorage.setItem("user_profile", profile);
        }
        onClose();
        navigate("/");
        dispatch(setcartItems([]));
        dispatch(setTotalPrice(0));
      } catch (err) {
        console.error(err);
      }
    } else {
      toast({
        title: "Incomplete Information",
        description: `please fill the all details carefully`,
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  function handlecheckout() {
    
    const token = localStorage.getItem("user_accesstoken");

    if (token) {
      if (cartItems?.length > 0) {
        onOpen();
      } else {
        toast({
          description: `please add items first`,
          status: "error",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      }
    } else {
      toast({
        description: `please login first`,
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  return (
    <Box
      display="flex"
      mt="12vh"
      justifyContent="space-between"
      gap="2rem"
      p="2rem"
    >
      <Box>
        {cartItems?.length === 0 ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            <Image
              src="https://media.tenor.com/2UPyt6TKuWgAAAAM/marflrt.gif"
              alignSelf="center"
            />
            <h1>Cart is Empty</h1>
          </Box>
        ) : (
          <ul>
            {cartItems?.map((item) => (
              <CartCard product={item} CartScreen />
            ))}
          </ul>
        )}
      </Box>
      <Box p="1rem">
        <Box justifyContent="space-between" gap="1.3rem" display="flex">
          <Text>
            {" "}
            <Input
              type="text"
              placeholder="Enter Coupon Code"
              value={input}
              width="14rem"
              onChange={(e) => setInput(e.target.value)}
            />{" "}
            <Text display={show ? "block" : "none"} color="red">
              Invalid promo code
            </Text>{" "}
          </Text>
          <Button onClick={handleDiscount} colorScheme="green">
            Apply
          </Button>
        </Box>
        <Box fontSize="17px" fontWeight="600" width="90%" m="auto" mt="1rem">
          <Box justifyContent="space-between" gap="2rem" display="flex">
            <p>Price :</p>
            <p>${totalPrice.toFixed(0)}</p>
          </Box>
          <Box justifyContent="space-between" gap="2rem" display="flex">
            <p>Discount :</p>
            <p>${discount}</p>
          </Box>
          <Box justifyContent="space-between" gap="2rem" display="flex">
            <p>Total Amount :</p>
            <p>
              $
              {discount === 0
                ? totalPrice.toFixed(0)
                : ((totalPrice * 90) / 100).toFixed(0)}
            </p>
          </Box>
        </Box>
        <Button
          border="2px"
          ml="68%"
          borderRadius="5px"
          bg="#000000"
          color="#fff"
          mt="1rem"
          _hover={{ color: "black", bg: "#fff", boxShadow: "0 0 10px black" }}
          onClick={handlecheckout}
        >
          Checkout
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Text fontSize="16px" fontWeight="600">
            Thank you for choosing Ecore! To ensure a seamless delivery, please provide your shipping address so we can   send you the order details to your email.
            </Text>

            <FormControl mt={2}>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                value={address.name}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl mt={2}>
              <Input
                type="text"
                name="street"
                placeholder="Street"
                value={address.street}
                onChange={handleInputChange}
                required
              />
            </FormControl>

            <FormControl mt={2}>
              <Input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl mt={2}>
              <Input
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl mt={2}>
              <Input
                type="number"
                name="zip"
                placeholder="ZIP Code"
                value={address.zip}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl mt={2}>
              <Input
                type="number"
                name="mobile"
                placeholder="Mobile Number"
                value={address.mobile}
                onChange={handleInputChange}
                required
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              _hover={{ background: "red.600" }}
              backgroundColor="blue.500"
              color="#fff"
              onClick={handlecheckoutok}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CartScreen;
