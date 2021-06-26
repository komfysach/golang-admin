import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { User } from '../models/user'
import { Link } from 'react-router-dom';

const Nav = () => {
    const [user, setUser] = useState(
        {
            first_name: ''
        });

    const logout = async () => {
        await axios.post('logout', {});
    }

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('user');

            setUser(data);
        })();
    }, []);
    return (


        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
            <ul className="my-2 my-md-0 mr-md-3">
                <li className="nav-item">
                    <Link to="/profile" className="p-2 text-white text-decoration-none">{user?.first_name}</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="p-2 text-white text-decoration-none"
                        onClick={logout}
                    >Sign out</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;