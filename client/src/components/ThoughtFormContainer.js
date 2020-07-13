import React from 'react'
import { Container, Row, Col, Alert } from 'reactstrap'
import '../App.css'
import ThoughtForm from './ThoughtForm'


const ThoughtFormContainer = () => {
    return (
        <div>
            <Container>
                <Row>
                    <Col xs="6">
                        <Alert color="warning" className="centered">
                            <h2>  </h2>
                            <ThoughtForm />
                        </Alert>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ThoughtFormContainer
