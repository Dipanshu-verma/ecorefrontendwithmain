import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, getProductbYCategory, getSortProductsbyPrice, getSortProductsbyRating } from '../../../Redux/actions/productaction';
import CardProd from '../../card/Card';
import { Box, Button, Grid, GridItem, Select, Skeleton } from '@chakra-ui/react';
 
import benner from '../../../bennerproduct.jpg'
const ProductScreen = () => {

const dispatch =  useDispatch();

useEffect(()=>{
dispatch(getProduct())
 
},[dispatch])

 function Handlefilter(e){
 
    if(e.target.value==='All'){
      dispatch(getProduct());
       
    }else{
      dispatch(getProductbYCategory(e.target.value));
    }
    
 }

 let {products,loading} =  useSelector(state=>state.products);
 

 function handleSortPrice(e){
  dispatch(getSortProductsbyPrice(e.target.value))
  
 }
 function handleSortrating(e){
  dispatch(getSortProductsbyRating(e.target.value))
 }

return (
    <div>
       <img src={benner} alt="" style={{height:"90vh",width:"100%",marginTop:"13vh"}}/>

        <Box onClick={Handlefilter}  display="flex" alignItems="center" gap=".5rem" justifyContent="center" my="2rem" >
          <Button variant='outline' fontWeight="700" colorScheme='green' value="All">All</Button>
          <Button variant='outline' fontWeight="700" colorScheme='green' value="men's clothing">Men's cloth</Button>
          <Button variant='outline' fontWeight="700" colorScheme='green' value="women's clothing">Women's cloth</Button>
          <Button variant='outline' fontWeight="700" colorScheme='green' value="jewelery">Jewellery</Button>
          <Button variant='outline' fontWeight="700" colorScheme='green' value="electronics">Electronics</Button>
        </Box>
        <Box display="flex" justifyContent="space-between"  px="2rem">
        <Select placeholder='Sort by Price' fontWeight="700"  size="sm" w="10rem" onChange={handleSortPrice}>
 
  <option value='asc'>Low to High</option>
  <option value='desc'>High to Low</option>
</Select>
   <Select placeholder='Sort by Rating' size="sm" w="10rem" fontWeight="700" onChange={handleSortrating}>
  <option value='asc'>Low to High</option>
  <option value='desc'>High to Low</option>
</Select>
        </Box>
       <Grid templateColumns='repeat(4, 1fr)' gap={6} p="2rem" >
        {
           !loading? 
           products.map((product)=>{
           return <GridItem h="100%">
            <CardProd product={product} key={product.id} productscreen />
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
export default ProductScreen

