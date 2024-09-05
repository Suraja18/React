import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../pages/ShoppingMall/config/firebase';

const Navbar = ({ toggleSidebar }) => {
    const navigate = useNavigate();

    const handleTabClick = (link) => {
        navigate(link);
    }; 
    return (
        <>
            <div className="navbar">
                <div className="navbar-title">
                <div className="menu-icon" onClick={toggleSidebar}>☰</div>
                    <i className="fa fa-home" />
                    <span>Home</span>
                </div>
                <div className="navbar-tabs">
                    <div className={`navbar-tab`} onClick={() => handleTabClick('/shopping-mall/admin/dashboard')}>
                        <span>Dashboard</span>
                    </div>
                    <div className={`navbar-tab`} onClick={() => signOut(auth)}>
                        <span>Log Out</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar