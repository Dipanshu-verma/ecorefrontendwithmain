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
  Text,
  useDisclosure,
  useBreakpointValue,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import CartCard from "../card/cartCard";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/actions/authaction";

import "./navbar.scss";

const Navbar = () => {
  const { isOpen: isCartOpen, onOpen: onCartOpen, onClose: onCartClose } = useDisclosure();
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();

  const btnRef = React.useRef();

  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const { accesstoken, profile } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Show Hamburger menu for screens 650px or less
  const showHamburger = useBreakpointValue({ base: true, md: false }, {
    fallback: 'base',
  });

  function handleLoginUser() {
    navigate("/login");
  }

  function handleLogout() {
    localStorage.removeItem("user_accesstoken");
    localStorage.removeItem("user_profile");
    dispatch(logoutUser());
  }

  return (
    <Box
      position="fixed"
      width="100%"
      maxHeight="10vh"
      top="0"
      zIndex="100"
      bg="#F7FAFC"
      p={["0.8rem", "1.1rem"]}
      boxShadow="sm"
    >
      <Flex justifyContent="space-between" align="center" px={["1rem", "2rem"]} fontSize={["1rem", "1.3rem"]}>
        <Center fontSize={["20px", "26px"]} fontWeight="700" letterSpacing="2px" color="RGBA(0, 0, 0, 0.92)">
          ECO<span style={{ color: "green" }}>RE</span>
        </Center>

        {/* Responsive Menu Toggle Button */}
        {showHamburger ? (
          <IconButton
            icon={<HamburgerIcon />}
            onClick={onMenuOpen} // Opens menu
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        ) : (
          <Flex display="flex" justifyContent="space-between" alignItems="center" gap="2rem">
            <Link to="/">Home</Link>
            <Link to="/Products">Products</Link>

            {accesstoken || localStorage.getItem("user_accesstoken") ? (
              <Box display="flex" gap=".6rem" alignItems="center">
                <Image
                  src={profile ? profile.photoURL : "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"}
                  borderRadius="50%"
                  width="35px"
                  height="35px"
                />
                <Button border="1px solid gray" backgroundColor="#fff" onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
            ) : (
              <Button onClick={handleLoginUser} leftIcon={<AiOutlineLogin />}>
                Login
              </Button>
            )}

            <Center ref={btnRef} color="#000000" onClick={onCartOpen} position="relative">
              <BsFillCartFill size={"2rem"} />
              <span className={cartItems?.length === 0 ? "hide_cart_icon" : "cart_icon"}>{cartItems?.length}</span>
            </Center>
          </Flex>
        )}

        {/* Cart Drawer */}
        <Drawer isOpen={isCartOpen} placement="right" onClose={onCartClose} finalFocusRef={btnRef} size="md">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader color="red">
              Cart Items <span>{cartItems?.length}</span>
            </DrawerHeader>

            <DrawerBody>
              {cartItems?.length === 0 ? (
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Image src="https://media.tenor.com/2UPyt6TKuWgAAAAM/marflrt.gif" alignSelf="center" />
                  <h1>Cart is Empty</h1>
                </Box>
              ) : (
                <ul>
                  {cartItems?.map((item) => (
                    <CartCard key={item.id} product={item} />
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
                onClick={() => {
                  navigate("/cartpage");
                  onCartClose();
                }}
              >
                View cart
              </Button>
              <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
                <Text fontSize="20px" fontWeight="600">
                  Total Price : $ {totalPrice.toFixed(0)}
                </Text>
                <Button
                  border="2px"
                  borderRadius="5px"
                  bg="#000000"
                  color="#fff"
                  mb="1rem"
                  display={cartItems?.length === 0 ? "none" : "inline"}
                  _hover={{
                    color: "black",
                    bg: "#fff",
                    boxShadow: "0 0 10px black",
                  }}
                  fontSize="1rem"
                  onClick={() => {
                    navigate("/cartpage");
                    onCartClose();
                  }}
                >
                  PROCEED
                </Button>
              </Box>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        {/* Menu Drawer */}
        <Drawer isOpen={isMenuOpen} placement="left" onClose={onMenuClose} size="sm">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>

            <DrawerBody>
              <Flex flexDirection="column" alignItems="start" gap="1rem">
                <Link to="/" onClick={onMenuClose}>
                  Home
                </Link>
                <Link to="/Products" onClick={onMenuClose}>
                  Products
                </Link>
                <Link to="/cartpage" onClick={onMenuClose}>
                  Cart
                </Link>
                {accesstoken || localStorage.getItem("user_accesstoken") ? (
                  <Box display="flex" gap=".6rem" alignItems="center" mt="1rem">
                    <Image
                      src={profile ? profile.photoURL : "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"}
                      borderRadius="50%"
                      width="35px"
                      height="35px"
                    />
                    <Button
                      border="1px solid gray"
                      backgroundColor="#fff"
                      onClick={() => {
                        handleLogout();
                        onMenuClose();
                      }}
                    >
                      Logout
                    </Button>
                  </Box>
                ) : (
                  <Button
                    onClick={() => {
                      handleLoginUser();
                      onMenuClose();
                    }}
                    leftIcon={<AiOutlineLogin />}
                    mt="1rem"
                  >
                    Login
                  </Button>
                )}
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};

export default Navbar;
