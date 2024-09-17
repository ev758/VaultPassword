import { useState } from 'react';
import { Alert, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AccountAuthentication from '../components/AccountAuthentication.jsx';
import validation from '../utils/validation.js';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../jwt_tokens.js';
import djangoApiConnection from '../django_api.js';

function Login() {
  //declarations
  const navigate = useNavigate();
  const [alertValidation, setAlertValidation] = useState(false);
  const [show, setShow] = useState(false);
  const close = () => setShow(false);
  const modal = () => setShow(true);

  const loginRequest = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      
      if (validation()) {
        //declarations
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const notification = document.getElementById("loginNotification");
        //sends POST request to get access and refresh tokens
        const jwt = djangoApiConnection.post("token/", {username: username, password: password});
        //sends POST request to get authentication
        const authentication = djangoApiConnection.post("verified-authentication/", {username: username});
        const axiosRequests = Promise.all([jwt, authentication]);
      
        try {
          const responses = await axiosRequests;

          //sets access and refresh tokens
          localStorage.setItem(ACCESS_TOKEN, responses[0].data.access);
          localStorage.setItem(REFRESH_TOKEN, responses[0].data.refresh);
      
          if (responses[1].data === "False") {
            navigate("/portal");
          }
          else if (responses[1].data === "True") {
            modal();
          }
        }
        catch (error) {
          notification.textContent = "User does not exist, please enter your username and password.";
          notification.style.color = "red";
          console.log(error);
        }
      }
      else {
        setAlertValidation(true);
      }
    }
  }

  return (
    <>
      <div>
        {/* input validation alert */}
        <Alert show={alertValidation} variant="danger" onClose={() => setAlertValidation(false)} dismissible>
          <Alert.Heading>Invalid Inputs</Alert.Heading>
          <ul>
            <li>Username must only have letters, numbers, and a length between 10-50.</li>
            <li>Password must only have letters, numbers, or special characters (!@#$%^&*), and a length between 20-50.</li>
          </ul>
        </Alert>
        
        <h1 className="title">Vault Password</h1>

        <form className="login" onKeyDown={loginRequest}>
          <h2 className="login-title">Login</h2>

          {/* username input */}
          <label htmlFor="username">username</label>
          <br/>
          <input type="text" id="username" required/>

          {/* password input */}
          <label htmlFor="password">password</label>
          <br/>
          <input type="password" id="password" required/>

          <nav>
            <Link to="create-account">Create an account</Link>
            <span>|</span>
            <Link to="forgot-password">Forgot password</Link>
          </nav>
        </form>
        <br/>
        <br/>

        <span id="loginNotification"></span>

        {/* displays authentication code input */}
        <Modal show={show} onHide={close} backdrop="static" keyboard={false}>
          <Modal.Body>
            <AccountAuthentication/>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default Login;