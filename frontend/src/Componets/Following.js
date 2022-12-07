import React, { useEffect ,useState} from 'react'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { Card ,Row,Col} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Following = () => {

const [following, setFollowing] = useState([]);
const userLogin = useSelector(state=>(state.userLogin))
    const {loading,error,userInfo} =userLogin
useEffect(() => {
    const fetchFollowing = async () => {
        const { data } = await axios.post('api/Veteran/getFollowedVeterans', { _id: `${userInfo._id}` });
        setFollowing(data.followedVeterans);
    }
    fetchFollowing();
    }, [following])

    if(following.length == 0){
        return null
    }

  return (
    <>
 <h1>Following</h1>  

<> <Row>

{following.map((veteran)=>(

        <Col key={veteran._id} sm={12} md={6} lg={4} >
           
                             <Card className='my-3 p-3 rounded'>
                                <Link to={`/veteran/${veteran._id}`}> 
                                <Card.Img  src={veteran.image}  variant='bottom' />
                                </Link>
                                
                                <Card.Body>
                                <Link to={`/veteran/${veteran._id}`}> 
                                <Card.Title as='div'><strong>{veteran.name}</strong> </Card.Title>
                                </Link>

                            <Card.Text as='div'>
                               star : {veteran.stars}
                            </Card.Text>
                            <Card.Text as='h3'>{veteran.occupation}</Card.Text>
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

export default Following