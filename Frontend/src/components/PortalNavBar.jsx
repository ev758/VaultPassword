import { Button, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function PortalNavBar({ setKeyword }) {
  const navigate = useNavigate();
  
  return (
    <>
      <div>
        <div className="portal-navbar">
          <h5 className="portal-title">Vault Password</h5>

          <InputGroup className="mb-3">
            <Form.Control
              id="searchbar"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  const keyword = document.getElementById("searchbar").value;
                  
                  if (keyword !== "") {
                    setKeyword(keyword);
                  }
                  else {
                    window.location.reload();
                  }
                }
              }}
            />
            <Button
              onClick={() => {
                const keyword = document.getElementById("searchbar").value;
                
                if (keyword !== "") {
                  setKeyword(keyword);
                }
                else {
                  window.location.reload();
                }
              }}
              variant="dark"
            >
              Search
            </Button>
          </InputGroup>

          <DropdownButton title={<span className="material-icons">person</span>} variant="light">
            <Dropdown.Item onClick={() => navigate("profile")}>View Profile</Dropdown.Item>
            <Dropdown.Item onClick={() => {
              localStorage.clear();
              navigate("/");
            }}>Logout</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </>
  )
}

export default PortalNavBar;