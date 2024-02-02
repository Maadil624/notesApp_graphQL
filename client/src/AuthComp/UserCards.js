import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './userCard.css'
import { Link, useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

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

function UserCards({ data, id }) {
    let email = data.email
    let navigate = useNavigate()
    const [deleteUser] = useMutation(DELETE_QUERY);
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
                // text: 'Redirecting to Home...',
                icon: 'success',
                timer: 3000,
                confirmButtonText: 'OK',
            }).then(() => {
                // navigate('/home');
            });
        } else {
            Swal.fire({
                title: 'delete failed',
                text: data.deleteUser.message || 'Unknown error occurred',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }

    }
    // console.log(data, id)
    return (
        <>
            <Card className='card' key={id}>
                <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Text>
                        {data.email}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>loc : {(data.loc) ? data.loc : "hyderabad"}</ListGroup.Item>
                    <ListGroup.Item>Age :{data.age}</ListGroup.Item>
                    <ListGroup.Item>dep : {data.dep}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <div className='buttons'>
                        <Link to={`/home/${data.id}`} >
                            <button type="button" class="btn btn-success" >Edit</button>
                        </Link>
                        <button type="button" class="btn btn-danger" onClick={() => { handleDelete(data.id) }}>Delete</button>
                    </div>
                </Card.Body>
            </Card>
            {/* {(data) ? <div className='cardsStyling'>
                {
                    data.map((data, key) => {
                        return (
                            
                        )
                    })
                }
            </div> : <p>loading data ..... </p>} */}
        </>
    );
}

export default UserCards;