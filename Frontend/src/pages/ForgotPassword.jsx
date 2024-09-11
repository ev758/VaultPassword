import djangoApiConnection from '../django_api.js';

function ForgotPassword() {

  const forgotPasswordRequest = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
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
        console.log(error);
      }
    }
  }

  return (
    <>
      <div>
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