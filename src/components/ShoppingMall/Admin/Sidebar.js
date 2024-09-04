import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Sidebar() {
    const [activeItem, setActiveItem] = useState('base');
    const navigate = useNavigate();
    const location = useLocation();
    const handleItemClick = (item, link) => {
        navigate(link);
    };

    useEffect(() => {
        const currentPath = location.pathname;
        const matchedItem = sidebarItems.find((item) => item.link === currentPath);
        if (matchedItem) {
            setActiveItem(matchedItem.name);
        }
    }, [location]);

    const sidebarItems = [
        { name: 'Dashboard', link: '/shopping-mall/admin/dashboard' },
        { name: 'Malls', link: '/shopping-mall/admin/malls' },
        { name: 'Shops', link: 'charts' },
        { name: 'Products', link: 'icons' },
    ];
    return (
        <>
            <div className="sidebar">
                <div className="sidebar-header">
                    <span className="sidebar-title">ADMIN PANEL</span>
                </div>
                <div className="sidebar-items">
                    {sidebarItems.map((item) => (
                        <div
                            key={item.name}
                            className={`sidebar-item ${activeItem === item.name ? 'active' : ''}`}
                            onClick={() => handleItemClick(item.name, item.link)}
                        >
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Sidebar