// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Auth.css';

const LOGIN_USER = gql`
  mutation LoginUser($input: regUserType) {
  loginUser(input: $input) {
    data {
      email
      password
    }
    message
    token
  }
}
`;

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState(sessionStorage.getItem('email') ? sessionStorage.getItem('email') : "");
    const [password, setPassword] = useState(sessionStorage.getItem('pass') ? sessionStorage.getItem('pass') : "");

    const [loginUser] = useMutation(LOGIN_USER);
    // console.log(loginUser)
    const handleLogin = async () => {
        try {
            const userData = {
                "input": {
                    email,
                    password
                }
            };
            // console.log(userData)
            const { data } = await loginUser({
                variables: userData,
            });
            if (data.loginUser.message.includes("sucessfull")) {
                Swal.fire({
                    title: 'Login successful',
                    text: 'Redirecting to Home...',
                    icon: 'success',
                    // timer: 3000,
                    confirmButtonText: 'OK',
                }).then(() => {
                    // console.log(data.loginUser)
                    sessionStorage.setItem('email', email)
                    sessionStorage.setItem('pass', password)
                    const token = sessionStorage.setItem('token', data.loginUser.token);
                    navigate('/home');
                });
            } else {
                Swal.fire({
                    title: 'Login failed',
                    text: data.loginUser.message || 'Unknown error occurred',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };
    useEffect(() => {
        sessionStorage.removeItem('token');
        // sessionStorage.clear()
    }, [])
    return (
        <div className="auth-container mt-5">
            <div className="auth-card glassmorphism">
                <h2>Login</h2>
                <form>
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
                    <button type="button" onClick={handleLogin}>
                        Login
                    </button>
                </form>
                <Link to="/register">Don't have an account? Register here</Link>
            </div>
        </div>
    );
}

export default Login;







// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Swal from "sweetalert2"
// import './Auth.css';

// function Login() {
//     let navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const handleLogin = () => {
//         if (!/^\S+@\S+\.\S+$/.test(email)) {
//             setError('Invalid email format');
//             return;
//         }
//         if (password.length < 6) {
//             setError('Password must be at least 6 characters');
//             return;
//         }

//         setError('');
//         let url = 'http://localhost:4000/graphql'
//         fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 email,
//                 password
//             }),
//         }).then(response => response.json())
//             .then(data => {
//                 if (data.sucess) {
//                     Swal.fire({
//                         title: 'login sucessfull',
//                         text: 'redirecting to Home.....',
//                         icon: 'success',
//                         confirmButtonText: 'ok'
//                     }).then(() => {
//                         navigate('/home')
//                     })
//                 } else {
//                     Swal.fire({
//                         title: 'login failed',
//                         icon: 'error',
//                         confirmButtonText: 'ok'
//                     })
//                 }
//             })
//             .catch(error => {
//                 console.error('Registration failed:', error);
//             });
//         // console.log('Logging in:', email, password);
//     };
//     useEffect(() => {
//         // console.log('hiiii')
//     }, [])
//     return (
//         <div className="auth-container">
//             <div className="auth-card glassmorphism">
//                 <h2>Login</h2>
//                 <form >
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     {error && <p className="error-message">{error}</p>}
//                     <button type="button" onClick={handleLogin}>
//                         Login
//                     </button>
//                 </form>
//                 <Link to="/register">Don't have an account? Register here</Link>
//             </div>
//         </div>
//     );
// }

// export default Login;
