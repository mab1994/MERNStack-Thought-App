import React from 'react'
import { Jumbotron, Container, Button, Badge } from 'reactstrap';
import { connect } from 'react-redux'
import { deleteThought, storeThought } from '../actions/ThoughtActions'
import { Link } from 'react-router-dom';


const OneThought = ({ post, deleteThought, storeThought }) => {
    return (
        <div>
            <Jumbotron fluid>
                <Container fluid>
                    <h3><Badge color="warning">{post.category}</Badge>  {post.title}</h3>
                    <h4 className="display-6">{post.date}</h4>
                    <p>{post.content}</p>
                    <hr className="my-2" />
                    <div className="lead">
                        <Link to="/new"><Button color="warning" className="actbtn" onClick={ () => storeThought( post ) }>MODIFY</Button></Link>
                        <Button color="danger" className="actbtn" onClick={ () => deleteThought(post._id) }>DELETE</Button>
                        
                    </div>
                </Container>
            </Jumbotron>
        </div>
    )
}



export default connect( null, { deleteThought, storeThought } )(OneThought)
