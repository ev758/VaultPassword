import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../jwt_tokens.js";
import djangoApiConnection from "../django_api.js";

function AccountAuthentication() {
  //declarations
  const navigate = useNavigate();
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  localStorage.clear();

  const authentication = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const authenticationCode = document.getElementById("authentication").value;

      try {
        //sends POST request to authenticate user with authentication code
        const response = await djangoApiConnection.post("account-authentication/", {
          authentication_code: authenticationCode
        });

        //sets access and refresh tokens
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);

        navigate("/portal");
      }
      catch (error) {
        localStorage.clear();
        console.log(error);
      }
    }
  }

  return (
    <>
      <div>
        <h2>Enter Authentication Code</h2>
        <div onKeyDown={authentication}>
          <input className="authentication" type="text" id="authentication" required/>
        </div>
      </div>
    </>
  )
}

export default AccountAuthentication;