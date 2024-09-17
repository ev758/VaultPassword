import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import validation from '../utils/validation.js';
import djangoApiConnection from '../django_api.js';

function PasswordReset() {
  //declarations
  const [alertValidation, setAlertValidation] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const passwordResetRequest = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      
      if (validation()) {
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
      else {
        setAlertValidation(true);
      }
    }
  }

  return (
    <>
      <div>
        <Alert show={alertValidation} variant="danger" onClose={() => setAlertValidation(false)} dismissible>
          <Alert.Heading>Invalid Password</Alert.Heading>
          <ul>
            <li>Password must only have letters, numbers, or special characters (!@#$%^&*), and a length between 20-50.</li>
          </ul>
        </Alert>
        
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