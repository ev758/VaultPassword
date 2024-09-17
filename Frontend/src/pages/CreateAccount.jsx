import { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import validation from '../utils/validation.js';
import djangoApiConnection from '../django_api.js';

function CreateAccount() {
  localStorage.clear();
  const [alertValidation, setAlertValidation] = useState(false);
  const navigate = useNavigate();

  const createAccountRequest = async (event) => {
    event.preventDefault();
    
    if (validation()) {
      //declarations
      const firstName = event.target.firstName.value;
      const lastName = event.target.lastName.value;
      const email = event.target.email.value;
      const username = event.target.username.value;
      const password = event.target.password.value;
    
      try {
        //sends POST request to create an account
        const response = await djangoApiConnection.post("create-account/", {
          first_name: firstName,
          last_name: lastName,
          email: email,
          username: username,
          password: password
        });
    
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
  
  return (
    <>
      <div>
        {/* input validation alert */}
        <Alert show={alertValidation} variant="danger" onClose={() => setAlertValidation(false)} dismissible>
          <Alert.Heading>Invalid Inputs</Alert.Heading>
          <ul>
            <li>First name must be capitalized, have letters only, and a length between 2-50.</li>
            <li>Last name is optional. If it is only one last name, it needs to be capitalized, 
            have letters, and a length between 2-75. A last name with two names needs to be 
            capitalized, have letters and can include a hyphen or space between the two last names, 
            and a length between 2-75 for each one.</li>
            <li>Email must be a valid email address.</li>
            <li>Username must only have letters, numbers, and a length between 10-50.</li>
            <li>Password must only have letters, numbers, or special characters (!@#$%^&*), and a length between 20-50.</li>
          </ul>
        </Alert>

        <h1 className="title">Vault Password</h1>
        
        <form className="create-account" id="createAccount" onSubmit={createAccountRequest} method="post">
          <h2>Create Account</h2>

          {/* first name input */}
          <label htmlFor="firstName">First Name</label>
          <br/>
          <input type="text" id="firstName" name="firstName" required/>

          {/* last name input */}
          <label htmlFor="lastName">Last Name</label>
          <br/>
          <input type="text" id="lastName" name="lastName"/>

          {/* email input */}
          <label htmlFor="email">email</label>
          <br/>
          <input type="email" id="email" name="email" required/>

          {/* username input */}
          <label htmlFor="username">username</label>
          <br/>
          <input type="text" id="username" name="username" required/>

          {/* password input */}
          <label htmlFor="password">password</label>
          <br/>
          <input type="password" id="password" name="password" required/>
        </form>

        <Button className="submit-button" as="input" type="submit" form="createAccount" value="Submit" variant="dark"/>
      </div>
    </>
  )
}

export default CreateAccount;