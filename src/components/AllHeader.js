import React from 'react';
import { NavLink } from 'react-router-dom';


function AllHeader() {
    return (
        <>
            <div>
                <nav>
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/table">Table</NavLink></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default AllHeader