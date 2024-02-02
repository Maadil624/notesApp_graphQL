import React, { useEffect, useLayoutEffect, useState } from 'react'
import UserCards from './UserCards';
import "./userCard.css"
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/Actions/Action';
import { gql, useLazyQuery } from '@apollo/client';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

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

function Home() {
  let navigate = useNavigate()
  const [users, setusers] = useState()
  const [getUsers, { loading, data }] = useLazyQuery(gqlquery);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  useEffect(() => {
    // console.log(sessionStorage.getItem('token'))
    getUsers({
      context: {
        headers: {
          Authorization: sessionStorage.getItem('token')
        }
      }
    }).then(data => {
      // console.log(data?.data?.users)
      if (!data.data?.users?.message.includes('success')) {
        Swal.fire({
          title: `${data?.data?.users?.message}`,
          // text: `${data?.data?.users?.message ?? "please relogin"}` || "please contact developer for details",
          // timer: 3000,
          icon: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) navigate('/')
          // console.log(result)
        })
      } else {
        if (data.data?.users?.message) {
          Swal.fire({
            title: `${data?.data?.users?.message}`,
            // text: `${data?.data?.users?.message ?? "please relogin"}` || "please contact developer for details",
            timer: 3000,
            icon: 'success',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
          }).then(result => {
            console.log(data)
            setusers(data?.data?.users?.data);
            dispatch(setUserData(data?.users?.data));
          })
        }
        // console.log('data', data)
      }
    })
    // console.log('object', data)
    // console.log(userData)
  }, [data, getUsers, userData]);

  return (
    <>
      <NavBar />
      <div className='cardsStyling'>
        {users ? (
          users.map((data, key) => {
            return <UserCards data={data} id={key + 1} key={key + 1} />
          })
        ) : <p>loading data.....</p>}
      </div>
    </>
  )
}
// export const updateusers = getUsers;
export default Home;
