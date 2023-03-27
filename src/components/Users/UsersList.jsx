import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { useContext, useState } from 'react';
import CreateUserForm from './CreateUserForm';
import { deleteUser, editUser} from './user-service';
import EditUserForm from './EditUserForm';
import Button from 'react-bootstrap/esm/Button';
import { UsersContext } from '../../context/UsersContext';

const UsersList = () => {
    const [users, setUsers] = useContext(UsersContext)
    const [renderCreateUserForm, setRenderCreateUserForm] = useState(false);
    const [isAdminUser, setIsAdminUser] = useState(false);
    const [renderEditUserForm, setRenderEditUserForm] = useState(false);
    const [editUserInfo, setEditUserInfo] = useState(null)

    const createAdminUser = () => {
        setIsAdminUser(true)
        setRenderCreateUserForm(true)
    }

    const createUser = () => {
        setIsAdminUser(false)
        setRenderCreateUserForm(true)
    }

    const closeForm = () => {
        setRenderCreateUserForm(false)
        setUsers()
    }

    const removeUser = id => {
        deleteUser(id)
            .then(() => {
                setUsers()
            })
            .catch(err => console.log(err))
    }

    const renderEditForm = userInfo => {
        setRenderEditUserForm(true)
        setEditUserInfo(userInfo)
    }
 
    return (
        <>
            <h2>Lista de usuarios registrados:</h2>
            <Table striped responsive>
                <thead>
                    <tr>
                        <th>internalID</th>
                        <th>Username</th>
                        <th>Date</th>
                        <th>Punch in</th>
                        <th>Punch out</th>
                        <th>Edit user</th>
                        <th>Delete user</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.length > 0
                        && users
                            .filter(user => user.role === 'User')
                            .map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{user.internalID}</td>
                                        <td>{user.username}</td>
                                        <td>{user.date.split('T')[0]}</td>
                                        <td>{user.punchInHour}</td>
                                        <td>{user.punchOutHour}</td>
                                        <td><Button variant="warning" onClick={() => renderEditForm(user)}>Edit user</Button></td>
                                        <td><Button variant="danger" onClick={() => removeUser(user._id)}>Delete user</Button></td>
                                    </tr>
                                )
                            })
                    }
                </tbody>
            </Table>
            <Container className='d-flex justify-content-around'>
                <Button variant="success" onClick={() => createUser()}>Create new user</Button>
                <Button onClick={() => createAdminUser()}>Create new admin user</Button>
            </Container>
            {
                renderCreateUserForm
                &&
                <CreateUserForm isAdminUser={isAdminUser} closeForm={closeForm} />
            }
            {
                renderEditUserForm
                &&
                <EditUserForm editUserInfo={editUserInfo}/>
            }
        </>
    )
}

export default UsersList