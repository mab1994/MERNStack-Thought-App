import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getThought } from '../actions/ThoughtActions'
import OneThoughtPublic from './OneThoughtPublic'

class ThoughtList extends Component  {
    componentDidMount() {
        this.props.getThought()
    }
    
    render() {
        return (
            <div>
                {
                    this.props.posts.thought.length === 0 ? (
                        <h4>Empty List! </h4>
                    ) : (
                    this.props.posts.thought.map( post => <OneThoughtPublic post={post} /> )
                    )
                }
            </div>
        )
    }

    componentDidUpdate() {
        this.props.getThought()
    }
    
}

const mapStateToProps = state => {
    return {
        posts : state.thought
    }
}

export default connect(mapStateToProps, {getThought})(ThoughtList)