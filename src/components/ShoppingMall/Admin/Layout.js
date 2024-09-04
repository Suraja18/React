import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../../pages/ShoppingMall/config/firebase';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './style.css';

const Layout = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.email);
      } else {
        navigate('/login');
      }
    });
  }, [navigate]);
  return (
    <>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Navbar />

          <div className="content">
            {props.children}
          </div>
        </div>
        <div className="footer">
          <span>Copyright © 2024</span>
        </div>
      </div>
    </>
  )
}

export default Layout