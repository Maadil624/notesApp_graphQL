import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './userCard.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import NavBar from './NavBar';

const UPDATE_QUERY = gql`
mutation UpdateUser($input: updateUserType) {
  updateUser(input: $input) {
    data{
    id
    name
    email
    dep
    loc
    age
    }
    message
    success
  }
}`;

const DELETE_QUERY = gql`
mutation DeleteUser($input: deleteUserType) {
  deleteUser(input: $input) {
    data {
      id
    }
    message
    success
  }
}`

const gqlquery = gql`
query Users {
  users {
    data {
      id
      loc
      name
      email
      age
      dep
    }
    message
    success
  }
}`;

function UserCard() {
    const [getUsers, { loading }] = useLazyQuery(gqlquery);
    let navigate = useNavigate();

    const { id } = useParams();
    const [data, setData] = useState(null)
    const [usersdata, setusersData] = useState(null)
    const userData = useSelector((state) => state.userData);
    const [name, setName] = useState(data?.name)
    const [email, setEmail] = useState(data?.email)
    const [location, setLocation] = useState(data?.loc)
    const [age, setAge] = useState(data?.age)
    const [department, setDepartment] = useState(data?.dep)
    const [updateUser] = useMutation(UPDATE_QUERY);
    const [deleteUser] = useMutation(DELETE_QUERY);
    // console.log("data", id, userData, "queryParams")
    let updatedData = {
        id,
        name,
        email,
        location,
        age,
        department
    }
    async function handleSave() {
        const { data } = await updateUser({
            variables: {
                input: updatedData
            },

        });
        if (data.updateUser.message.includes('success')) {
            Swal.fire({
                title: 'Updated successful',
                text: 'Redirecting to Home...',
                icon: 'success',
                // timer: 3000,
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/home');
            });
        } else {
            Swal.fire({
                title: 'update failed',
                text: data.updateUser.message || 'Unknown error occurred',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
        console.log("data", data)
    }
    async function handleDelete(id) {
        const { data } = await deleteUser({
            variables: {
                input: {
                    id,
                    email
                }
            },
        });
        if (data.deleteUser.message.includes('success')) {
            Swal.fire({
                title: 'deleted successful',
                text: 'Redirecting to Home...',
                icon: 'success',
                // timer: 3000,
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/home');
            });
        } else {
            Swal.fire({
                title: 'delete failed',
                text: data.deleteUser.message || 'Unknown error occurred',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
        console.log("Data", data)
    }
    useEffect(() => {
        getUsers({
            context: {
                headers: {
                    Authorization: sessionStorage.getItem('token')
                }
            }
        }).then(data => {
            setusersData(data?.data?.users?.data)
        })
        if (usersdata) {
            const filteredUsers = usersdata.filter(user => user.id === id);
            setData(filteredUsers[0])
            setName((data?.name) ? data?.name : "")
            setAge((data?.age) ? data?.age : "")
            setLocation((data?.loc) ? data?.loc : "")
            setDepartment((data?.dep) ? data?.dep : "")
            setEmail((data?.email) ? data?.email : "")
            // console.log((data?.age) ? data?.age : "")
        }
        // console.log('iy', data, userData, usersdata)
    }, [userData, data, usersdata])
    return (
        <>
            <NavBar />
            <div className='cardsStyling' >
                <Card className='card' key={id} style={{ height: "max-content" }}>
                    <Card.Body >
                        <Card.Title><input value={(name) ? name : ""} placeholder='Enter your Name' onChange={(e) => { setName(e.target.value) }} /></Card.Title>
                        <Card.Text>
                            <input value={(email) ? email : ''} placeholder='Enter your Email' onChange={(e) => { setEmail(e.target.value) }} />
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item><input value={(location) ? location : "hyderabad"} placeholder='Enter your Location' onChange={(e) => { setLocation(e.target.value) }} /> </ListGroup.Item>
                        <ListGroup.Item><input type='text' value={(age) ? age : ""} placeholder='Enter your Age' onChange={(e) => { setAge(e.target.value) }} /></ListGroup.Item>
                        <ListGroup.Item><input value={(department) ? department : ""} placeholder='Enter your Department' onChange={(e) => { setDepartment(e.target.value) }} /> </ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <div className='buttons'>
                            <button type="button" class="btn btn-success" onClick={() => { handleSave(id) }}>Save</button>
                            <button type="button" class="btn btn-danger" onClick={() => { handleDelete(id) }} >Delete</button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default UserCard;