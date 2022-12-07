import React from "react";
import {useDispatch,useSelector} from 'react-redux'
import {Card} from "react-bootstrap"


export default function Feed() {


  const userLogin = useSelector(state=>(state.userLogin))
  const {loading,error,userInfo} =userLogin


  return (
    <>
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
      

      
    </>
  );
}
