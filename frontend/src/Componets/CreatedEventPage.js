import React, { useEffect ,useState} from 'react'
import {Table} from 'react-bootstrap'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'




const CreatedEventPage = () => {


    const [events,setEvents] = useState([])
    const orgLogin = useSelector(state=>(state.OrgLogin))
    const {loading,error,userInfo} =orgLogin

useEffect(() => {
    const fetchEvents = async () => {
        const {data} = await axios.get(`/api/Organization/CreatedEvents/${userInfo._id}`)
       setEvents(data)
       console.log(data)
        
    }
    fetchEvents()
}, [])


  return (
    
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>Event Name</th>
        <th>Event Date</th>

      </tr>
    </thead>
    <tbody>
    {events.map((ev)=>(
      <tr>
      <Link to={`/event/${ev._id}`}>
        <td>{ev.name}</td>
      </Link>
        <td>{ev.date}</td>
      </tr>

    ))}
     
    </tbody>
  </Table>
  )
}

export default CreatedEventPage