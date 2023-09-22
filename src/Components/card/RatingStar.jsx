import { Box } from '@chakra-ui/react';
import React from 'react'
import {AiFillStar} from 'react-icons/ai'
 const RatingStar = ({rate}) => {
    let stars =  [1,2,3,4,5];
  return (
     <Box display="flex" flexDirection="row" gap="2">
       {
        stars.map((elm)=>{
            return <AiFillStar color={elm<=rate?"#38A169":"gray"} size={25}  />
        })
       } 
     </Box>
  )
}

export default RatingStar
