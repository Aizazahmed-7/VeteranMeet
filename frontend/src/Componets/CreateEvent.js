import { useEffect, useState } from "react"
import React from 'react'
import {Row,Col,Form,Button,Table} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import { Alert } from "react-bootstrap"
import axios from "axios"
import { useDispatch } from "react-redux"
import {success} from '../reducers/veteranReducer'
import { set } from "mongoose"


const CreateEvent = () => {

    const dispatch = useDispatch()
    const [name,setName] = useState('')
    const [success2,setSuccess2] = useState(false)
    const [Hobbie,setHobbie] = useState('')
    const userLogin = useSelector(state=>(state.OrgLogin))
    const {loading,error,userInfo} =userLogin
    const [image,setImage] = useState('')
    const [description,setDescription] = useState('')
    const [date, setDate] = useState(new Date());
    const [location,setLocation] = useState('')
    const [stars,setStars] = useState(0)
    const [Event,setEvent] = useState(null)
    const[error2 ,setError] = useState(false)


const submitHandler = async (e) => {
    e.preventDefault()
    if(stars<50000){
        const {data} = await axios.post('/api/Organization/createEvent',{name,description,location,organizationId:userInfo._id,image,date,stars}) 
        setSuccess2(true);

        setError(false)
        setEvent(data)
    }
    else {

        setError(true)
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
    
}

const submitHandler2 = async (e) => {
    e.preventDefault()
   const {data} = await axios.post(`/api/Event/addHobbie/${Event._id}`,{hobbie:Hobbie})
   setEvent(data);
}

useEffect(() => {
   


},[])


  return (
    <Row>
    <Col md={4}>
    <h2>Create Event</h2>
    {error2 && <Alert variant='danger'>You need to have less than 50000 stars to create an event</Alert>}
        {/* {message && <Alert variant='danger'>{message}</Alert>} */}
        {success2 && <Alert variant='success'>Event Created</Alert>}
        <Form onSubmit={submitHandler}>

        <Form.Group controlId='name'>
                <Form.Label>Event Name</Form.Label>
                <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e)=>{setName(e.target.value)}}>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Event description</Form.Label>
                <Form.Control type='text' placeholder='enter Description' value={description} onChange={(e)=>{setDescription(e.target.value)}}>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='date'>
                <Form.Label>Date</Form.Label>
                <Form.Control type='date' placeholder='enter occupation' value={date} onChange={(e)=>{setDate(e.target.value)}}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formFileLg" className="mb-3 mt-3">
                <Form.Label>Display Picture</Form.Label>
                  <Form.Control type="file" label='Choose File' size="sm" onChange={uploadFileHandler} />
                  </Form.Group>

            <Form.Group controlId='Location'>
                <Form.Label>Location </Form.Label>
                <Form.Control type='text' placeholder='enter Location' value={location} onChange={(e)=>{setLocation(e.target.value)}}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='Stars'>
                <Form.Label>Stars </Form.Label>
                <Form.Control type='number' placeholder='enter Stats' min={0} max={50000} value={stars} onChange={(e)=>{setStars(e.target.value)}}>
                </Form.Control>
            </Form.Group>

            <Form.Group><Button disabled={success2} className='my-3' type='submit' variant='primary' >Create</Button></Form.Group>
            
        </Form>
    </Col>

    {Event && 
            <>  <Col md={4}>
        <h2>Hobbies</h2>   
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Hobbie</th>
                
              </tr>
            </thead>
            <tbody>
              {Event.hobbies.map((hobbie,index) => (
                <tr >
                  <td>{hobbie}</td>
                
                </tr>
              ))}
            </tbody>
          </Table>
        
      </Col>
      <Col md={4}>
        <h1>Add Hobbie</h1>
        <Form onSubmit={submitHandler2}>
            {/* <Form.Group controlId='hobbie'>
                <Form.Label>Hobbie</Form.Label>
                <Form.Control type='hobbie' placeholder='Enter hobbie' value={Hobbie} onChange={(e)=>{setHobbie(e.target.value)}}>
                </Form.Control>
            </Form.Group> */}
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
            <Form.Group><Button className='my-3' type='submit' variant='primary' >Add</Button></Form.Group>
        </Form>

      </Col> </>}
  </Row>
  
  )
}

export default CreateEvent