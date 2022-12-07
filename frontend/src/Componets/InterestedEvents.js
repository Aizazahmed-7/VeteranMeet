import React, { useEffect } from 'react'
import {Table} from 'react-bootstrap'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState } from 'react'


const InterestedEvents = () => {


    const [veteran,setVeteran] = useState(null)
    const userLogin = useSelector(state=>(state.userLogin))
    const {loading,error,userInfo} =userLogin

useEffect(() => {
    const fetchEvents = async () => {
        const {data} = await axios.get(`/api/Veteran/InterestedEvents/${userInfo._id}`)
        setVeteran(data)
    }
    fetchEvents()
}, [])

if (!veteran){
    return <div>Loading...</div>
}


  return (
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>Event Name</th>
        <th>Event Date</th>

      </tr>
    </thead>
    <tbody>
    {veteran.interestedEvents.map((ev)=>(
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

export default InterestedEvents