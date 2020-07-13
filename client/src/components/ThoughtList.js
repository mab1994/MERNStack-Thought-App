import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getThoughtConnected } from '../actions/ThoughtActions'
import OneThought from './OneThought'

class ThoughtList extends Component  {
    componentDidMount() {
        this.props.getThoughtConnected()
    }
    
    render() {
        return (
            <div>
                {
                    (this.props.posts.thought.length === 0) ? ( 
                    <h4>Empty List! </h4>
                    ) : (
                    this.props.posts.thought.map( post => <OneThought key={post.id} post={post} /> )
                    )
                }
            </div>
        )
    }
    
}

const mapStateToProps = state => {
    return {
        posts : state.thought
    }
}

export default connect(mapStateToProps, {getThoughtConnected})(ThoughtList)