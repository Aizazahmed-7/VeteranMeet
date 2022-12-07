import React, { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Col,Row,Card,Form ,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'


const SearchEvents = () => {


  const [keyword, setKeyword] = useState('')
  const [hobbie, setHobbie] = useState('')
  const [events, setEvents] = useState([])
  const navigate = useNavigate()

useEffect(() => {
   
    const fetchEvents = async () => {
      if(hobbie === ''){
    const {data} = await axios.post(`/api/Event/getEvents?Keyword=${keyword}`)
    setEvents(data)
      }else{
    const {data} = await axios.post(`/api/Event/getEvents?Keyword=${keyword}`,{hobbie})
    setEvents(data)
      }
    }
    fetchEvents()
}, [keyword,hobbie])

const submitHandler = (e) => {
  e.preventDefault()
  if (keyword.trim()) {
    navigate(`/SearchEvent/${keyword}`)
  } else {
    navigate('/SearchEvent')
  }
}

  return (
    <>
     <Form onSubmit={submitHandler} inline className='d-flex'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5 rounded-pill'
      ></Form.Control>
       <Form.Select className='mr-sm-2 ml-sm-5 rounded-pill' onChange={(e)=>{setHobbie(e.target.value)}} aria-label="Default select example">
            <option value={''} >select hoobie</option>
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
    </Form>
    
 <h1>Events</h1>  

<> <Row>

{events.map((event)=>(

        <Col key={event._id} sm={12} md={6} lg={4} >
           
              <Card className='my-3 p-3 rounded'>
              <Link to={`/event/${event._id}`}> 
                      <Card.Img  src={event.image}  variant='bottom' />
                                </Link>
                                
                                <Card.Body>
                                <Link to={`/event/${event._id}`}> 
                                <Card.Title as='h3'><strong>{event.name}</strong> </Card.Title>
                                </Link>

                            <Card.Text as='div'>
                               stars : {event.stars}
                            </Card.Text>
                            <Card.Text as='div'>Description : {event.description}
                            </Card.Text>

                            <Card.Text as='div'>Date : {event.date}
                            </Card.Text>

                             </Card.Body>

                            </Card>
           
        </Col>

)
)}

</Row> 

</>  
</>
  )
}

export default SearchEvents