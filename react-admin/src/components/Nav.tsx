import axios from 'axios';
import React from 'react';
import { User } from '../models/user'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = (props: { user: User }) => {

    const logout = async () => {
        await axios.post('logout', {});
    }

    return (


        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
            <ul className="my-2 my-md-0 mr-md-3">
                <li className="nav-item">
                    <Link to="/profile" className="p-2 text-white text-decoration-none">{props.user.name}</Link>
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
const mapStateToProps = (state: { user: User }) => {
    return {
        user: state.user
    }

}

export default connect(mapStateToProps)(Nav);