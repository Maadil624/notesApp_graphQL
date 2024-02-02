import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useLazyQuery } from '@apollo/client'
import Login from './AuthComp/Login';
import Register from './AuthComp/Register';
import Home from './AuthComp/Home';
import EmployeeSearch from './AuthComp/EmployeeSearch';
import Adduser from './AuthComp/AddUser';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from './AuthComp/UserCard';
import { setUserData } from './redux/Actions/Action';


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

function App({ store }) {
  // const [users, setusers] = useState()
  // const [getUsers, { loading, data }] = useLazyQuery(gqlquery);
  // const dispatch = useDispatch();
  // const userData = useSelector((state) => state.userData);
  // useEffect(() => {
  // getUsers();
  // if (data) {
  // setusers(data?.users?.data)
  // dispatch(setUserData(data?.users?.data));
  // }
  // console.log('object', data)
  // console.log(userData)
  // }, [data, getUsers, userData]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<UserCard />} />
        <Route path='/employee' element={<EmployeeSearch />} />
        <Route path='adduser' element={<Adduser />} />
      </Routes>

    </>
  );
}

export default App;
