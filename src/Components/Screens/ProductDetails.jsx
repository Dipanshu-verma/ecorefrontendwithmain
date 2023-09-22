import { useParams } from "react-router-dom";
import ProductDetailCard from "../card/ProductDetailCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Skeleton } from "@chakra-ui/react";

const ProductDetails = () => {
  const{id} =  useParams();

  const[product,setProduct] = useState({});
  const[loading,setLoading] = useState(true);
  
  useEffect(()=>{
   
    getProduct();
  },[id])

  async function getProduct(){
    setLoading(true);
   await axios.get(`https://fakestoreapi.com/products/${id}`).then((res)=>{
         setProduct(res.data);
         console.log(res.data);
  }).catch((error)=>{
    console.log(error)
  })
  setLoading(false);
   }

  
  return (
    <div>
      {
        loading?<Box display="flex" flexDirection="row" height="70vh" mt="5rem" p="2rem">
            <Skeleton   width="20%" mr=".5rem" />
            <Skeleton   width="65% "/>
            </Box>:<ProductDetailCard product={product} />
      }
 
     {/* <ProductDetailCard product={product} /> */}
     
    
    </div>
  );
};

export default ProductDetails;
