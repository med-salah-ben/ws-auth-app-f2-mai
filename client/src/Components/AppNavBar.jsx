import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {Navbar , Container , Nav, Button} from "react-bootstrap"
import { Link  } from "react-router-dom";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";
import { logout } from "../JS/actions/authActions";


const AppNavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.authReducer.user)
  const isAuth = useSelector((state)=>state.authReducer.isAuth)

  const handleLogout =()=>{
    dispatch(logout())
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            
            <Nav.Link style={{color:"gray"}} >{user.name}</Nav.Link>
            <Nav.Link ><Link to="/" style={{color:"gray",textDecoration:"none"}}>Home</Link></Nav.Link>
            {!isAuth ? <></> : <Nav.Link ><Link to="/dashboard" style={{color:"gray",textDecoration:"none"}}>Dashboard</Link></Nav.Link> }
          </Nav>
          {!isAuth ? (
          <>
          <FormLogin />
        <FormRegister />
          </>):(
            <Button variant="dark" onClick={handleLogout}>Logout</Button>
          )}
        </Container>
        
      </Navbar>
    </div>
  );
};

export default AppNavBar;
