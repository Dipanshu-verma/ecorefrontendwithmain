import { LOGIN_FAIL, LOGIN_PROFILE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../ActionTypes"


const intial ={
    accesstoken: localStorage.getItem("user_accesstoken")?localStorage.getItem("user_accesstoken"):null,
    profile:localStorage.getItem("user_profile")?JSON.parse(localStorage.getItem("user_profile")):null,
    loading:false,
    error:null
}

export const auth = (preState={...intial},action)=>{
  
const{type,payload} =action 


switch(type){
    case LOGIN_REQUEST:return{
        ...preState, loading:true
    }
    case LOGIN_FAIL:return{
        ...preState, error:null,loading:false,
    }
    case LOGIN_SUCCESS:return{
        ...preState, loading:false,accesstoken:payload
    }
    case LOGIN_PROFILE:return{
        ...preState, loading:false,profile:payload
    }
    case LOGOUT_SUCCESS:return{
       ...preState, accesstoken:null, profile:null,
    }
    default: return preState

}
}