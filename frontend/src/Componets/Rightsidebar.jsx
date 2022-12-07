import React from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Rightsidebar() {
  return (
    <>
      <div className="col-md-3">
      <LinkContainer to="/SearchVeteran">
      
        <div className="card gedf-card">
          <div className="card-body">
          <a className="btn btn-primary" href="/SearchVeteran">
            <h5 className="card-title">Search Fellow Veterans</h5>
          </a>
          
            <p className="card-text">
              Search vetterns by name
            </p>
          </div>
        </div>
      
        </LinkContainer>
        <div className="card gedf-card">
          <div className="card-body">
          <a className="btn btn-primary" href="/SerachEvent">
            <h5 className="card-title">Search Events</h5>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
