import firebase from 'firebase/compat/app';
import auth from "../../firebaseauth";
import { LOGIN_FAIL, LOGIN_PROFILE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST, LOGOUT_SUCCESS } from '../ActionTypes';

export const LoginWithgoogle=()=> async (dispatch)=>{
   
try{

    dispatch({
        type:LOGIN_REQUEST
    })

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/userinfo.profile")
      let res = await auth.signInWithPopup(provider);  
    
      
      const accessToken = res.credential.accessToken;

      const profile= {
        name:res.additionalUserInfo.profile.name,
        photoURL:res.additionalUserInfo.profile.picture,
      }
    
      localStorage.setItem("user_accesstoken", accessToken);
      localStorage.setItem("user_profile", JSON.stringify(profile));

      dispatch({
        type:LOGIN_SUCCESS,
        payload:accessToken,
      })
      dispatch({
        type:LOGIN_PROFILE,
        payload:profile,
      })



}catch(error){

    console.error(error.message);
    dispatch({
      type:LOGIN_FAIL,
      payload:error.message
    })


}



}

 




export const logoutUser = ()=> async (dispatch)=>{

try{

dispatch({
  type:LOGOUT_SUCCESS
})



}catch(error){
  console.log(error);
}



}