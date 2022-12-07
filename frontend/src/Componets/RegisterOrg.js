import React from 'react'
import {Form,Button,Row,Col,Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { Register } from '../actions/OrgActions'
import { useEffect,useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate,useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import axios from 'axios'


const RegisterOrg = () => {



    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image',file)
        try {
          const config = {
            headers:{
              'Content-Type':'multipart/form-data'
            }
          }
          const {data} = await axios.post('/api/upload',formData,config)
          setImage(data)
        } catch (error) {
          console.log(error)
        }
    
      }


    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [image,setImage] = useState('')
    const [description,setDescription] = useState('')


    const dispatch = useDispatch()

    const orgLogin = useSelector(state=>(state.OrgLogin))
    const {loading,error,userInfo} =orgLogin

    const navigate = useNavigate();
    const location = useLocation();

    const redirect ='/OrgHomePage'

    useEffect(()=>{
        if(userInfo && Object.keys(userInfo).length!==0 ){
          navigate(redirect)
        }
    },[userInfo])
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(Register(name,email,password,image,description))
    }


  return (
    <Container>
    <Row className='justif-content-md-center'>
        <Col xs={12} md={6}>
        <h1>Register</h1>
    {error && <Alert variant='danger'>{error}</Alert>}
    <Form onSubmit={submitHandler}>

        <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
        </Form.Group>

         <Form.Group controlId='email'>
            <Form.Label>Email Adress</Form.Label>
                <Form.Control type='email' placeholder='enter email' value={email} onChange={(e)=>{setEmail(e.target.value)}}>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='description'>
            <Form.Label>Organization description</Form.Label>
                <Form.Control type='text' placeholder='enter description' value={description} onChange={(e)=>{setDescription(e.target.value)}}>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId="formFileLg" className="mb-3 mt-3">
                <Form.Label>Profile Picture</Form.Label>
                  <Form.Control type="file" label='Choose File' size="sm" onChange={uploadFileHandler} />
                  </Form.Group>

        <Form.Group controlId='password'>
            <Form.Label>Password </Form.Label>
                <Form.Control type='password' placeholder='enter password' value={password} onChange={(e)=>{setPassword(e.target.value)}}>
            
                </Form.Control>
        </Form.Group>
        <Form.Group><Button className='my-3' type='submit' variant='primary' >Register</Button> 
        </Form.Group>
    
</Form>


</Col>
    </Row>
</Container>
  )
}

export default RegisterOrg