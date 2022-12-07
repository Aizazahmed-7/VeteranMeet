import React,{useState,useEffect} from 'react'
import Feed from "./Feed";
import { Button, Form } from "react-bootstrap";
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import { success } from '../reducers/veteranReducer';
import { set } from 'mongoose';

export default function Maincontent() {
  const userLogin = useSelector(state=>(state.userLogin))
    const {loading,error,userInfo} =userLogin
  const dispatch = useDispatch()
  const [text,setText] = useState('')
  const [image,setImage] = useState('')
  const [loadingImg,setLoadingImg] = useState(false)

  
  const SubmitHandler =async (e) => {
    e.preventDefault();
    setLoadingImg(true)
    const res = await axios.post('/api/veteran/updateVeteranProfile', {post:{text:text,image:image},_id:`${userInfo._id}`})
    console.log(res.data)
    localStorage.setItem('userInfo',JSON.stringify(res.data))
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
  // useEffect(() => {


  // },[])
  return (
    <>
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
        <Feed />
      </div>
    </>
  );
}
