import React, { useEffect,useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { success } from '../reducers/veteranReducer'
const Invites = () => {
   const  navigate = useNavigate()
    const userLogin = useSelector(state=>(state.userLogin))
    const {loading,error,userInfo} =userLogin
    const [invites, setInvites] = useState([])
    const dispatch = useDispatch()

    const AcceptInvite = async (e) => {
        console.log(e.target.value);
        const {data} = await axios.post(`/api/Veteran/acceptInvite/${userInfo._id}`, {index:e.target.value});
        console.log(data);
        dispatch(success(data))
    }

    const RejectInvite = async (e) => {
        console.log(e.target.value);
    }

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
         }

         const fetchInvites = async () => {
            const {data} = await axios.get(`/api/Veteran/getInvites/${userInfo._id}`);
            setInvites(data.organizationInvite)
         }
            fetchInvites()

    }, [userInfo])
  return (
<Table striped bordered hover>
      <thead>
        <tr>
          
          <th>Organization Name</th>
          <th>Event Name</th>
          <th>Accept</th>
          <th>Reject</th>
        </tr>
      </thead>
      <tbody>
      {userInfo.organizationInvite && invites.map((invite,i) => (
         <tr>
          <td>{invite.organization.name}</td>
          <td>{invite.event.name}</td>
          <td><Button value={i} onClick={AcceptInvite} >Accept</Button></td>
          <td><Button value={i} onClick={RejectInvite} variant='danger' >Reject</Button></td>
        </tr>
      )
      )
        }
      </tbody>
    </Table>  )
}

export default Invites