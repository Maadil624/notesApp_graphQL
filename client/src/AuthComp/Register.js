import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import './Auth.css';
import { gql, useMutation } from '@apollo/client';

const REGISTER_USER = gql`
mutation RegisterUser($input: regUserType) {
  registerUser(input: $input) {
    data {
      name
      email
      password
    }
    message
    success
  }
}
`;

function Register() {
    let navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [registerUser, { ...remdata }] = useMutation(REGISTER_USER);

    const handleRegister = async () => {
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError('Invalid email format');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        setError('');
        const userData = {
            "input": {
                email,
                name,
                password
            }
        };
        console.log(userData)
        await registerUser({
            variables: userData,
        }).then((regdata) => {
            let data = regdata.data.registerUser
            console.log(data.message.toLowerCase().includes('sucessful'), data)
            if (data.message.toLowerCase().includes('sucessful') && data.success) {
                Swal.fire({
                    title: 'Registration sucessfull',
                    text: 'redirecting to login page',
                    icon: 'success',
                    timer: 3000,
                    allowOutsideClick: false,
                    confirmButtonText: 'ok'
                }).then((result) => {
                    if (result.isConfirmed) navigate('/login')
                })
            } else {
                Swal.fire({
                    title: 'Registration failed',
                    text: data.message,
                    icon: 'error',
                    confirmButtonText: 'ok'
                })
            }
            // console.log(regdata.data.registerUser.message)
        }).catch(error => {
            console.log("Error at Registration ", error)
        })
    };
    return (
        <div className="auth-container mt-5">
            <div className="auth-card glassmorphism">
                <h2>Register</h2>
                <form>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button type="button" onClick={handleRegister}>
                        Register
                    </button>
                </form>
                <Link to="/login">Already have an account? Login here</Link>
            </div>
        </div>
    );
}

export default Register;
