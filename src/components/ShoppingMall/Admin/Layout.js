import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../../pages/ShoppingMall/config/firebase';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './style.css';

const Layout = (props) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      }
    });
  }, [navigate]);

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
  };
  return (
    <>
      <div className="app-container">
        <Sidebar isSidebarOpen={sidebarOpen} closeSidebar={toggleSidebar} />
        <div className="main-content">
          <Navbar toggleSidebar={toggleSidebar} />

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