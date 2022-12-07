import React from 'react'
import {Row,Col,Form,Button,Table,Card} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import {useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {success} from '../reducers/veteranReducer'




const EventPage = () => {


  const userLogin = useSelector(state=>(state.userLogin))
  const {loading,error,userInfo} =userLogin



  const [display,setDisplay] = useState(true)



    const navigate = useNavigate()
    const {id} = useParams()
    const [Event,setEvent] = useState(null)


const SendInvite = async() => {
    navigate(`/sendInvite/${id}`)
}

const dispatch = useDispatch()

const JoinEvent = async() => {
const {data} = await axios.post(`/api/Veteran/followEvent/${userInfo._id}`,{eventId:id})
dispatch(success(data))
setDisplay(false);
}

useEffect(() => {
if(!userInfo){
  setDisplay(false)
}
else {
  if(userInfo.interestedEvents.includes(id)){
    setDisplay(false)
  }
}

    const fetchEvent = async () => {
        const {data} = await axios.get(`/api/Event/${id}`)
        console.log(data)
        setEvent(data)
    }
    fetchEvent()
}, [id,display])

if(!Event){
    return <div>Loading...</div>
}


  return (
    <>
    <h1>EventPage</h1>
    <Row>
    <Card className='ml-auto' style={{ width: '30rem'  }}>
      <Card.Img variant="top" src={Event.image} />
      <Card.Body>
        <Card.Title as='h1' >{Event.name}</Card.Title>
        <Card.Text as='h4'>
          {Event.description}
        </Card.Text>
        <Card.Text as='div'>
         stars : {Event.stars}
        </Card.Text>
        <Card.Text as='div'>
          date : {Event.date}
        </Card.Text>
        <Card.Text as='h4'>
         Location :  {Event.location}
        </Card.Text>
        <Card.Text as='h4'>
         interested Veterans :  {Event.interestedVeterans.length}
        </Card.Text>
        <Button onClick={SendInvite} variant="primary">invite Veteran</Button>
        {userInfo && display &&  <Button className='m-2' onClick={JoinEvent} variant="primary">Join Event</Button>}
      </Card.Body>
    </Card>
    </Row>
  

    <Row>
    <h1>interested Veterans</h1>

<Table striped bordered hover>
  <thead>
    <tr>
      <th>Veteran Name</th>
      <th>Veteran stars</th>
    </tr>
  </thead>
  <tbody>
  {Event.interestedVeterans.map((veteran)=>(
    <tr>
    <Link to={`/veteran/${veteran._id}`} >
      <td>{veteran.name}</td>
    </Link>
      <td>{veteran.stars}</td>
    </tr>
    )
    )}
      
  </tbody>
</Table>
    </Row>





    </>
  )
}

export default EventPage