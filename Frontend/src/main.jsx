import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Login from './pages/Login.jsx';
import CreateAccount from './pages/CreateAccount.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import PortalLayout from './layouts/PortalLayout.jsx';
import Portal from './pages/Portal.jsx';
import Profile from './pages/Profile.jsx';
import AddPassword from './pages/AddPassword.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './styles/index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index element={<Login/>}/>
      <Route path="create-account" element={<CreateAccount/>}/>
      <Route path="forgot-password" element={<ForgotPassword/>}/>
      <Route path="portal" element={<ProtectedRoute><PortalLayout/></ProtectedRoute>}>
        <Route index element={<ProtectedRoute><Portal/></ProtectedRoute>}/>
        <Route path="profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path="add-password" element={<ProtectedRoute><AddPassword/></ProtectedRoute>}/>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
);
