import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext, useEffect, useState } from 'react';
import AuthService from './auth-service';
import { setToken } from '../Users/user-service';
import { useNavigate } from 'react-router-dom';
import { UsersContext } from '../../context/UsersContext';

function LoginForm() {
    const [users, setUsers] = useContext(UsersContext)
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: ''
    });

    const handleInputChange = e => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value})
    }

    const authService = new AuthService()
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault();
        authService
            .login(userInfo)
            .then(response => {
                window.localStorage.setItem(
                    'userInfo', JSON.stringify(response) 
                );
                setToken()
                setUsers()
                navigate('/allUsers')
            })
            .catch(err => console.log(err.response.data.errorMessage));
    }
    return (
        <Container fluid className='main-container'>
            <Row className="justify-content-md-center">
                <Col xs='6'>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='text-center w-100'>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name='username' onChange={e => handleInputChange(e)} value={userInfo.username}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className='text-center w-100'>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name='password' onChange={e => handleInputChange(e)} value={userInfo.password}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginForm