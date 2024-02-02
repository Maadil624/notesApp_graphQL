import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import './Auth.css';
import NavBar from './NavBar';
import Swal from 'sweetalert2';

const ADD_USER = gql`
  mutation AddUser($input: addUserType) {
  addUser(input: $input) {
    data {
      age
      dep
      email
      loc
      name
    }
    message
    success
  }
}
`;

function AddUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [dep, setDep] = useState('');
    const [loc, setLoc] = useState('');
    const [error, setError] = useState('');

    const [addUser] = useMutation(ADD_USER);

    const handleAddUser = async () => {
        try {
            if (!/^\S+@\S+\.\S+$/.test(email)) {
                setError('Invalid email format');
                return;
            }
            setError('');

            const result = await addUser({
                variables: {
                    input: {
                        name,
                        email,
                        age: age ? parseInt(age) : null,
                        dep,
                        loc,
                    },
                },
            });

            // console.log('User added:', result?.data?.addUser.message);
            if (!result?.data?.addUser.message.includes('success')) {
                Swal.fire({
                    title: 'Failed to add user',
                    text: result?.data?.addUser.message || 'error occurred',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            } else {
                Swal.fire({
                    title: 'User Added',
                    text: result?.data?.addUser.message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                });
            }

        } catch (error) {
            // Handle errors
            Swal.fire({
                title: 'Failed to add user',
                text: error.message || 'error occurred',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            // console.error('Adding user failed:', error);
        }
    };

    return (
        <>
            <NavBar />
            <div className="auth-container mt-5">
                <div className="auth-card glassmorphism">
                    <h2>Add User</h2>
                    <form>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {/* <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
                        <input type="text" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                        <input type="text" placeholder="Department" value={dep} onChange={(e) => setDep(e.target.value)} />
                        <input type="text" placeholder="Location" value={loc} onChange={(e) => setLoc(e.target.value)} />
                        {error && <p className="error-message">{error}</p>}
                        <button type="button" onClick={handleAddUser}>
                            Add User
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddUser;
