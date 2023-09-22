import { ADD_CART_SUCCESS, TOTAL_PRICE_UPDATE } from "../ActionTypes"



export const setcartItems=(products) =>(dispatch)=>{

       
      dispatch({
            type:ADD_CART_SUCCESS,
            payload:products,
        })

}

export const setTotalPrice=(price) =>(dispatch)=>{

       
    dispatch({
          type:TOTAL_PRICE_UPDATE,
          payload:price,
      })

}