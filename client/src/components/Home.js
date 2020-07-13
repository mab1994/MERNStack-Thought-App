import React from 'react'
import { Container, Row, Col, Alert } from 'reactstrap'
import './ThoughtForm'
import '../App.css'
import Register from './Register'



const Home = () => {
    return (
        <div>
            <Container>
                <Row>
                    <Col xs="6">
                        <Alert color="light" className="centered">
                            <p className="welcome">This is the "Written Pinterest"! <br /> We believe that you have a beautiful ideas and you have your own view on life.<br /> Memorize what you think and classify it<br /> Any ideas about politics, culture, science or anything is appreciated!<br /> But before this, You should subscribe to this service.<br /> <strong>IT'S FREE</strong></p>
                        </Alert>
                    </Col>
                    {/* <Col xs="6"><ThoughtForm /></Col> */}
                    <Col xs="6" className="form-cont">
                        <Alert color="warning" className="centered">
                            <Register />
                        </Alert>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}



export default Home
