import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import RatingStar from "./RatingStar";
import { useDispatch, useSelector } from "react-redux";
import { setTotalPrice, setcartItems } from "../../Redux/actions/cartaction";
import { handleAddToCart } from "./comoncard";
import { color } from "framer-motion";

const ProductDetailCard = ({ product }) => {
  const dispatch = useDispatch();
  const toast = useToast({
    position: 'top'})
  const { totalPrice } = useSelector((state) => state.cart);
const[choosed, setchoosed] =  useState(false)
  console.log(product);
  const btnarr = [
    { size: "S", border: "0 solid black" },
    { size: "M", border: "1px solid black" },
    { size: "L", border: "2px solid black" },
    { size: "Xl", border: "3px solid black" },
    { size: "XXL", border: "3px solid black" },
  ];
   
   

  function selectSizethenCart(){
    if(choosed || (product.category !== "men's clothing" &&
    product.category !== "women's clothing")){
      handleAddToCart(product, dispatch, totalPrice,choosed)
    }else{
      toast({
        title: `you haven't choose size`,
        status: "error",
        isClosable: true,
      })
    }
    
  }
  return (
    <HStack
      w="80%"
      mt="18vh"
      mb="1rem"
      ml="1rem"
      position="relative"
      borderRadius="5px"
      gap="10"
      p="1.5rem"
      boxShadow="0 0 10px black"
    >
      <Image src={product.image} w="250px" objectFit="cover" />
      <Box display="flex" flexDirection="column" gap=".7rem" mb="4rem">
        <Heading fontSize="25px">{product.title}</Heading>
        <Text fontSize="18px" fontWeight="600">
          Price:${product.price}
        </Text>

        <Stack display="flex" flexDirection="row" gap="1rem">
          <RatingStar rate={product.rating.rate} />
          <Text fontWeight="600">{product.rating.count} reviews</Text>
        </Stack>

        {(product.category === "men's clothing" ||
          product.category === "women's clothing") && (
          <HStack>
            {btnarr.map((elm) => {
              return (
                <Button
                  border={elm.border}
                  _focus={{
                    backgroundColor: "black",
                    color: "#fff",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
                  }}
                  onClick={() =>{setchoosed(true)
                    localStorage.setItem(
                      `selected_size_of_${product.id}`,
                      elm.size
                    )
                  }}
                >
                  {elm.size}
                </Button>
              );
            })}
          </HStack>
        )}

        <Text>Description: {product.description}</Text>
      </Box>
      <Button
        color="#fff"
        bg="black"
        border={"2px solid black"}
        _hover={{ color: "black", bg: "#fff", boxShadow: "0 0 10px black" }}
        position="absolute"
        right="2rem"
        bottom="1.5rem"
        onClick={selectSizethenCart }
      >
        Add to Cart
      </Button>
    </HStack>
  );
};

export default ProductDetailCard;
