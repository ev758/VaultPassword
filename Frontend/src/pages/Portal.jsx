import { useNavigate } from 'react-router-dom';
import PortalNavBar from '../components/PortalNavBar.jsx';
import PasswordStorage from '../components/PasswordStorage.jsx';
import '../styles/portal.css';

function Portal() {
  const navigate = useNavigate();

  return (
    <>
      <PortalNavBar/>

      <button
        className="material-icons add-password-button"
        onClick={() => navigate("add-password")}>
        add
      </button>

      <PasswordStorage/>
    </>
  )
}

export default Portal;