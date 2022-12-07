import React,{useState,useEffect} from 'react'
import {Container, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { Link,useNavigate,useLocation} from 'react-router-dom'
import {Login} from '../actions/OrgActions'
import { useDispatch, useSelector } from 'react-redux'

const LoginOrg = () => {

  
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state=>(state.OrgLogin))
    const {loading,error,userInfo} =userLogin

    const navigate = useNavigate();
    const location = useLocation();

    const redirect = location.search ? location.search.split('=')[1] : '/OrgHomePage'

    useEffect(()=>{
        if(userInfo && Object.keys(userInfo).length!==0 ){
    
            navigate(redirect)
        }
    },[userInfo])
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(Login(email,password))
    }


  return (
    <Container>
    <Row className='justif-content-md-center'>
        <Col xs={12} md={6}>
<h1>Sign In</h1>
{error && <Alert variant='danger'>{error}</Alert>}
<Form onSubmit={submitHandler}>
    <Form.Group controlId='email'>
        <Form.Label>Email Adress</Form.Label>
        <Form.Control type='email' placeholder='enter email' value={email} onChange={(e)=>{setEmail(e.target.value)}}>

        </Form.Control>
    </Form.Group>
    <Form.Group controlId='password'>
        <Form.Label>Password </Form.Label>
        <Form.Control type='password' placeholder='enter password' value={password} onChange={(e)=>{setPassword(e.target.value)}}>
            
        </Form.Control>

    </Form.Group>
    <Form.Group><Button className='my-3' type='submit' variant='primary' >Sign In</Button></Form.Group>
    
</Form>

</Col>
    </Row>
</Container>
  )
}

export default LoginOrg