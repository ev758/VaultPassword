import { Link, useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../jwt_tokens.js';
import djangoApiConnection from '../django_api.js';

function Login() {
  const navigate = useNavigate();

  const loginRequest = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      //declarations
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
    
      try {
        //sends POST request to get access and refresh tokens
        const response = await djangoApiConnection.post("token/", {username: username, password: password});
    
        //sets access and refresh tokens
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
        
        navigate("/portal");
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
      </div>
    </>
  )
}

export default Login;