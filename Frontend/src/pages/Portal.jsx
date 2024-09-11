import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalNavBar from '../components/PortalNavBar.jsx';
import PasswordStorage from '../components/PasswordStorage.jsx';
import '../styles/portal.css';

function Portal() {
  //declarations
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(null);

  return (
    <>
      <PortalNavBar setKeyword={setKeyword}/>

      <button
        className="material-icons add-password-button"
        onClick={() => navigate("add-password")}>
        add
      </button>

      <PasswordStorage keyword={keyword}/>
    </>
  )
}

export default Portal;