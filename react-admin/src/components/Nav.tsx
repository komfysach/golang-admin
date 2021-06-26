import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ user, setLogin }: { user: any, setLogin: Function }) => {

    const logout = async () => {
        await axios.post('logout', {});

        setLogin();

    }
    let links;

    if (user) {
        links = (
            <ul className="my-2 my-md-0 mr-md-3">
                <li className="nav-item">
                    <Link to="/profile" className="p-2 text-white text-decoration-none">{user?.first_name}</Link>
                    <Link to="/" onClick={logout} className="nav-link text-decoration-none">Logout</Link>
                </li>
            </ul>
        )
    } else {
        links = (
            <ul className="my-2 my-md-0 mr-md-3">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        )
    }

    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
            {links}
        </nav>
    );
}

export default Nav;