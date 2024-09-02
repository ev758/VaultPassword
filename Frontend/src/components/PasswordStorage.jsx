import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import PasswordForm from './PasswordForm.jsx';
import getPasswordStorages from '../utils/get_password_storages.js';

function PasswordStorage() {
  //declarations
  const categoryList = ["Categories", "Education", "Email", "Entertainment", "Music",
  "News Media", "Retail", "Social Media", "Technology", "Video Games"];
  const [passwordStorages, setPasswordStorages] = useState([]);
  const [show, setShow] = useState();
  const close = () => setShow(false);
  const modal = (passwordStorageId) => setShow(passwordStorageId);

  useEffect(() => {
    getPasswordStorages(setPasswordStorages);
  }, []);
  
  return (
    <>
      <div className="password-storage">
        {//displays categories dynamically
          categoryList.map(category => 
            <div className="category">
              <h4 className="category-title">{category}</h4>
              <hr/>
              <div className="category-format">
                {//loops through password storages
                  passwordStorages.map(passwordStorage => 
                    (passwordStorage.category === category) ?
                    <div className="category-passwords" onClick={() => modal(passwordStorage.storage_id)} key={passwordStorage.storage_id}>
                      <h5>{passwordStorage.website_name}</h5>

                      {/* displays password storage */}
                      <Modal show={show === passwordStorage.storage_id} onHide={close} backdrop="static" keyboard={false}>
                        <Modal.Body>
                          <PasswordForm request="update password" get="password storage" storageId={passwordStorage.storage_id}/>
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