import { useEffect, useState } from "react"
import React from 'react'
import {Row,Col,Form,Button,Table} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import { Alert } from "react-bootstrap"
import axios from "axios"
import { useDispatch } from "react-redux"
import {success} from '../reducers/veteranReducer'

const Profile = () => {

    const dispatch = useDispatch()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [success2,setSuccess2] = useState(false)
    const [Hobbie,setHobbie] = useState('')
    const userLogin = useSelector(state=>(state.userLogin))
    const {loading,error,userInfo} =userLogin
    const [image,setImage] = useState('')
    const [occupation,setOccupation] = useState('')
const submitHandler = async (e) => {
    e.preventDefault()

    if(password!==''){

        const res = await axios.post('/api/veteran/updateVeteranProfile',{name,email,image,password,occupation,_id:`${userInfo._id}`})
        if(userInfo._id === res.data._id){
            setSuccess2(true)
            dispatch(success(res.data))
            localStorage.setItem('userInfo',JSON.stringify(res.data))
        }

    }
    else{

        const res = await axios.post('/api/veteran/updateVeteranProfile',{name,email,image,occupation,_id:`${userInfo._id}`})
        if(userInfo._id === res.data._id){
            setSuccess2(true)
            dispatch(success(res.data))
            localStorage.setItem('userInfo',JSON.stringify(res.data))
        }
    }

}

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

const RemoveHobbie = async(e) => {
    const res = await axios.put(`/api/veteran/updateVeteranProfile`,{_id:`${userInfo._id}`,index:e.target.value})
    dispatch(success(res.data))
    localStorage.setItem('userInfo',JSON.stringify(res.data))
}

const submitHandler2 = async (e) => {
    e.preventDefault()
    const res = await axios.post('/api/veteran/updateVeteranProfile',{hobbies:Hobbie,_id:`${userInfo._id}`})
    dispatch(success(res.data))
    localStorage.setItem('userInfo',JSON.stringify(res.data))
}

useEffect(() => {
    if(userInfo){
        setName(userInfo.name)
        setEmail(userInfo.email)
        setImage(userInfo.image)
        setOccupation(userInfo.occupation)
    }
},[userInfo])


  return (
    <Row>
    <Col md={4}>
    <h2>Edit User</h2>
        {/* {message && <Alert variant='danger'>{message}</Alert>} */}
        {success2 && <Alert variant='success'>User Updated</Alert>}
        <Form onSubmit={submitHandler}>

        <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e)=>{setName(e.target.value)}}>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Email Adress</Form.Label>
                <Form.Control type='email' placeholder='enter email' value={email} onChange={(e)=>{setEmail(e.target.value)}}>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='text'>
                <Form.Label>Occupation</Form.Label>
                <Form.Control type='text' placeholder='enter occupation' value={occupation} onChange={(e)=>{setOccupation(e.target.value)}}>
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

            <Form.Group><Button className='my-3' type='submit' variant='primary' >Update</Button></Form.Group>
            
        </Form>
    </Col>
    <Col md={4}>
        <h2>Hobbies</h2>   
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Hobbie</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {userInfo.hobbies.map((hobbie,index) => (
                <tr >
                  <td>{hobbie}</td>
                  <td>
                      <Button className='btn-sm' variant='danger' onClick={RemoveHobbie} value={index}>
                        Remove
                      </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        
      </Col>
      <Col md={4}>
        <h1>Add Hobbie</h1>
        <Form onSubmit={submitHandler2}>
            <Form.Group controlId='hobbie'>
                <Form.Label>Hobbie</Form.Label>
                <Form.Select onChange={(e)=>{setHobbie(e.target.value)}} aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="Public Talks">Public Talks</option>
            <option value="Motivational Talks">Motivational Talks</option>
            <option value="Professional Talk">Professional Talk</option>
            <option value="Plantation Drives ">Plantation Drives </option>
            <option value="Orphanage Visit ">Orphanage Visit </option>
            <option value="Visiting patients into hospitals ">Visiting patients into hospitals </option>
            <option value="Recreational Visit ">Recreational Visit </option>
            <option value="Old Home Visit  ">Old Home Visit  </option>
            <option value="Book Reading/Discussion  ">Book Reading/Discussion </option>
            </Form.Select>
            </Form.Group>
            <Form.Group><Button className='my-3' type='submit' variant='primary' >Add</Button></Form.Group>
        </Form>

      </Col>
  </Row>
  
  )
}

export default Profile