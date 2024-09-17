import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PasswordForm from './PasswordForm.jsx';
import getPasswordStorages from '../utils/get_password_storages.js';
import djangoApiConnection from '../django_api.js';

function PasswordStorage({ keyword }) {
  //declarations
  const categoryList = ["Categories", "Education", "Email", "Entertainment", "Music",
  "News Media", "Retail", "Social Media", "Technology", "Video Games"];
  const [passwordStorages, setPasswordStorages] = useState([]);
  const [show, setShow] = useState();
  const [deleteOption, setDeleteOption] = useState();
  const close = () => setShow(false);
  const closeDeleteRequest = () => setDeleteOption(false)
  const modal = (passwordStorageId) => setShow(passwordStorageId);
  const deleteRequest = (passwordStorageId) => setDeleteOption(passwordStorageId);

  useEffect(() => {
    getPasswordStorages(setPasswordStorages);
  }, []);

  const copyPassword = async (storageId) => {
    try {
      //sends GET request to get password
      const response = await djangoApiConnection.get(`password-storage/copy-password/${storageId}/`);

      navigator.clipboard.writeText(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  const deletePasswordStorage = async (storageId) => {
    try {
      //sends DELETE request to delete a password storage
      const response = await djangoApiConnection.delete(`password-storage/delete/${storageId}/`);

      window.location.reload();
    }
    catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
      <div className="password-storage">
        {(keyword !== null) ?
          <div className="category">
            <h4 className="category-title">Search results of {keyword}</h4>
            <hr/>
            <div className="category-format">
              {//loops through password storages
                passwordStorages.map(passwordStorage => 
                  (passwordStorage.website_name === keyword ||
                    passwordStorage.username === keyword) ?
                  <div className="category-passwords" key={passwordStorage.storage_id}>
                    <h5>{passwordStorage.website_name}</h5>
                    <h6>{passwordStorage.username}</h6>
                    <Button
                      className="material-icons password-storage-buttons"
                      onClick={() => copyPassword(passwordStorage.storage_id)}
                      variant="dark"
                    >
                      content_copy
                    </Button>
                    <Button
                      className="material-icons password-storage-buttons"
                      onClick={() => modal(passwordStorage.storage_id)}
                      variant="dark"
                    >
                      edit
                    </Button>
                    <Button
                      className="material-icons password-storage-buttons"
                      onClick={() => deleteRequest(passwordStorage.storage_id)}
                      variant="danger"
                    >
                      delete_forever
                    </Button>

                    {/* displays password storage */}
                    <Modal show={show === passwordStorage.storage_id} onHide={close}>
                      <Modal.Body>
                        <PasswordForm
                          request="update password"
                          get="password storage"
                          storageId={passwordStorage.storage_id}
                          close={close}
                        />
                      </Modal.Body>
                    </Modal>

                    {/* displays delete request */}
                    <Modal show={deleteOption === passwordStorage.storage_id} onHide={closeDeleteRequest}>
                      <Modal.Body>
                        <div>
                          <h3>Do you want to delete the password storage?</h3>
                          <Button
                            className="option-buttons"
                            onClick={() => deletePasswordStorage(passwordStorage.storage_id)}
                            variant="dark"
                          >
                            Yes
                          </Button>
                          <Button
                            className="option-buttons"
                            onClick={() => closeDeleteRequest()}
                            variant="dark"
                          >
                            No
                          </Button>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </div> :
                  <div style={{display: "none"}}></div>
                )
              }
            </div>
          </div> :
          //displays categories dynamically
          categoryList.map(category => 
            <div className="category">
              <h4 className="category-title">{category}</h4>
              <hr/>
              <div className="category-format">
                {//loops through password storages
                  passwordStorages.map(passwordStorage => 
                    (passwordStorage.category === category) ?
                    <div className="category-passwords" key={passwordStorage.storage_id}>
                      <h5>{passwordStorage.website_name}</h5>
                      <h6>{passwordStorage.username}</h6>
                      <Button
                        className="material-icons password-storage-buttons"
                        onClick={() => copyPassword(passwordStorage.storage_id)}
                        variant="dark"
                      >
                        content_copy
                      </Button>
                      <Button
                        className="material-icons password-storage-buttons"
                        onClick={() => modal(passwordStorage.storage_id)}
                        variant="dark"
                      >
                        edit
                      </Button>
                      <Button
                        className="material-icons password-storage-buttons"
                        onClick={() => deleteRequest(passwordStorage.storage_id)}
                        variant="danger"
                      >
                        delete_forever
                      </Button>

                      {/* displays password storage */}
                      <Modal show={show === passwordStorage.storage_id} onHide={close}>
                        <Modal.Body>
                          <PasswordForm
                            request="update password"
                            get="password storage"
                            storageId={passwordStorage.storage_id}
                            close={close}
                          />
                        </Modal.Body>
                      </Modal>

                      {/* displays delete request */}
                      <Modal show={deleteOption === passwordStorage.storage_id} onHide={closeDeleteRequest}>
                        <Modal.Body>
                          <div>
                            <h3>Do you want to delete the password storage?</h3>
                            <Button
                              className="option-buttons"
                              onClick={() => deletePasswordStorage(passwordStorage.storage_id)}
                              variant="dark"
                            >
                              Yes
                            </Button>
                            <Button
                              className="option-buttons"
                              onClick={() => closeDeleteRequest()}
                              variant="dark"
                            >
                              No
                            </Button>
                          </div>
                        </Modal.Body>
                      </Modal>
                    </div> :
                    <div style={{display: "none"}}></div>
                  )
                }
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}
  
export default PasswordStorage;