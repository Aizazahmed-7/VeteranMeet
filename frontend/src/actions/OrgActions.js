import axios from "axios"
import { success,request,fail,logout } from "../reducers/OrgReducer"
export const Login = (email,password) => async (dispatch) => {
    
    try {
        dispatch(request())
        const config ={
             headers:{
                'Content-Type':'application/json'
             }
        }
        const { data } = await axios.post('/api/Organization/login',{email,password},config)
        dispatch(success(data))
        localStorage.setItem('orgInfo',JSON.stringify(data))
      
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(fail(error))
    }

  }

 export const Register = (name,email,password,image,description) => async (dispatch) => {
    try {
        dispatch(request())
        const config ={
              headers:{
                'Content-Type':'application/json'
              }
        }
        const { data } = await axios.post('/api/Organization/register',{name,email,password,image,description},config)
        dispatch(success(data))
        localStorage.setItem('orgInfo',JSON.stringify(data))
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(fail(error))
    }
  }
  export const LogoutOrg = () => (dispatch) => {
    localStorage.removeItem('orgInfo')
    dispatch(logout())
  }


