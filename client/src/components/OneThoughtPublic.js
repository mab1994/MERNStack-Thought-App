import React from 'react'
import { Jumbotron, Container, Button, Badge } from 'reactstrap';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import { insertVote, extractVote } from '../actions/ThoughtActions';
import { connect } from 'react-redux';



const OneThoughtPublic = ({ post, insertVote, extractVote }) => {
    // useEffect(() => getLikers())

    // const [like, setLike] = useState(false)
    // const [likedBy, setLikedBy] = useState([])



    return (
        <div>
            <Jumbotron fluid>
                <Container fluid>
                    <h3><Badge color="warning">{post.category}</Badge>  {post.title}</h3>
                    <h4 className="display-6">{post.date}</h4>
                    <p>{post.content}</p>
                    <hr className="my-2" />
                    <div className="lead vtns">
                        <Button color="success" className="likebtn" onClick={() => insertVote(post._id)}><ThumbUpOutlinedIcon /></Button>
                        <h5>{post.votes.length} approves </h5>
                        <Button color="danger" className="likebtn" onClick={() => extractVote(post._id)}><ThumbDownOutlinedIcon /></Button>
                    </div>
                </Container>
            </Jumbotron>
        </div>
    )
}

// const mapStateToProps = state => {
   
// }

export default connect(null, { insertVote, extractVote })(OneThoughtPublic)