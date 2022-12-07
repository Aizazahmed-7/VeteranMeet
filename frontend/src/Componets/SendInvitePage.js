import React , {useEffect}from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Row,Col, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import {GetVeteranList} from '../actions/userActions'
import SearchBox from './SerachBox'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'

const SendInvitePage = () => {
    const {id} = useParams()

    const [Keyword, setKeyword] = useState('')
    const VetranList =  useSelector(state => state.VeteransInfo)
    const {veterans,loading,error} = VetranList

    const orgLogin = useSelector(state=>(state.OrgLogin))
    const {userInfo} =orgLogin
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetVeteranList(Keyword))
        console.log(Keyword)
    }, [Keyword,dispatch])
    

    const SendInvite =  async (e) => {
        const {data} = await axios.post(`/api/Organization/inviteVeteran/${userInfo._id}`,{eventId:id,veteranId:e.target.value})
        if(data){
            alert('Invite Sent')
        }
    }



 if(!veterans){
    return null
 }
  return (
    <>
          <Form inline className='d-flex'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5 rounded-pill'
      ></Form.Control>
    </Form>
        
     <h1>Fellow Veterans</h1>  

 {loading ? <h2>Loading....</h2> : error ? <h3>{error}</h3> :<> <Row>
   
   {veterans.map((veteran)=>(

            <Col key={veteran._id} sm={12} md={6} lg={4} >
               
                                 <Card className='my-3 p-3 rounded'>
                                    
                                    <Card.Img  src={veteran.image}  variant='bottom' />
                                    
                                    <Card.Body>
                                    
                                    <Card.Title as='div'><strong>{veteran.name}</strong> </Card.Title>

                                <Card.Text as='div'>
                                   start : {veteran.stars}
                                </Card.Text>
                                <Card.Text as='h3'>{veteran.occupation}</Card.Text>
                                <Button value={veteran._id}  onClick={SendInvite} > Send Invite</Button>
                                 </Card.Body>

                                </Card>
               
            </Col>

   )
   )}

</Row> 

</>  } 
    </>
  )
}

export default SendInvitePage