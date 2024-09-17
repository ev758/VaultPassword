import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import validation from '../utils/validation.js';
import djangoApiConnection from '../django_api.js';

function ForgotPassword() {
  const [alertValidation, setAlertValidation] = useState(false);

  const forgotPasswordRequest = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      
      if (validation()) {
        //declarations
        const email = document.getElementById("email").value;
        const notification = document.getElementById("emailNotification");
      
        try {
          //sends POST request to email password reset link
          const response = await djangoApiConnection.post("forgot-password/", {email: email});

          notification.textContent = "An email with a password reset link has been sent to your inbox.";
        }
        catch (error) {
          notification.textContent = "Invalid email address, please enter your email.";
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
        <Alert show={alertValidation} variant="danger" onClose={() => setAlertValidation(false)} dismissible>
          <Alert.Heading>Invalid Email</Alert.Heading>
          <ul>
            <li>Email must be a valid email address.</li>
          </ul>
        </Alert>

        <h1 className="title">Vault Password</h1>
        
        <form className="forgot-password" onKeyDown={forgotPasswordRequest}>
          <h2>Forgot Password</h2>

          <label htmlFor="email">Enter your email</label>
          <br/>
          <input type="email" id="email" required/>
        </form>
        <br/>
        <br/>

        <span id="emailNotification"></span>
      </div>
    </>
  )
}

export default ForgotPassword;