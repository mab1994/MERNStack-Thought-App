import React, { Component } from 'react'
import PublicThoughtList from './PublicThoughtList'
import { connect } from 'react-redux'
import { loadUser } from '../actions/AuthActions'


class Recent extends Component {
    componentDidMount() {
        this.props.loadUser()
    }
    
    render() {
        return (
            <div>
                <p> Recent Thoughts! </p>
                <PublicThoughtList />
            </div>
        )
    }

}

export default connect(null, { loadUser })(Recent)
