import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import axios from 'axios'
import { success } from '../reducers/OrgReducer'
import { Link } from 'react-router-dom'


const OrgHomePage = () => {


    const dispatch = useDispatch()

    const orgLogin = useSelector(state=>(state.OrgLogin))
    const {loading,error,userInfo} =orgLogin

    const navigate = useNavigate();

    const [text,setText] = useState('')
    const [image,setImage] = useState('')
    const [loadingImg,setLoadingImg] = useState(false)
  
    
    const SubmitHandler =async (e) => {
      e.preventDefault();
      setLoadingImg(true)
      const res = await axios.post(`/api/Organization/addPost/${userInfo._id}`, {text,image})
      console.log(res.data)
      localStorage.setItem('orgInfo',JSON.stringify(res.data))
      dispatch(success(res.data))
      setLoadingImg(false);
      };
  
  
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

  return (
    <div className="container-fluid gedf-wrapper">
        <div className="row">
    
      <div className="col-md-3">
        <div className="card">
          <div className="card-body">
            <div className="h5">@{userInfo.name}</div>
            <div className="h7">
              {userInfo.description}
            </div>
          </div>
          <ul className="list-group list-group-flush">
           
            <li className="list-group-item">
           
              <div className="h6 text-muted underline">Followers</div>
              <div className="h5">{userInfo.followingVeterans.length}</div>
            </li>
            <LinkContainer to= {`/CreatedEvents/${userInfo._id}`}> 
            <li className="list-group-item">
            <Link to={`/CreatedEvents`} >
              <div className="h6 text-muted underline">Created Events</div>
            </Link>
              <div className="h5">{userInfo.CreatedEvents.length}</div>
            </li>
            </LinkContainer>
          </ul>
        </div>
      </div>
    
        
      <div className="col-md-6 gedf-main">
    {loadingImg ? <h1 className='mb-10'>Uploading Post</h1> :   (  <Form onSubmit={SubmitHandler}>
          <div className="card gedf-card">
          <div className="card-header">
            <ul
              className="nav nav-tabs card-header-tabs"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="posts-tab"
                  data-toggle="tab"
                  href="#posts"
                  role="tab"
                  aria-controls="posts"
                  aria-selected="true"
                >
                  Make a publication
                </a>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="posts"
                role="tabpanel"
                aria-labelledby="posts-tab"
              >
                <div className="form-group">
                  <label className="sr-only" for="message">
                    post
                  </label>
                  <Form.Group controlId='textarea'>
                  <Form.Control
                    className="form-control"
                    as="textarea"
                    id="message"
                    rows="3"
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
                    placeholder="What are you thinking?"
                  ></Form.Control>
                  <Form.Group controlId="formFileLg" className="mb-3 mt-3">
                  <Form.Control type="file" label='Choose File' size="sm" onChange={uploadFileHandler} />
                  </Form.Group>
                 {/* <Form.Control type='file'  label='Choose File' onChange={uploadFileHandler}> </Form.Control> */}
                  </Form.Group>
                </div>
              </div> 
            </div>
            <div className="btn-toolbar justify-content-between">
              <div className="btn-group">
                <Button type="submit" className="btn btn-primary">
                  share
                </Button>
              </div>
              
            </div>
          </div>
        </div>
        </Form>)}


    {userInfo.posts.map((post) => ( 
      <div className="card gedf-card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <div className="mr-10">
              <img
                  className="rounded-circle"
                  width="45"
                  src={userInfo.image}
                  alt=""
                />
              </div>
              <div className="ml-3">
                <div className="h5 m-0">@{userInfo.name}</div>
                <div className="h7 text-muted">{userInfo.occupation}</div>
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

    <>
      <div className="col-md-3">
      <LinkContainer to="/SearchVeteran">
        <div className="card gedf-card">
          <div className="card-body">
          <a className="btn btn-primary" href="/SearchVeteran">
            <h5 className="card-title">Search Veterans</h5>
          </a>
          
            <p className="card-text">
              Search vetterns by name
            </p>
          </div>
        </div>
        </LinkContainer>

        <LinkContainer to="/SerachEvent">
        <div className="card gedf-card">
          <div className="card-body">
            <Button className="btn btn-primary">Serach Events</Button>
          </div>
        </div>
        </LinkContainer>

        <LinkContainer to="/CreatEvent">
        <div className="card gedf-card">
          <div className="card-body">
            <Button className="btn btn-primary">Creat Event</Button>
          </div>
        </div>
        </LinkContainer>


      </div>
    </>



        </div>
    </div>
    )
}

export default OrgHomePage