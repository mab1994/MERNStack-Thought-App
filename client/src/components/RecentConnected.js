import React, { Component } from 'react'
import ThoughtList from './ThoughtList'
import { connect } from 'react-redux'
import { loadUser } from '../actions/AuthActions'


class Recent extends Component {
    componentDidMount() {
        this.props.loadUser()
    }
    
    render() {
        return (
            <div>
                <p> My Thoughts! </p>
                <ThoughtList />
            </div>
        )
    }

}

export default connect(null, { loadUser })(Recent)