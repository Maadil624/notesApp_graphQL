import React, { useState } from 'react';
import { gql, useLazyQuery, useQuery } from "@apollo/client";
// import { graphql } from 'react-apollo'
// import { useQuery, useLazyQuery } from 'react-apollo';
const gqlquery = gql`
query Users {
  users {
    data {
      id
      loc
      name
    }
    message
    success
  }
}
`
const EmployeeSearch = (client) => {
    // const { data } = useQuery(gqlquery);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        address: '',
        department: '',
    });
    // const [getUsers, { loading, data }] = useQuery(gqlquery);
    const [getUsers, { loading, data }] = useLazyQuery(gqlquery);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        getUsers();
        console.log("data", data)

        console.log("client", client)
        // let results = await fetch('http://localhost:5000/graphql', {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         query: formData
        //     })
        // })
        // let characters = await results.json();
        // console.log(characters)

        // console.log('Form submitted:', formData);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    ID:
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Department:
                    <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default EmployeeSearch;
