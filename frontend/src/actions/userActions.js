import axios from "axios"
import { success,request,fail, logout} from "../reducers/veteranReducer"
import { successVeteranList,requestVetranList,failVeteranList} from "../reducers/veteranReducer"

export const Login = (email,password) => async (dispatch) => {
    
    try {
        dispatch(request())
        const config ={
             headers:{
                'Content-Type':'application/json'
             }
        }
        const { data } = await axios.post('/api/Veteran',{email,password},config)
        dispatch(success(data))

        localStorage.setItem('userInfo',JSON.stringify(data))
      
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(fail(error))
    }

  }

 export const Register = (name,email,password,image,) => async (dispatch) => {
    try {
        dispatch(request())
        const config ={
              headers:{
                'Content-Type':'application/json'
              }
        }
        const { data } = await axios.post('/api/Veteran/register',{name,email,password,image},config)
        dispatch(success(data))
        localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(fail(error))
    }
  }


  export const GetVeteranList = (Keyword = '') => async (dispatch) => {
    try {
        dispatch(requestVetranList())
        const { data } = await axios.get(`/api/Veteran?Keyword=${Keyword}`)
        console.log(data)
        dispatch(successVeteranList(data))
        localStorage.setItem('veteranInfo',JSON.stringify(data))
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(failVeteranList(error))
    }
  }


  export const Logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch(logout())
  }


