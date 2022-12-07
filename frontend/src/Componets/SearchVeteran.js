import React , {useEffect}from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Row,Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import {GetVeteranList} from '../actions/userActions'
import SearchBox from './SerachBox'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SearchVeteran = () => {

    const {Keyword} = useParams()

    const VetranList =  useSelector(state => state.VeteransInfo)
    const {veterans,loading,error} = VetranList
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetVeteranList(Keyword))
        console.log(Keyword)
    }, [Keyword,dispatch])
    
 if(!veterans){
    return null
 }
  return (
    <>
        <SearchBox></SearchBox>
        
     <h1>Fellow Veterans</h1>  

 {loading ? <h2>Loading....</h2> : error ? <h3>{error}</h3> :<> <Row>
   
   {veterans.map((veteran)=>(

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
                                   start : {veteran.stars}
                                </Card.Text>
                                <Card.Text as='h3'>{veteran.occupation}</Card.Text>
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

export default SearchVeteran