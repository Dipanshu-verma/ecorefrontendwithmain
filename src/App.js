import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Header/Navbar';
import Home from './Components/Screens/homescreen/Home';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ProductDetails from './Components/Screens/ProductDetails';
import ProductScreen from './Components/Screens/productscreen/ProductScreen';
import CartScreen from './Components/Screens/cartscreen/CartScreen';
import footer  from './footerpart.png'
import Login from './Components/login/Login';
import Forget from './Components/forgetcard/Forget';
import Confirm from './Components/confirmPassword/Confirm';
 function Layout(){
  return(
    <>
     <Navbar/>
     <Home/>
    </>
  )
}

 


function App() {

   
  const location = useLocation();

  
  const hideNavbarRoutes = ['/confirm', '/forget'];

 
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  return (
    <>
    
    {!shouldHideNavbar && <Navbar />}

     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Login/>} />
      <Route path='/productdetail/:id' element={<ProductDetails/>}/>
      <Route path='/Products' element={<ProductScreen/>} />
      <Route path='/cartpage' element={<CartScreen/>} />
      <Route path='/forget' element={<Forget/>} />
      <Route path='/confirm' element={<Confirm/>} />
      <Route/>
      <Route/>
    </Routes>  

    {!shouldHideNavbar && <img src={footer} alt="" />}
   
    {/* <div className="App">
    
    </div>*/}
    </>
  );
}

export default App;
