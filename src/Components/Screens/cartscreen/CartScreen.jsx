import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "../../card/cartCard";
import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  Text,
  Image,
  useDisclosure,
  useToast,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { setTotalPrice, setcartItems } from "../../../Redux/actions/cartaction";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartScreen = () => {
  const [input, setInput] = useState("");
  const [discount, setDiscount] = useState(0);
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BACKEND_API = "https://ecorebackendappi.onrender.com";

  function handleDiscount() {
    if (input === "ECORE10") {
      setShow(false);
      setInput("");
      setDiscount(((Math.floor(totalPrice) * 10) / 100).toFixed(0));
      localStorage.setItem("discountprice", discount);
    } else {
      setShow(true);
      setInput("");
    }
  }

  async function handleCheckoutOk() {
    const token = localStorage.getItem("user_accesstoken");
    const profile = localStorage.getItem("user_profile");
    const isMobileValid = /^[0-9]{10}$/.test(address.mobile);
    const isZipValid = /^[0-9]{6}$/.test(address.zip);

    if (
      address.name &&
      address.street &&
      address.city &&
      address.state &&
      isZipValid &&
      isMobileValid
    ) {
      toast({
        title: "Order Successful",
        description: `Thank you! Your order is confirmed and you'll be redirected to the home page shortly.`,
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      try {
        const total = Math.floor(totalPrice) - discount;

        const res = await axios.post(`${BACKEND_API}/checkout`, {
          token,
          address,
          total,
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
        description: `Please fill in all details carefully.`,
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  function handleCheckout() {
    const token = localStorage.getItem("user_accesstoken");

    if (token) {
      if (cartItems?.length > 0) {
        onOpen();
      } else {
        toast({
          description: `Please add items first.`,
          status: "error",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      }
    } else {
      toast({
        description: `Please login first.`,
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
      navigate("/login")
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
      flexDirection={["column", "column", "row"]}
      mt="12vh"
      justifyContent="space-between"
      gap="2rem"
      p="2rem"
    >
      <Box flex="1">
        {cartItems?.length === 0 ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            <Image
              src="https://media.tenor.com/2UPyt6TKuWgAAAAM/marflrt.gif"
              alignSelf="center"
              maxW={["100%", "80%", "60%"]}
            />
            <Text mt={4}>Cart is Empty</Text>
          </Box>
        ) : (
          <ul>
            {cartItems?.map((item) => (
              <CartCard key={item.id} product={item} CartScreen />
            ))}
          </ul>
        )}
      </Box>
      <Box p="1rem" flexBasis={["100%", "100%", "30%"]} maxW="500px">
        <Box justifyContent="space-between" gap="1.3rem" display="flex">
          <Input
            type="text"
            placeholder="Enter Coupon Code"
            value={input}
            width="100%"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={handleDiscount} colorScheme="green">
            Apply
          </Button>
        </Box>
        <Box fontSize="17px" fontWeight="600" width="100%" mt="1rem">
          <Box justifyContent="space-between" gap="2rem" display="flex">
            <Text>Price :</Text>
            <Text>${totalPrice.toFixed(0)}</Text>
          </Box>
          <Box justifyContent="space-between" gap="2rem" display="flex">
            <Text>Discount :</Text>
            <Text>${discount}</Text>
          </Box>
          <Box justifyContent="space-between" gap="2rem" display="flex">
            <Text>Total Amount :</Text>
            <Text>
              ${discount === 0 ? totalPrice.toFixed(0) : ((totalPrice * 90) / 100).toFixed(0)}
            </Text>
          </Box>
        </Box>
        <Button
          w="100%"
          mt="1rem"
          border="2px"
          borderRadius="5px"
          bg="#000000"
          color="#fff"
          _hover={{ color: "black", bg: "#fff", boxShadow: "0 0 10px black" }}
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalBody>
            <Text fontSize="16px" fontWeight="600">
              Thank you for choosing Ecore! To ensure a seamless delivery, please provide your shipping address so we can send you the order details to your email.
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
              onClick={handleCheckoutOk}
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
