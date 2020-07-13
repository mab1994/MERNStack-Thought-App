import React, { Component } from 'react'
import { v1 as uuid } from 'uuid'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Button } from 'reactstrap';
import { setAlert, removeAlert } from '../actions/AlertActions';
import { register, clearError } from '../actions/AuthActions'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastName: '',
            photo: null,
            birthdate: null,
            country: '',
            degree: '',
            institution: '',
            bio: '',
            mail: '',
            password: '',
        };
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    registerOk = () => {
        if (this.state.firstname === '' || this.state.lastname === '' || this.state.birthdate === null || this.state.country === '' || this.state.degree === '' || this.state.institution === '' || this.state.bio === '' || this.state.mail === '' || this.state.password === '') {
            let id = uuid()
            this.props.setAlert('Required Fields!', "danger", id)
            setTimeout(() => {
            this.props.removeAlert(id)
            }, 3000);
        }
        else {
            this.props.register({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                photo: this.state.photo,
                birthdate: this.state.birthdate,
                country: this.state.country,
                degree: this.state.degree,
                institution: this.state.institution,
                bio: this.state.bio,
                mail: this.state.mail,
                password: this.state.password,
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/recent')
        }
        if (nextProps.auth.error === 'It Already exists an user with this email adress! Try Again') {
            let id = uuid()
            this.props.setAlert( nextProps.auth.error, 'danger', id )
            setTimeout(() => {
                this.props.removeAlert(id)
                this.props.clearError()
                }, 3000);
        }
        
    }

    render() {
        console.log(this.props)
        return (
            <form className="userform">
                <input type="text" name="firstname" onChange={this.handleChange} placeholder="First Name" className="login"></input>
                <input type="text" name="lastname" onChange={this.handleChange} placeholder="LastName" className="login"></input>
                <input type="text" name="photo" onChange={this.handleChange} placeholder="Photo" className="login"></input>
                <input type="date" name="birthdate" onChange={this.handleChange} placeholder="Birthdate" className="login"></input>
                <input type="text" name="country" onChange={this.handleChange} placeholder="Country" className="login"></input>
                <input type="text" name="degree" onChange={this.handleChange} placeholder="Degree" className="login"></input>
                <input type="text" name="institution" onChange={this.handleChange} placeholder="Institution" className="login"></input>
                <textarea rows="5" name="bio" onChange={this.handleChange} placeholder="Biography" className="login"></textarea>
                <hr />
                <input type="email" name="mail" onChange={this.handleChange} placeholder="Email" className="login"></input>
                <input type="password" name="password" onChange={this.handleChange} placeholder="Password" className="login"></input>
                <Button color="warning" className="post" onClick={this.registerOk}>SUBSCRIBE</Button>
            </form>

        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { setAlert, removeAlert, register, clearError })(withRouter(Register));