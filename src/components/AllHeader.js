import React from 'react';
import { NavLink } from 'react-router-dom';


function AllHeader() {
    return (
        <>
            <div>
                <nav>
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/table">Rapid API Fetch Table</NavLink></li>
                        <li><NavLink to="/user">Table with MySQL</NavLink></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default AllHeader