import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getProfile from '../utils/get_profile.js';
import deleteQRCode from '../utils/delete_qrcode.js';
import djangoApiConnection from '../django_api.js';

function TwoFactorAuthentication() {
  //declarations
  const [profile, setProfile] = useState([]);
  const qrcodeImage = new URL(`../assets/qrcode${profile.id}.png`, import.meta.url).href;
  const navigate = useNavigate();

  useEffect(() => {
    getProfile(setProfile);
  }, []);

  const verification = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const authenticationCode = document.getElementById("verification").value;

      try {
        //sends POST request to verify authentication code
        const response = await djangoApiConnection.post("two-factor-authentication/verification/", {
          authentication_code: authenticationCode
        });

        alert("Two-Factor Authentication activated, returning to portal.")
        deleteQRCode();

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
        <h1 className="profile-title">Vault Password</h1>
        <p style={{marginBottom: "30px"}}>Scan QR Code with Google Authenticator</p>
        <img className="qrcode" src="" alt="QR Code" onError={(event) => {event.target.src = qrcodeImage}}/>

        <div style={{marginTop: "30px"}} onKeyDown={verification}>
          <p>Enter Authentication Code</p>
          <input className="verification" type="text" id="verification" required/>
        </div>
      </div>
    </>
  )
}

export default TwoFactorAuthentication;