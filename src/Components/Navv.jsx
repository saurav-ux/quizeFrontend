import React ,{useState}from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Navv = () => {
    //handle snakvar
    const [state, setState] = useState({
      open: false,
      vertical: 'top',
      horizontal: 'center',
    });
    const [message,setMessage] = useState("Login Successfully")
    const [snakcolor,setSnackColor]= useState("success")
    const { vertical, horizontal, open } = state;

    const navigate = useNavigate()

  const name1 = localStorage.getItem('name');
    //--------------------handle logout-------------------------
    const handleLogout = ()=>{
      setTimeout(() => {
        navigate('/');
      }, 500);
      localStorage.removeItem('name');
      setState({ vertical: 'top',
      horizontal: 'center',
       open: true });
       setSnackColor("success")
       setMessage("Logout Successfully")
      //  dispatch(loginStatus(""))
      // dispatch(logout(0))
    }

    
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  return (
    <div>
       <>
       {[false, 'sm', 'md', 'lg', 'xl', 'xxl'].map((expand, index) => (
  index === 0 && (
    <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3 navbar">
      <Container fluid>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Navbar.Brand href="#">Quize Game</Navbar.Brand>
        </Link>
      
        {/* {name1===null || name1 === undefined ? "" : <b>Welcome {name1}</b>} */}
       
       {/* {loginName === "" || loginName === undefined ? */}
         {/* {name1===null || name1 === undefined ?
          <Link to="/login"> 
            <dfn title="Login/Signup"> 
              <a href="login.html"> <i class="fas fa-user-alt"></i> </a>
            </dfn> 
          </Link>
          : <Button variant="outline-success" style={{width:80,marginLeft:20}}  onClick={handleLogout}>Logout</Button>
        } */}
        {/* <Link to="/login"> 
            <dfn title="Login/Signup"> 
            <Button variant="success" type="submit">
              
            
              SignIp
              </Button>
            </dfn> 
          </Link> */}
       
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
            {name1===null || name1 === undefined ?<b>Quize Game</b>  : name1}
            </Offcanvas.Title>
           
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
               <Nav.Link href="#action1">Home</Nav.Link>
             </Link>
             <Link to="/leader" style={{ textDecoration: 'none', color: 'inherit' }}>
               <Nav.Link href="#action1">Leader Board</Nav.Link>
             </Link>
             {name1===null || name1 === undefined ?
             <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
               <Nav.Link href="#action1">Login/Signup</Nav.Link>
             </Link>
              : <p onClick={handleLogout} style={{color:'red', cursor:'pointer'}}>Logout</p>
            }
       
            </Nav>
            
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
           {/* alert snakbar start */}
           <Snackbar 
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
          open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snakcolor}  sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
            {/* alert snakbar end */}
    </Navbar>
  )
))}

    </>
    </div>
  )
}

export default Navv
