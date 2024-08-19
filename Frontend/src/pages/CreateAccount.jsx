import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import djangoApiConnection from '../django_api.js';

function CreateAccount() {
  localStorage.clear();
  const navigate = useNavigate();

  const createAccountRequest = async (event) => {
    event.preventDefault();
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
  
  return (
    <>
      <div>
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