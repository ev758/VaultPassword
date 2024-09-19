import { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import modalPasswordStorage from '../utils/modal_password_storage.js';
import djangoApiConnection from '../django_api.js';
import '../styles/password_form.css';

function PasswordForm({ request, get="", storageId="", close=null }) {
  //declarations
  const [passwordStorage, setPasswordStorage] = useState([]);
  const navigate = useNavigate();
  const urlRef = useRef("");
  const websiteRef = useRef("");
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const noteRef = useRef("");

  if (get === "password storage") {
    useEffect(() => {
      modalPasswordStorage(setPasswordStorage, storageId);
    }, []);
  }

  const passwordRequest = async (event) => {
    event.preventDefault();
    const categories = event.target.categories.value;
    
    try {
      if (request === "add password") {
        //sends POST request to add password
        const response = await djangoApiConnection.post("add-password/", {
          url: urlRef.current.value,
          website_name: websiteRef.current.value,
          category: categories,
          username: usernameRef.current.value,
          stored_password: passwordRef.current.value,
          note: noteRef.current.value
        });

        navigate("/portal");
      }
      else if (request === "update password") {
        //sends POST request to update a password storage
        const response = await djangoApiConnection.post(`password-storage/update/${storageId}/`, {
          url: urlRef.current.value,
          website_name: websiteRef.current.value,
          category: categories,
          username: usernameRef.current.value,
          stored_password: passwordRef.current.value,
          note: noteRef.current.value
        });

        window.location.reload();
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <form className="password-form" id={"passwordForm" + passwordStorage.storage_id} onSubmit={passwordRequest}>
          {/* url input */}
          <div className="url">
            <label htmlFor={"url" + passwordStorage.storage_id}>URL</label>
            <br/>
            <input
              type="text"
              id={"url" + passwordStorage.storage_id}
              name={"url" + passwordStorage.storage_id}
              defaultValue={passwordStorage.url}
              ref={urlRef}
            />
          </div>

          {/* website input */}
          <div className="website">
            <label htmlFor={"website" + passwordStorage.storage_id}>Name of Website</label>
            <br/>
            <input
              type="text"
              id={"website" + passwordStorage.storage_id}
              name={"website" + passwordStorage.storage_id}
              defaultValue={passwordStorage.website_name}
              ref={websiteRef}
              required
            />
          </div>

          {/* category drop-down list */}
          <Form.Select className="category-list" name="categories">
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
            <label htmlFor={"username" + passwordStorage.storage_id}>username</label>
            <br/>
            <input
              type="text"
              id={"username" + passwordStorage.storage_id}
              name={"username" + passwordStorage.storage_id}
              defaultValue={passwordStorage.username}
              ref={usernameRef}
              required
            />
          </div>

          {/* password input */}
          <div className="password">
            <label htmlFor={"password" + passwordStorage.storage_id}>password</label>
            <br/>
            <input
              type="password"
              id={"password" + passwordStorage.storage_id}
              name={"password" + passwordStorage.storage_id}
              defaultValue={passwordStorage.stored_password}
              ref={passwordRef}
              required
            />
          </div>

          {/* note input */}
          <div className="note">
            <label htmlFor={"note" + passwordStorage.storage_id}>Note</label>
            <br/>
            <textarea
              id={"note" + passwordStorage.storage_id}
              name={"note" + passwordStorage.storage_id}
              defaultValue={passwordStorage.note}
              ref={noteRef}>
            </textarea>
          </div>
        </form>

        <Button
          className="password-form-buttons"
          as="input"
          type="submit"
          form={"passwordForm" + passwordStorage.storage_id}
          value="Save"
          variant="dark"
        />
        <Button
          className="password-form-buttons"
          onClick={() => {
            if (request === "add password") {
              navigate("/portal");
            }
            else if (request === "update password") {
              close();
            }
          }}
          variant="dark"
        >
          Cancel
        </Button>
      </div>
    </>
  )
}

export default PasswordForm;