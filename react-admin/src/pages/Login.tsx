import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import '../Register.css';

const Login = ({ setLogin }: { setLogin: Function }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('login', {
            email,
            password
        });

        setRedirect(true);
    }

    if (redirect) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <form className="form-signin" onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <input type="email" className="form-control" placeholder="name@example.com" required
                onChange={e => setEmail(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Password" required
                onChange={e => setPassword(e.target.value)}
            />

            <div className="mb-3">
                <Link to="/forgot">Forgot Passowrd?</Link>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    );
};

export default Login;