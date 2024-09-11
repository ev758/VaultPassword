import { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import getProfile from '../utils/get_profile.js';
import getAuthentication from '../utils/get_authentication.js';
import getQRCode from '../utils/get_qrcode.js';
import djangoApiConnection from '../django_api.js';
import ProfileImage from '../assets/profile.jpg';
import '../styles/profile.css'

function Profile() {
  //declarations
  const [profile, setProfile] = useState([]);
  const [authentication, setAuthentication] = useState([]);
  const navigate = useNavigate();
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const emailRef = useRef("");

  useEffect(() => {
    getProfile(setProfile);
    getAuthentication(setAuthentication);
  }, []);

  const updateProfile = async (event) => {
    event.preventDefault();
    let password = (event.target.password.value === null) ? profile.password : event.target.password.value
    
    try {
      //sends PUT request to update profile
      const response = await djangoApiConnection.put(`profile/update/${profile.id}/`, {
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        email: emailRef.current.value,
        username: profile.username,
        password: password
      });

      window.location.reload();
    }
    catch (error) {
      console.log(error);
    }
  }

  const deleteAccount = async () => {
    try {
      //sends DELETE request to delete an account
      const response = await djangoApiConnection.delete(`delete-account/${profile.id}/`);
      localStorage.clear();

      navigate("/");
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <h1 className="profile-title">Vault Password</h1>
        <img className="profile-image" src={ProfileImage} alt="profile image"/>
        <br/>

        <div className="profile">
          {//if user does not have a last name, display first name and email
          (profile.last_name === null) ?
          <div>
            <label className="profile-label">{profile.first_name}</label>
            <br/>
            <label className="profile-label">{profile.email}</label>
          </div> :
          <div>
            <label className="profile-label">{profile.first_name} {profile.last_name}</label>
            <br/>
            <label className="profile-label">{profile.email}</label>
          </div>
          }
        </div>
        
        <form className="profile-form" onSubmit={updateProfile}>
          {/* first name input */}
          <div className="first-name">
            <label htmlFor="firstName">First Name</label>
            <br/>
            <input type="text" id="firstName" name="firstName" defaultValue={profile.first_name} ref={firstNameRef} required/>
          </div>

          {/* last name input */}
          <div className="last-name">
            <label htmlFor="lastName">Last Name</label>
            <br/>
            <input type="text" id="lastName" name="lastName" defaultValue={profile.last_name} ref={lastNameRef}/>
          </div>

          {/* email input */}
          <div className="email">
            <label htmlFor="email">email</label>
            <br/>
            <input type="email" id="email" name="email" defaultValue={profile.email} ref={emailRef} required/>
          </div>

          {/* password input */}
          <div className="password">
            <label htmlFor="password">password</label>
            <br/>
            <input type="password" id="password" name="password"/>
          </div>

          <Button
            className="authentication-button"
            onClick={() => {
              if (authentication.authenticated === false) {
                getQRCode();
                navigate("two-factor-authentication");
              }
            }}
            variant="dark"
          >
            {(authentication.authenticated) ?
              "Activated Two-Factor Authentication" :
              "Activate Two-Factor Authentication"
            }
          </Button>
          <Button className="save-changes-button" as="input" type="submit" value="Save Changes" variant="dark"/>
          <Button className="delete-button" onClick={() => {
            const input = window.prompt("Do you want to delete your account? " +
            "The account and password storages data will be deleted and cannot be recovered. " +
            "Enter Yes for account deletion.");

            if (input.trim().toLowerCase() === "yes") {
              deleteAccount();
            }
          }} variant="danger">Delete Account</Button>
        </form>
      </div>
    </>
  )
}

export default Profile;