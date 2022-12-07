import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card ,Row,Col, Button} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import { success } from '../reducers/veteranReducer'
import { useDispatch } from 'react-redux'

const VeteranWall = () => {
    const [veteran, setVeteran] = useState(null)
    const userLogin = useSelector(state=>(state.userLogin))
    const {loading,error,userInfo} =userLogin
    const {id} = useParams();
    const [disable,setDisable] = useState(false)
    const dispatch = useDispatch()

const FollowVetern = async (e) => {
    e.preventDefault();
    console.log(id)
    const res = await axios.post('/api/veteran/updateVeteranProfile',{_id:`${userInfo._id}`,followedVeteran:`${id}`})
    dispatch(success(res.data))
    localStorage.setItem('userInfo',JSON.stringify(res.data))
    console.log(res.data)

}

useEffect(() => {
if(userInfo){
    const x = userInfo.followedVeterans.indexOf(`${id}`)
    if(x == -1){
        setDisable(true)
    }
  }
    const fetchVeterans = async () => {
        const { data } = await axios.get(`/api/veteran/getVeteran/${id}`);
        console.log(data)
        setVeteran(data);
    }
    fetchVeterans();
},[])

if(!veteran){
    return null
}
  return (
<>
<div className="container-fluid gedf-wrapper">
        <div className="row">
      <div className="col-md-3">
        <div className="card">
          <div className="card-body">
            <div className="h5">@{veteran.name}</div>
            <div className="h7">
              {veteran.occupation}
            </div>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="h6 text-muted">Hobbies</div>
              {veteran.hobbies && veteran.hobbies.map((hobby) => (
                <div className="h5">{hobby}</div>
                ))}             
            </li>
            <li className="list-group-item">
              <div className="h6 text-muted">Following</div>
              <div className="h5">{veteran.followedVeterans.length}</div>
            </li>
          </ul>
        </div>
      </div>

    <div className="col-md-6 gedf-main">
    
      {veteran.posts.map((post) => ( 
      <div className="card gedf-card mt-10">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <div className="mr-10">
              <img
                  className="rounded-circle"
                  width="45"
                  src={veteran.image}
                  alt=""
                />
              </div>
              <div className="ml-3">
                <div className="h5 m-0">@{veteran.name}</div>
                <div className="h7 text-muted">{veteran.occupation}</div>
              </div>
            </div>
            <div>
              
            </div>
          </div>
        </div>
         <div className="card-body">
          <div className="text-muted h7 mb-2">
            {" "}
          </div>
          <p className="card-text">
           {post.text}
          </p>
      </div>
      {post.image != "" ? <Card.Img  src={post.image}   variant='top' /> : null}
        </div>))}
        
</div>
<div className="col-md-3">
   { userInfo ?( disable ? <Button variant="primary" size="lg" onClick={FollowVetern} block>Follow {veteran.name}  </Button> : <h1>Following</h1>) : null}
</div>
      </div>
    </div>

    </>  )
}

export default VeteranWall