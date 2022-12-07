import React from 'react'
import Leftsidebar from './leftsidebar'
import Maincontent from './Maincontent'
import Rightsidebar from './Rightsidebar'
import "./Hompage.css";

const HomePage = () => {
  return (
    <>
      <div className="container-fluid gedf-wrapper">
        <div className="row">
          <Leftsidebar></Leftsidebar>
          <Maincontent />
          <Rightsidebar />
        </div>
      </div>
    </>
  )
}

export default HomePage