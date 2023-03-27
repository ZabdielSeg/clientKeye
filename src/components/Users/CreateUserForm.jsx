import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { createUser } from '../Users/user-service';
// import AuthService from './auth-service';


const CreateUserForm = ({ isAdminUser, closeForm }) => {
  const [userInfo, setUserInfo] = useState({
    internalID: 0,
    username: '',
    password: '',
    date: null,
    punchInHour: '',
    punchOutHour: ''
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
    if (isAdminUser) {

      const userToSend = {
        ...userInfo,
        role: 'Admin'
      }

      createUser(userToSend)
        .then(() => {
          closeForm()
        })
        .catch(error => console.log(error))

    } else {
      createUser(userInfo)
        .then(() => {
          closeForm()
        })
        .catch(error => console.log(error))
    }
  }
  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col sm>
          <Button variant="warning" className='' onClick={() => closeForm()}>
            Close
          </Button>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label className='text-center w-100'>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" name='username' onChange={e => handleInputChange(e)} />
            </Form.Group>
            {
              isAdminUser ?
                <>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='text-center w-100'>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name='password' onChange={e => handleInputChange(e)} />
                  </Form.Group>
                </>
                :
                <>
                  <Form.Group className="mb-3" controlId="formBasicInternalID">
                    <Form.Label className='text-center w-100'>Internal ID</Form.Label>
                    <Form.Control type="number" placeholder="Enter internal ID" name='internalID' onChange={e => handleInputChange(e)} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label className='text-center w-100'>Date:</Form.Label>
                    <Form.Control type="date" name='date' onChange={e => handleInputChange(e)} />
                  </Form.Group>



                  <Form.Group className="mb-3" controlId="formBasicPunchIn">
                    <Form.Label className='text-center w-100'>Punch in</Form.Label>
                    <Form.Control type="text" placeholder="00:00" name='punchInHour' onChange={e => handleInputChange(e)} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPunchOut">
                    <Form.Label className='text-center w-100'>Punch out</Form.Label>
                    <Form.Control type="text" placeholder="00:00" name='punchOutHour' onChange={e => handleInputChange(e)} />
                  </Form.Group>
                </>
            }
            <Button variant="primary" type="submit" onClick={e => handleSubmit(e)}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default CreateUserForm