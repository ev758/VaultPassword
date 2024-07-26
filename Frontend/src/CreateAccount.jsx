import { Button } from 'react-bootstrap';

function CreateAccount() {
  return (
    <>
      <div>
        <h1 className="title">Vault Password</h1>
        
        <form className="create-account">
          <h2>Create Account</h2>

          <label>First Name</label>
          <br/>
          <input type="text"/>

          <label>Last Name</label>
          <br/>
          <input type="text"/>

          <label>email</label>
          <br/>
          <input type="email"/>

          <label>password</label>
          <br/>
          <input type="password"/>
        </form>

        <Button className="submit-button" variant="dark">Submit</Button>
      </div>
    </>
  )
}

export default CreateAccount;