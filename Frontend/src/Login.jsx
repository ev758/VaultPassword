import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h1 className="title">Vault Password</h1>

        <form className="login" onKeyDown={(event) => {
          if (event.key === "Enter") {
            navigate("/portal");
          }
        }}>
          <h2 className="login-title">Login</h2>

          <label>email</label>
          <br/>
          <input type="email"/>

          <label>password</label>
          <br/>
          <input type="password"/>

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