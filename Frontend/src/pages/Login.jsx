import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AccountAuthentication from '../components/AccountAuthentication.jsx';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../jwt_tokens.js';
import djangoApiConnection from '../django_api.js';

function Login() {
  //declarations
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const close = () => setShow(false);
  const modal = () => setShow(true);

  const loginRequest = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      //declarations
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      //sends POST request to get access and refresh tokens
      const jwt = djangoApiConnection.post("token/", {username: username, password: password});
      //sends GET request to get authentication
      const authentication = djangoApiConnection.get(`verified-authentication/${username}/`);
      const axiosRequests = Promise.all([jwt, authentication]);
    
      try {
        const responses = await axiosRequests;

        //sets access and refresh tokens
        localStorage.setItem(ACCESS_TOKEN, responses[0].data.access);
        localStorage.setItem(REFRESH_TOKEN, responses[0].data.refresh);
    
        if (responses[1].data.authenticated === false) {
          navigate("/portal");
        }
        else if (responses[1].data.authenticated === true) {
          modal();
        }
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <div>
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