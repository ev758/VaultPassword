import { Outlet } from 'react-router-dom';

function PortalLayout() {
  return (
    <>
      <div>
        <Outlet/>
      </div>
    </>
  )
}

export default PortalLayout;