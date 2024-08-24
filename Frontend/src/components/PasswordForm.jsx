import { Button, Form } from 'react-bootstrap';
import '../styles/password_form.css';

function PasswordForm() {
  return (
    <>
      <div>
        <form className="password-form" id="passwordForm" method="post">
          {/* url input */}
          <div className="url">
            <label htmlFor="url">URL</label>
            <br/>
            <input type="text" id="url" name="url"/>
          </div>

          {/* website input */}
          <div className="website">
            <label htmlFor="website">Name of Website</label>
            <br/>
            <input type="text" id="website" name="website" required/>
          </div>

          {/* category drop-down list */}
          <Form.Select className="category-list">
            <option>Categories</option>
            <option value="Education">Education</option>
            <option value="Email">Email</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Music">Music</option>
            <option value="News Media">News Media</option>
            <option value="Retail">Retail</option>
            <option value="Social Media">Social Media</option>
            <option value="Technology">Technology</option>
            <option value="Video Games">Video Games</option>
          </Form.Select>

          {/* username input */}
          <div className="username">
            <label htmlFor="username">username</label>
            <br/>
            <input type="text" id="username" name="username" required/>
          </div>

          {/* password input */}
          <div className="password">
            <label htmlFor="password">password</label>
            <br/>
            <input type="password" id="password" name="password" required/>
          </div>

          {/* note input */}
          <div className="note">
            <label htmlFor="note">Note</label>
            <br/>
            <textarea id="note" name="note" rows="6" cols="70"></textarea>
          </div>
        </form>

        <Button className="password-form-buttons" as="input" type="submit" form="passwordForm" value="Save" variant="dark"/>
        <Button className="password-form-buttons" as="input" type="submit" form="passwordForm" value="Cancel" variant="dark"/>
      </div>
    </>
  )
}

export default PasswordForm;