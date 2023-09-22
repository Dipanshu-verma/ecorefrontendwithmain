import React, { useEffect } from 'react'
import benner from '../../../benner.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../../Redux/actions/productaction'
import { Box, Grid, GridItem, Skeleton } from '@chakra-ui/react'
import CardProd from '../../card/Card'
import "./home.scss"
const Home = () => {
const dispatch =  useDispatch();
useEffect(()=>{
 dispatch(getProduct())
},[dispatch])
 
const {products,loading} = useSelector(state=>state.products)
  
  return (
    <div>
       <img src={benner} alt="" className='benner_img'/>
       <h1>Latest Products</h1>
       <Grid templateColumns='repeat(4, 1fr)' gap={6} p="2rem" >
        {
           !loading? 
           products.map((product)=>{
           return <GridItem h="100%">
            <CardProd product={product} key={product.id} />
           </GridItem>
          }):[...Array(20)].map(()=>{
            return <Box>
            <Skeleton height={"50vh"} width="300px" mb=".5rem"/>
            <Skeleton height={"10vh"} width="300px"/>
            </Box> 
          })
        }
</Grid>
    </div>
  )
}

export default Home
