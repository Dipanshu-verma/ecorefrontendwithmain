import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProduct,
  getProductbYCategory,
  getSortProductsbyPrice,
  getSortProductsbyRating,
} from "../../../Redux/actions/productaction";
import CardProd from "../../card/Card";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Select,
  Skeleton,
  Flex,
} from "@chakra-ui/react";

import benner from "../../../bennerproduct.jpg";

const ProductScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  function Handlefilter(e) {
    if (e.target.value === "All") {
      dispatch(getProduct());
    } else {
      dispatch(getProductbYCategory(e.target.value));
    }
  }

  let { products, loading } = useSelector((state) => state.products);

  function handleSortPrice(e) {
    dispatch(getSortProductsbyPrice(e.target.value));
  }

  function handleSortrating(e) {
    dispatch(getSortProductsbyRating(e.target.value));
  }

  return (
    <Box mt='-2.5vh'>
      <Box width="100%" overflow="hidden">
        <Image
          src={benner}
          alt="Banner"
          className="benner_img"
          width="100%"
          display="block"
          height={["30vh", "50vh", "70vh", "82vh"]}
        />
      </Box>
      <Flex
        onClick={Handlefilter}
        wrap="wrap"
        alignItems="center"
        gap=".5rem"
        justifyContent="center"
        my="2rem"
      >
        <Button variant="outline" fontWeight="700" colorScheme="green" value="All">
          All
        </Button>
        <Button variant="outline" fontWeight="700" colorScheme="green" value="men's clothing">
          Men's cloth
        </Button>
        <Button variant="outline" fontWeight="700" colorScheme="green" value="women's clothing">
          Women's cloth
        </Button>
        <Button variant="outline" fontWeight="700" colorScheme="green" value="jewelery">
          Jewellery
        </Button>
        <Button variant="outline" fontWeight="700" colorScheme="green" value="electronics">
          Electronics
        </Button>
      </Flex>
      <Box display="flex" justifyContent="space-between" px="2rem" flexWrap="wrap">
        <Select
          placeholder="Sort by Price"
          fontWeight="700"
          size="sm"
          w={["100%", "auto"]}
          onChange={handleSortPrice}
          mb={["1rem", "0"]}
        >
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </Select>
        <Select
          placeholder="Sort by Rating"
          size="sm"
          w={["100%", "auto"]}
          fontWeight="700"
          onChange={handleSortrating}
        >
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </Select>
      </Box>
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]}
        gap={6}
        p="2rem"
      >
        {!loading
          ? products.map((product) => (
              <GridItem key={product.id} h="100%">
                <CardProd product={product} productscreen />
              </GridItem>
            ))
          : [...Array(20)].map((_, index) => (
              <Box key={index} width="100%">
                <Skeleton height={"50vh"} width="100%" mb=".5rem" />
                <Skeleton height={"10vh"} width="100%" />
              </Box>
            ))}
      </Grid>
    </Box>
  );
};

export default ProductScreen;
