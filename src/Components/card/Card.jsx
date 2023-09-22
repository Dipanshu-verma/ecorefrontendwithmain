import {
  CardBody,
  Card,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  Button,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { setTotalPrice, setcartItems } from "../../Redux/actions/cartaction";
import { handleAddToCart } from "./comoncard";

const CardProd = ({ product, productscreen }) => {
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const{totalPrice} =  useSelector(state=>state.cart);
  function handleProductDetails() {
    navigate(`/productdetail/${product.id}`);
  }
 //what should i addd
  return (
    <Card maxW="sm" boxShadow="0 0 5px black" align="center">
      <CardBody onClick={handleProductDetails}>
        <Image src={product.image} boxSize="200px" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{product.title.slice(0, 20)}</Heading>

          <HStack spacing="4rem">
            <Text color="black" fontWeight="600" fontSize="xx">
              price: ${Math.floor(product.price)}
            </Text>
            <Text color="black" fontWeight="600" fontSize="xx">
              rating: {product.rating.rate}
            </Text>
          </HStack>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        {productscreen ? (
          <Button
            color="#fff"
            bg="black"
            border={"2px solid black"}
            _hover={{ color: "black", bg: "#fff", boxShadow: "0 0 10px black" }}
            onClick={()=>handleAddToCart(product,dispatch,totalPrice)}
          >
            Add to Cart
          </Button>
        ) : (
          <Button colorScheme="green" onClick={handleProductDetails}>
            Buy Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CardProd;
