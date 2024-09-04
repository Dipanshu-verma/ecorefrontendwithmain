import React, { useEffect } from 'react';
import benner from '../../../benner.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../../Redux/actions/productaction';
import { Box, Grid, GridItem, Skeleton, Heading, Image } from '@chakra-ui/react';
import CardProd from '../../card/Card';
import "./home.scss";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const { products, loading } = useSelector((state) => state.products);

  return (
    <Box mt="-2.5vh">
      {/* Responsive Banner Image */}
      <Box width="100%" overflow="hidden">
        <Image
          src={benner}
          alt="Banner"
          className='benner_img'
          width="100%"
          display="block"
          height={["30vh", "50vh", "70vh", "82vh"]}   
        />
      </Box>

      <Heading as="h1" size="lg" my="1.5rem" textAlign="center">
        Latest Products
      </Heading>

      {/* Responsive Grid for Products */}
      <Box p={["1rem", "1.5rem", "2rem"]}>
        <Grid
          templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]}
          gap={6}
        >
          {
            !loading ?
              products.map((product) => (
                <GridItem h="100%" key={product.id}>
                  <CardProd product={product} />
                </GridItem>
              )) : [...Array(20)].map((_, index) => (
                <Box key={index}>
                  <Skeleton height={"50vh"} width="100%" mb=".5rem" />
                  <Skeleton height={"10vh"} width="100%" />
                </Box>
              ))
          }
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
