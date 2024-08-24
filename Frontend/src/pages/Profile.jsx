import { Button } from 'react-bootstrap';
import ProfileImage from '../assets/profile.jpg';
import '../styles/profile.css'

function Profile() {
  return (
    <>
      <div>
        <h1 className="profile-title">Vault Password</h1>
        <img className="profile-image" src={ProfileImage} alt="profile image"/>
        <br/>

        <div className="profile">
          <label className="profile-label"></label>
          <br/>
          <label className="profile-label"></label>
        </div>
        
        <form className="profile-form" method="post">
          {/* first name input */}
          <div className="first-name">
            <label htmlFor="firstName">First Name</label>
            <br/>
            <input type="text" id="firstName" name="firstName" required/>
          </div>

          {/* last name input */}
          <div className="last-name">
            <label htmlFor="lastName">Last Name</label>
            <br/>
            <input type="text" id="lastName" name="lastName"/>
          </div>

          {/* email input */}
          <div className="email">
            <label htmlFor="email">email</label>
            <br/>
            <input type="email" id="email" name="email" required/>
          </div>

          {/* password input */}
          <div className="password">
            <label htmlFor="password">password</label>
            <br/>
            <input type="password" id="password" name="password" required/>
          </div>

          <Button className="authentication-button" as="input" type="submit" value="Activate Two-Step Authentication" variant="dark"/>
          <Button className="save-changes-button" as="input" type="submit" value="Save Changes" variant="dark"/>
          <Button className="delete-button" as="input" type="submit" value="Delete Account" variant="danger"/>
        </form>
      </div>
    </>
  )
}

export default Profile;