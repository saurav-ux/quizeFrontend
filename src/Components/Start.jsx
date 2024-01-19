import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from "./start.css";
import { useNavigate } from "react-router-dom";
const Start = () => {
    const  navigate = useNavigate()
    const handleLogin = ()=>{
        navigate('/login');
    }
    const handleSignup = ()=>{
        navigate('/signin');
    }
  return (
    <Container className="centered-box">
      <Row>
        <Col xs={12} className="text-center">
          <div className="p-4 border rounded">
            <h2>Quize Game</h2>
            <div className="button-container">
              <Button variant="primary" className="m-2" onClick={handleLogin}>
                Login
              </Button>
              <Button variant="success" className="m-2" onClick={handleSignup}>
                Sign Up
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Start;
