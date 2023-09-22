import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import "./login.scss";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { LoginWithgoogle, loginNormal } from "../../Redux/actions/authaction";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [show, setShow] = useState(false);
  const [login, setlogin] = useState(true);
  const [pass, setpass] = useState(true);

  const [namevalue, setnamevalue] = useState("");
  const [emailvalue, setemailvalue] = useState("");
  const [passwordvalue, setpasswordvalue] = useState("");

  const formref = useRef();
  const toast = useToast({
    position: "top",
  });
  function passwordhandle() {
    setShow(!show);
  }
  const navigate = useNavigate();
  function handlelogin() {
   setpass(true)
    if (login) {
      navigate("/register");
    } else {
      navigate("/login");
    }
    
    setlogin(!login);
    setnamevalue("");
    setemailvalue("");
    setpasswordvalue("");
  }
const BACKEND_API = "https://ecorebackendappi.onrender.com"
  async function handleform(e) {
    e.preventDefault();

    if (!validatePassword(passwordvalue)) {
      setpass(false);
      return;
    }
    setpass(true);

    if (!login) {
      try {
        const user = {
          name: namevalue,
          email: emailvalue,
          password: passwordvalue,
        };
        const response = await axios.post(
          `${BACKEND_API}/register`,
          user
        );

        console.log(response, "res");
        toast({
          title: "Account Created Successfully",
          description: "Your account has been successfully created.",
          status: "success",
          duration: 1000,
          isClosable: true,
        });

        setTimeout(() => {
          navigate("/login");
        }, 1000);

        setlogin(true);
      } catch (err) {
         
        toast({
          title: "Account Already Exists",
          description: "An account with this email already exists. Please sign in or use a different email.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } else {
      try {
        const user = { email: emailvalue, password: passwordvalue };
        const response = await axios.post(`${BACKEND_API}/login`, user);

        localStorage.setItem("user_accesstoken", response.data.token);

        toast({
          title: "Sign In Successful",
          description: "You have successfully signed in.",
          status: "success",
          duration: 1000,
          isClosable: true,
        });

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (err) {
        console.log(err);

        toast({
          title: "Sign in failed",
          description:"Wrong Credentials",
          status: "error",
          duration: 2000,
          isClosable: true,
        });


      }
    }

    setemailvalue("");
    setpasswordvalue("");
  }

  function validatePassword(password) {
    return /\d/.test(password) && /[!@#$%^&*]/.test(password);
  }
  const { accesstoken } = useSelector((state) => state.auth);

  if (localStorage.getItem("user_accesstoken")) {
    navigate("/");
  }

  const dispatch = useDispatch();
  function handleLoginWithgoogle() {
    dispatch(LoginWithgoogle());
  }

  const handleforget = ()=>{
    navigate("/forget")
  }
  return (
    <Box w="md" className="container">
      <Box textAlign="center">
        <Text fontSize="1.6rem" fontWeight="700" mb=".6rem">
          {" "}
          {login ? "Login to your account " : "Create an Account "}{" "}
        </Text>
        <Text>
          {" "}
          {login ? "Don't have an account? " : "Already have an account? "}
          <a onClick={handlelogin} className="ancor">
            {login ? "Sign up" : "Login"}
          </a>
        </Text>
      </Box>

      <form ref={formref} onSubmit={handleform}>
        {!login && (
          <>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Name"
                mb="1.2rem"
                value={namevalue}
                onChange={(e) => setnamevalue(e.target.value)}
              />
            </FormControl>
          </>
        )}
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Email"
            mb="1.2rem"
            value={emailvalue}
            required
            onChange={(e) => setemailvalue(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type={show ? "text" : "password"}
            mb="1.2rem"
            placeholder="Password"
            required
            value={passwordvalue}
            onChange={(e) => setpasswordvalue(e.target.value)}
          />
        </FormControl>
        <p onClick={handleforget} className={login?"forget_password":"hideforget_password"}>Forgot password?</p>
        <p className="errormassege">
          {!pass
            ? "Password should contain atleast 1 symbol and 1 number"
            : ""}
        </p>
        {show ? (
          <BsFillEyeSlashFill
            className={pass ? "eyeshow" : "eyeshow aftererroreye"}
            size={20}
            onClick={passwordhandle}
          />
        ) : (
          <BsFillEyeFill
            size={20}
            className={pass ? "eyeshow" : "eyeshow aftererroreye"}
            onClick={passwordhandle}
          />
        )}

        <Button w="100%" type="submit" colorScheme="blue" mt="2rem">
          {!login ? "Create Account" : "Sign in"}{" "}
        </Button>
   <Box
          display="flex"
          gap="1rem"
          mt="2rem"
          py=".5rem"
          borderRadius="3px"
          backgroundColor="rgb(227, 227, 227)"
          border="1px solid gray"
          justifyContent="center"
          onClick={handleLoginWithgoogle}
        >
          <Text>Continue with </Text>

          <Image
            w="1.6rem"
            cursor="pointer"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png"
          />
        </Box>
 
        
      </form>
    </Box>
  );
};

export default Login;
