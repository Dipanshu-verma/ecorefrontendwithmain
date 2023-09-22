import React, { useState } from 'react';
import './confirm.scss'; 
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
const Confirm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
const navigate =  useNavigate()
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const BACKEND_API = "https://ecorebackendappi.onrender.com"
  

  function validatePassword(password) {
    return /\d/.test(password) && /[!@#$%^&*]/.test(password);
  }

  const handleResetPassword = async(e) => {
 e.preventDefault();
    if (newPassword === confirmPassword) {
     
      if(!validatePassword(newPassword)) {
        return toast({
          title: "Password Reset Failed",
          description: `Password must contain at least 1 symbol and 1 number!
          `,
          status: "success",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
       
      }
       const email  =  localStorage.getItem("forget_email")

       try {
      const res  =  await axios.post(`${BACKEND_API}/confirm`, {email,password:newPassword})
      toast({
        title: "Password Reset Completed",
        description: "Your password has been successfully reset.",
        status: "success",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
      setTimeout(()=>{

navigate("/login")

      },1000)
        
       } catch (error) {
        console.log(error.response.data.message);
       }

    } else {
       
      toast({
        title: "Password Reset Failed",
        description: "The entered passwords do not match. Please try again.",
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="password-forget-card">
 
     
    <form onSubmit={handleResetPassword}>
      <div className="form-group">
        <label>New Password:</label>
        <input
          type="text"
          placeholder="Password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Confirm password:</label>
        <input
          type="password"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
      </div>
      <button type="submit">Reset Password</button>
    </form>
  </div>
  );
};

export default Confirm;
