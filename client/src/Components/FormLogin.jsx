import React, { useState } from "react";
import { Button, Modal , Form } from "react-bootstrap";
import {useDispatch} from "react-redux";
import { userLogin } from "../JS/actions/authActions";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogin = ()=>{
    dispatch(userLogin({email , password}))
    navigate('/dashboard')
  }
  return (
    <div>
      <Button variant="dark" onClick={handleShow} style={{marginRight:"3rem"}}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3">
        <Form.Label>Email :</Form.Label>
        <Form.Control type="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password :</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{handleLogin();handleClose()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FormLogin;
