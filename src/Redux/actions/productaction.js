
import {PRODUCT_REQUEST, PRODUCT_SUCCESS } from "../ActionTypes"
import axios from 'axios'
export const getProduct=()=> async (dispatch)=>{

    dispatch({
        type:PRODUCT_REQUEST
    })
    
  await axios.get("https://fakestoreapi.com/products").then((res)=>{
      dispatch({
        type:PRODUCT_SUCCESS,
        payload:res.data,
      })
   }).catch((error)=>{
    dispatch({
        type:PRODUCT_SUCCESS,
        payload:error,
    })
   })
}

 
export const getProductbYCategory=(category)=> async (dispatch)=>{

  dispatch({
    type:PRODUCT_REQUEST
  })
  
await axios.get(`https://fakestoreapi.com/products/category/${category}`).then((res)=>{
    dispatch({
      type:PRODUCT_SUCCESS,
      payload:res.data,
    })
 }).catch((error)=>{
  dispatch({
    type:PRODUCT_SUCCESS,
      payload:error,
  })
 })
}

export const getSortProductsbyPrice=(order)=> async (dispatch,getState)=>{

  dispatch({
    type:PRODUCT_REQUEST
  })
  
  let dataArr  = getState().products;

  const products =  dataArr.products.sort((a,b)=>{
    if(order==='asc'){
      return a.price-b.price
    }else{
      return b.price-a.price
    }
  })
  dispatch({
    type:PRODUCT_SUCCESS,
    payload:products
  })
  
}

export const getSortProductsbyRating=(order)=> async (dispatch,getState)=>{

  dispatch({
    type:PRODUCT_REQUEST
  })
  
  let dataArr  = getState().products;

  const products =  dataArr.products.sort((a,b)=>{
    if(order==='asc'){
      return a.rating.rate-b.rating.rate
    }else{
      return b.rating.rate-a.rating.rate
    }
  })
  dispatch({
    type:PRODUCT_SUCCESS,
    payload:products
  })
  
}


 