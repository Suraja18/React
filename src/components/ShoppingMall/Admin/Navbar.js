import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../pages/ShoppingMall/config/firebase';

const Navbar = () => {
    const navigate = useNavigate();

    const handleTabClick = (link) => {
        navigate(link);
    };
    return (
        <>
            <div className="navbar">
                <div className="navbar-title">
                    <i className="fa fa-home" />
                    <span>Home</span>
                </div>
                <div className="navbar-tabs">
                    <div key="Dashboard" className={`navbar-tab`} onClick={() => handleTabClick('/shopping-mall/admin/dashboard')}>
                        <span>Dashboard</span>
                    </div>
                    <div key="Dashboard" className={`navbar-tab`} onClick={() => signOut(auth)}>
                        <span>Log Out</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar