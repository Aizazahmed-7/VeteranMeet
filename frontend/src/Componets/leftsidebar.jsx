import React from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'



export default function Leftsidebar() {


  const [rank, setRank] = useState("silver Veteran");

    const userLogin = useSelector(state=>(state.userLogin))
    const {loading,error,userInfo} =userLogin
    const navigate = useNavigate()
 
  useEffect(() => {
    if(userInfo.stars > 25000){
      setRank("Ruby Veteran")
    }
    if(userInfo.stars > 40000){
      setRank("Golded Veteran")
    }
    if(userInfo.stars > 60000){
      setRank("Platinum Veteran")
    }
    if(userInfo.stars > 80000){
      setRank("Diamond Veteran")
    }
    if(userInfo.stars > 100000){
      setRank("Eternal sage")
    }
  }, [userInfo.stars])

  return (
    <>
      <div className="col-md-3">
        <div className="card">
          <div className="card-body">
            <div className="h5">@{userInfo.name}</div>
            <div className="h7">
              {userInfo.occupation}
            </div>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="h6 text-muted">Hobbies</div>
              {userInfo.hobbies && userInfo.hobbies.map((hobby) => (
                <div className="h5">{hobby}</div>
                ))}             
            </li>
            <LinkContainer to="/Following">
            <li className="list-group-item">
            <a href="">
              <div className="h6 text-muted underline">Following</div>
            </a>
              <div className="h5">{userInfo.followedVeterans.length}</div>
            </li>
            </LinkContainer>
            <li className="list-group-item">
              <div className="h6 text-muted underline">Stars</div>
              <div className="h5">{userInfo.stars}</div>
            </li>
        <LinkContainer to="/Invites">
            <li className="list-group-item">
            <a href="">
              <div className="h6 text-muted underline">Invites</div>
            </a>
              <div className="h5">{userInfo.organizationInvite.length }</div>
            </li>
          </LinkContainer>

          <LinkContainer to="/InteresetedEvents">
            <li className="list-group-item">
            <a href="">
              <div className="h6 text-muted underline">Intrested events</div>
            </a>
              <div className="h5">{userInfo.interestedEvents.length }</div>
            </li>
          </LinkContainer>
          <li className="list-group-item">
            <a href="">
              <div className="h6 text-muted underline">Category</div>
            </a>
              <div className="h5">{rank }</div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
