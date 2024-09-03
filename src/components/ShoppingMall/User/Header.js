import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
    return (
        <>
            <div>
                <nav>
                    <ul>
                        <li><NavLink to="/">Practice</NavLink></li>
                        <li><NavLink to="/shopping-mall">Home</NavLink></li>
                        <li><NavLink to="/login">Login</NavLink></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}
