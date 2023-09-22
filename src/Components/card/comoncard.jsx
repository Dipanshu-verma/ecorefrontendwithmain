import { setTotalPrice, setcartItems } from "../../Redux/actions/cartaction";



export const  handleAddToCart=(product,dispatch,totalPrice)=> {
    
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let exist = cartItems?.find((elm) => {
      return elm.id === product.id 
    });

    if (!exist) {
      
      cartItems.push(product);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      dispatch(setcartItems(cartItems))
       
      dispatch(setTotalPrice(totalPrice+Math.floor(product.price)));
    }
  }


  export const handleDelete = (product,dispatch,totalPrice)=>{
    let items = JSON.parse(localStorage.getItem("cartItems"))
    let index = items.findIndex(element => element.id === product.id);
     items.splice(index,1)
     let quan = localStorage.getItem(`quan_${product.id}`) || 1;
     quan = Number(quan);
     
     dispatch(setTotalPrice(totalPrice-(Math.floor(product.price)*quan)))
     localStorage.removeItem(`quan_${product.id}`)
     dispatch(setcartItems(items))
     localStorage.setItem("cartItems",JSON.stringify(items));
  }



  export const handleminus=(product,dispatch,totalPrice,setQuant)=> {
    let quan = localStorage.getItem(`quan_${product.id}`) || 1;
    quan = Number(quan);
    if (quan !== 1) {
      quan -= 1;
     
      setQuant(quan);
      localStorage.setItem(`quan_${product.id}`, quan);
      dispatch(setTotalPrice(totalPrice- Math.floor(product.price)))
    }
  }

  export const handleplus=(product,dispatch,totalPrice,setQuant)=> {
    let quan = localStorage.getItem(`quan_${product.id}`) || 1;
    quan = Number(quan);
     
    quan += 1;
   
    setQuant(quan);
    localStorage.setItem(`quan_${product.id}`, quan);
    dispatch(setTotalPrice(totalPrice+ Math.floor(product.price)))
    
  }


 
  