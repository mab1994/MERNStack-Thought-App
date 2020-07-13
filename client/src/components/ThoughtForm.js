import React, { Component } from 'react'
import { Button } from 'reactstrap';
import { connect } from 'react-redux'
import { addThought, modifyThought, clearThought } from '../actions/ThoughtActions'
import { Link } from 'react-router-dom'



class ThoughtForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.stored ? this.props.stored.title : '',
            category: this.props.stored ? this.props.stored.category : '',
            content:this.props.stored ?  this.props.stored.content : '',
        };
    }

handleChange = e => {
    this.setState({ [ e.target.name ]: e.target.value })
}

    render() {
        return (
            <form className="form-c">
                
                <input name="title" value={this.state.title} onChange={ this.handleChange } type="text" placeholder="Title" className="titlei" />
<br/>
                <select name="category" value={this.state.category} placeholder="Categories" onChange={ this.handleChange } className="cati" >
                    <option value="arts">Arts</option>
                    <option value="culture">Culture</option>
                    <option value="economics">Economics</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="international">International</option>
                    <option value="philosophy">Philosophy</option>
                    <option value="politics">Politics</option>
                    <option value="science">Science</option>
                    <option value="sociology">Sociology</option>
                </select>
<br/>
                
                <textarea name="content" value={this.state.content} onChange={ this.handleChange } rows="20" placeholder="Content" className="conti"></textarea>
                <br/>
                <Button color="warning" className="postbtn" onClick={ e => { 
                    e.preventDefault()
                    if(this.props.stored) {
                        this.props.modifyThought(this.props.stored._id, this.state)
                        this.props.clearThought()
                    } else {
                        this.props.addThought( this.state )
                    }
                    this.setState({ title: '', category: '', content: '' })
                     } }><Link to="/recent"><p className="post">{this.props.stored ? 'MODIFY' : 'POST'}</p></Link></Button>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        stored: state.thought.saved
    }
}

export default connect( mapStateToProps, { addThought, modifyThought, clearThought } )(ThoughtForm);