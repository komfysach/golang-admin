import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import '../register.css'

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lasttName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('register', {
            first_name: firstName,
            last_name: lasttName,
            email: email,
            password: password,
            password_confirm: confirmPassword
        });


        setRedirect(true);

    }

    if (redirect) {
        return <Redirect to="/login" />
    }

    return (
        <div>
            <form className="form-signin" onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please register</h1>
                <input className="form-control" placeholder="First Name" required
                    onChange={e => setFirstName(e.target.value)}
                />

                <input className="form-control" placeholder="Last Name" required
                    onChange={e => setLastName(e.target.value)}
                />

                <input type="email" className="form-control" placeholder="name@example.com" required
                    onChange={e => setEmail(e.target.value)}
                />

                <input type="password" className="form-control" placeholder="Password" required
                    onChange={e => setPassword(e.target.value)}
                />

                <input type="password" className="form-control" placeholder="Password Confirm" required
                    onChange={e => setConfirmPassword(e.target.value)}
                />

                <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;