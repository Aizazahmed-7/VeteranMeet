import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Logout } from '../actions/userActions'
import {LogoutOrg} from '../actions/OrgActions'
import { useNavigate } from 'react-router-dom'



const Header = () => {


  const dispatch = useDispatch()


  const userLogin = useSelector(state=>(state.userLogin))
  const {loading,error,userInfo} =userLogin
  const orgLogin = useSelector(state=>(state.OrgLogin))
  
  const navigate = useNavigate()
  const logoutHandler = () => {
    dispatch(Logout())
    dispatch(LogoutOrg())
     navigate('/')
  }
let redirect = "/HomePage"

if(orgLogin.userInfo){
  redirect = "/OrgHomePage"
}

  return (
    <>
    <header>

<Navbar bg="dark"  variant='dark'  expand="lg" collapseOnSelect>
  <Container>
  
    <LinkContainer to= {redirect} >
    <Navbar.Brand>Veteran Meet</Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    {/* <SearchBox></SearchBox> */}
      <Nav className="ms-auto">
      
        
        
        {userInfo ? (
            <NavDropdown title={userInfo.name} id='username'>
           
            <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
            
              <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
            </NavDropdown>
        ): orgLogin.userInfo ? ( <NavDropdown title={orgLogin.userInfo.name} id='username'>
             <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
           </NavDropdown>)
          : (
        <Nav.Link ><i className='fas fa-user'></i> Sign In</Nav.Link>
        )}
        
      </Nav>

    </Navbar.Collapse>
  </Container>
</Navbar>

    </header>
</>
  )
}

export default Header