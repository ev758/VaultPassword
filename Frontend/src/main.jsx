import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Login from './Login.jsx';
import CreateAccount from './CreateAccount.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import Portal from './Portal.jsx';
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index element={<Login/>}/>
      <Route path="create-account" element={<CreateAccount/>}/>
      <Route path="forgot-password" element={<ForgotPassword/>}/>
      <Route path="portal" element={<Portal/>}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
);
