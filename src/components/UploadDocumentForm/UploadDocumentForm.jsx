import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { uplodaDocument } from '../Users/user-service';
import { useContext } from 'react';
import { UsersContext } from '../../context/UsersContext';

const UploadDocumentForm = () => {
    const [users, setUsers] = useContext(UsersContext)

    const handleFileUpload = e => {
        const uploadData = new FormData();

        uploadData.append('archivo', e.target.files[0]);

        uplodaDocument(uploadData)
            .then(() => setUsers())
            .catch(err => console.log(err))
    }

    return (
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col xs='6'>
                    <Form>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Please select a document</Form.Label>
                            <Form.Control type="file" onChange={e => handleFileUpload(e)} name='archivo' />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default UploadDocumentForm