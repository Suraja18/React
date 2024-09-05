import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Sidebar({ isSidebarOpen, closeSidebar }) {
    const [activeItem, setActiveItem] = useState('base');
    const navigate = useNavigate();
    const location = useLocation();
    const handleItemClick = (link) => {
        navigate(link);
    };
    const sidebarItems = useMemo(() => [
        { name: 'Dashboard', link: '/shopping-mall/admin/dashboard' },
        { name: 'Malls', link: '/shopping-mall/admin/malls' },
        { name: 'Shops', link: 'charts' },
        { name: 'Products', link: 'icons' },
    ], []);

    useEffect(() => {
        const currentPath = location.pathname;
        const matchedItem = sidebarItems.find((item) => currentPath.startsWith(item.link));
        if (matchedItem) {
            setActiveItem(matchedItem.name);
        }
    }, [location, sidebarItems]);
    
    return (
        <>
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <span className="sidebar-title">ADMIN PANEL</span>
                    <div className="menu-icon-close" onClick={closeSidebar}>X</div>
                </div>
                <div className="sidebar-items">
                    {sidebarItems.map((item, index) => (
                        <div
                            key={index}
                            className={`sidebar-item ${activeItem === item.name ? 'active' : ''}`}
                            onClick={() => handleItemClick(item.link)}
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