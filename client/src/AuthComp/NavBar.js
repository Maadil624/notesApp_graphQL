import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const NavBar = () => {
    return (
        <div className="sticky-navbar">
            <span className="notification-icon">
                <Link to={`/login`} >
                    <button type="button" class="btn btn-danger" >Logout</button>
                </Link>
            </span>
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/home">About</Link>
                </li>

                <li>
                    <Link to="/adduser">Add User</Link>
                </li>
            </ul>
        </div>
    );
};

export default NavBar;