import { useContext, useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { editUser } from '../Users/user-service';
import { UsersContext } from "../../context/UsersContext";

const EditUserForm = props => {
    const [users, setUsers] = useContext(UsersContext)
    const [userInfo, setUserInfo] = useState({
        internalID: props.editUserInfo.internalID,
        username: props.editUserInfo.username,
        password: props.editUserInfo.password,
        date: null,
        punchInHour: props.editUserInfo.punchInHour,
        punchOutHour: props.editUserInfo.punchOutHour
    });

    const handleInputChange = e => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    const resetInputs = () => {
        setUserInfo({
            ...userInfo,
            internalID: 0,
            username: '',
            password: '',
            date: null,
            punchInHour: '',
            punchOutHour: ''
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        editUser(props.editUserInfo._id, userInfo)
            .then(() => {
                resetInputs()
                setUsers()
            })
            .catch(error => console.log(error))

    }
    return (
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col xs='6'>
                    <Button variant="warning" onClick={() => props.closeForm()}>
                        Close
                    </Button>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='text-center w-100'>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name='username' onChange={e => handleInputChange(e)} value={userInfo.username} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='text-center w-100'>Internal ID</Form.Label>
                            <Form.Control type="number" placeholder="Enter internal ID" name='internalID' onChange={e => handleInputChange(e)} value={userInfo.internalID} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='text-center w-100'>Date:</Form.Label>
                            <Form.Control type="date" name='date' onChange={e => handleInputChange(e)} />
                        </Form.Group>



                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className='text-center w-100'>Punch in</Form.Label>
                            <Form.Control type="text" placeholder="00:00" name='punchInHour' onChange={e => handleInputChange(e)} value={userInfo.punchInHour}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className='text-center w-100'>Punch out</Form.Label>
                            <Form.Control type="text" placeholder="00:00" name='punchOutHour' onChange={e => handleInputChange(e)} value={userInfo.punchOutHour}/>
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={e => handleSubmit(e)}>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default EditUserForm