import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Input,
  Text,
  border,
  useDisclosure,
  useTheme,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import CartCard from "../card/cartCard";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/actions/authaction";

import "./navbar.scss";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const { accesstoken, profile } = useSelector((state) => state.auth);

  const nagivate = useNavigate();
 
  function handleLoginUser() {
    nagivate("/login");
  }
  const dispatch = useDispatch();
  function handleLogout() {
    localStorage.removeItem("user_accesstoken");
    localStorage.removeItem("user_profile");
    dispatch(logoutUser());
  }

  return (
    <div style={{ position: "fixed", width: "100%", top: "0", zIndex: "100" }}>
      <Flex
        bg="#F7FAFC"
        justifyContent="space-between"
        align="center"
        p="1.1rem"
        px="2rem"
        fontSize="1.3rem"
      >
        <Center
          ml="7%"
          fontSize="26px"
          fontWeight="700"
          letterSpacing="2px"
          color="RGBA(0, 0, 0, 0.92)"
        >
          ECO<span style={{color:"green"}}>RE</span> 
        </Center>
        <Flex justifyContent="space-between" alignItems="center" gap="2rem">
          <Link to="/">Home</Link>
          <Link to="/Products">Products</Link>
          <Link>About</Link>
          {accesstoken || localStorage.getItem("user_accesstoken") ? (
            <Box display="flex" gap=".6rem" alignItems="center">
              {
                <Image
                  src={
                    profile?profile?.photoURL
                      : "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
                  }
                  borderRadius="50%"
                  width="35px"
                  height="35px"
                />
              }
              <Button border="1px solid gray" backgroundColor="#fff" onClick={handleLogout}>
                {" "}
                Logout{" "}
              </Button>{" "}
            </Box>
          ) : (
            <Button onClick={handleLoginUser} leftIcon={<AiOutlineLogin />}>
              {" "}
              Login{" "}
            </Button>
          )}

          <Center
            ref={btnRef}
            color="#000000"
            onClick={onOpen}
            position="relative"
          >
            <BsFillCartFill size={"2rem"} />
            <span
              className={
                cartItems?.length === 0 ? "hide_cart_icon" : "cart_icon"
              }
            >
              {cartItems?.length}
            </span>
          </Center>

          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
            size="md"
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader color="red">
                Cart Items <span> {cartItems?.length} </span>{" "}
              </DrawerHeader>

              <DrawerBody>
                {cartItems?.length === 0 ? (
                  <Box display="flex" flexDirection="column" alignItems="center">
                     <Image src="https://media.tenor.com/2UPyt6TKuWgAAAAM/marflrt.gif" alignSelf="center"/>
                      <h1>Cart is Empty</h1>
                     </Box>
                ) : (
                  <ul>
                    {cartItems?.map((item) => (
                      <CartCard product={item} />
                    ))}
                  </ul>
                )}
              </DrawerBody>

              <DrawerFooter flexDirection="column">
                <Button
                  border="2px"
                  width="97%"
                  borderRadius="5px"
                  bg="#000000"
                  color="#fff"
                  mb="1rem"
                  _hover={{
                    color: "black",
                    bg: "#fff",
                    boxShadow: "0 0 10px black",
                  }}
                  onClick={()=>{nagivate("/cartpage");onClose()}}
                >
                  View cart
                </Button>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                  alignItems="center"
                >
                  <Text fontSize="20px" fontWeight="600">
                    Total Price : $ {totalPrice.toFixed(0)}
                  </Text>

                  <Button
                    border="2px"
                  
                  borderRadius="5px"
                  bg="#000000"
                  color="#fff"
                  mb="1rem"
                  display={cartItems?.length === 0 ?"none":"inline"}
                  _hover={{
                    color: "black",
                    bg: "#fff",
                    boxShadow: "0 0 10px black",
                  }}
      
                    fontSize="1rem"
                    onClick={()=>{nagivate("/cartpage"); onClose()}}
                     
                  >
                    PROCEED
                  </Button>
                </Box>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Flex>
    </div>
  );
};

export default Navbar;
