import { useNavigate, useParams } from 'react-router-dom';
import djangoApiConnection from '../django_api.js';

function PasswordReset() {
  //declarations
  const navigate = useNavigate();
  const params = useParams();

  const passwordResetRequest = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const password = document.getElementById("password").value;
    
      try {
        //sends POST request to reset password
        const response = await djangoApiConnection.post("forgot-password/password-reset/", {
          password_reset_token: params.passwordReset, 
          password: password
        });

        alert("Password reset, returning to login.");
        navigate("/");
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
        
        <form className="password-reset" onKeyDown={passwordResetRequest}>
          <h2>Forgot Password</h2>

          <label htmlFor="password">Enter new password</label>
          <br/>
          <input type="password" id="password" required/>
        </form>
      </div>
    </>
  )
}

export default PasswordReset;