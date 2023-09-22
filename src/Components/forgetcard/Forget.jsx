import React, { useState } from "react";
import "./forget.scss";
import axios from "axios";
import { Button, HStack, Modal, ModalBody, ModalContent, ModalOverlay, PinInput, PinInputField, Text, VStack, useDisclosure, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const Forget = () => {
  const [email, setEmail] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const[otp,setOtp]=useState("")
  const toast = useToast();
  const [pin, setpin] = useState({
    first: "",
    sec: "",
    third: "",
    fourth: "",
    
  });
const navigate =  useNavigate()
const BACKEND_API = "https://ecorebackendappi.onrender.com"
 
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post( `${BACKEND_API}/forget`, { email });

      toast({
        title: "Email Sent",
        description: `A one-time password (OTP) has been sent to ${email}. Please check your inbox.`,
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });

       
      onOpen();
      setOtp(res.data.otp)
    
    } catch (err) {
        toast({
          title: "Password Reset Failed",
          description: "Email not found. Please verify your email or sign up.",
            status: "error",
            position: "top",
            duration: 2000,
            isClosable: true,
          });
    }
  };

  const handleOTPSubmit = () => {
    const enteredOTP = `${pin.first}${pin.sec}${pin.third}${pin.fourth}`;

    
    if (Number(enteredOTP) === otp) {
       
      onClose();
      navigate("/confirm")
      localStorage.setItem("forget_email",email)
      
    } else {
       
      toast({
        description: "Invalid OTP, please try again.",
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>

   
    <div className="password-forget-card">
      <h2>Forgot Password?</h2>
      <p>Enter your email address to reset your password.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>

<Modal isOpen={isOpen}>
                  <ModalOverlay>
                    <ModalContent>
                      <ModalBody>
                        <VStack>
                          <Text fontSize={"25px"} fontWeight={"600"}>
                            OTP Verification
                          </Text>
                          
                          <Text fontSize={"15px"} pb={"20px"}>
                            Please enter the One-Time Password (OTP) you
                            received.
                          </Text>
                          <HStack mt={3} mx={3}>
                            <PinInput>
                              <PinInputField
                                onChange={(e) => {
                                  setpin({ ...pin, first: e.target.value });
                                }}
                              />
                              <PinInputField
                                onChange={(e) => {
                                  setpin({ ...pin, sec: e.target.value });
                                }}
                              />
                              <PinInputField
                                onChange={(e) => {
                                  setpin({ ...pin, third: e.target.value });
                                }}
                              />
                              <PinInputField
                                onChange={(e) => {
                                  setpin({ ...pin, fourth: e.target.value });
                                }}
                              />
                            </PinInput>
                          </HStack>
                          <HStack>
                            <Text fontSize={"12px"} pt={"15px"}>
                              Haven't received the OTP yet? Click here to{" "}
                            </Text>
                            <Text
                              onClick={handleSubmit}
                              color={"blue.400"}
                              fontWeight={"500"}
                              fontSize={"12px"}
                              pt={"15px"}
                              cursor={"pointer"}
                            >
                              RESEND
                            </Text>
                          </HStack>
                        </VStack>
                      </ModalBody>
                      <Button
                        colorScheme="blue"
                        m={5}
                        onClick={handleOTPSubmit}
                      >
                        Enter OTP
                      </Button>
                    </ModalContent>
                  </ModalOverlay>
                </Modal>

                </>
  );
};

export default Forget;
