import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
  VStack,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import RatingStar from "./RatingStar";
import { useDispatch, useSelector } from "react-redux";
import { setTotalPrice, setcartItems } from "../../Redux/actions/cartaction";
import { handleAddToCart } from "./comoncard";

const ProductDetailCard = ({ product }) => {
  const dispatch = useDispatch();
  const toast = useToast(); // Initialize useToast for showing toast messages
  const { totalPrice } = useSelector((state) => state.cart);
  const [choosed, setchoosed] = useState(false);

  const btnarr = [
    { size: "S", border: "0 solid black" },
    { size: "M", border: "1px solid black" },
    { size: "L", border: "2px solid black" },
    { size: "XL", border: "3px solid black" },
    { size: "XXL", border: "3px solid black" },
  ];

  function selectSizethenCart() {
    // Check if the product is already in the cart
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const isProductInCart = cartItems.some(
      (item) => item.id === product.id
    );

    if (isProductInCart) {
      // Show a toast message if the product is already in the cart
      toast({
        title: "Product already in cart.",
        description: `${product.title.slice(0, 20)} is already in your cart.`,
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      // Proceed with adding product to cart via Redux and show success message
      if (
        choosed ||
        (product.category !== "men's clothing" &&
          product.category !== "women's clothing")
      ) {
        handleAddToCart(product, dispatch, totalPrice, choosed); // Existing function to add product to cart
        // Show a success toast notification
        toast({
          title: "Product added to cart.",
          description: `${product.title.slice(0, 20)} has been added to your cart.`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: `You haven't chosen a size`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    }
  }

  return (
    <Box
      w="90%"
      maxW="950px"
      mt="18vh"
      mb="6vh"
      ml={{ base: "auto", md: "1rem" }}
      mr={{ base: "auto", md: "1rem" }}
      p={{ base: "1rem", md: "1.5rem" }}
      borderRadius="5px"
      boxShadow="0 0 10px black"
      position="relative"
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing="10"
        align="flex-start"
      >
        <Image src={product.image} w={{ base: "100%", md: "250px" }} objectFit="cover" />
        <VStack align="start" spacing="1rem" w="full">
          <Heading fontSize={{ base: "20px", md: "25px" }}>{product.title}</Heading>
          <Text fontSize={{ base: "16px", md: "18px" }} fontWeight="600">
            Price: ${product.price}
          </Text>

          <Stack direction="row" spacing="1rem">
            <RatingStar rate={product.rating.rate} />
            <Text fontWeight="600">{product.rating.count} reviews</Text>
          </Stack>

          {(product.category === "men's clothing" ||
            product.category === "women's clothing") && (
            <HStack>
              {btnarr.map((elm, index) => (
                <Button
                  key={index}
                  border={elm.border}
                  _focus={{
                    backgroundColor: "black",
                    color: "#fff",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
                  }}
                  onClick={() => {
                    setchoosed(true);
                    localStorage.setItem(
                      `selected_size_of_${product.id}`,
                      elm.size
                    );
                  }}
                >
                  {elm.size}
                </Button>
              ))}
            </HStack>
          )}

          <Text>Description: {product.description}</Text>
        </VStack>
      </Stack>
      <Flex justifyContent="flex-end" w="100%" mt="1rem">
        <Button
          color="#fff"
          bg="black"
          border="2px solid black"
          _hover={{ color: "black", bg: "#fff", boxShadow: "0 0 10px black" }}
          onClick={selectSizethenCart} // Use the function that includes toast
        >
          Add to Cart
        </Button>
      </Flex>
    </Box>
  );
};

export default ProductDetailCard;
