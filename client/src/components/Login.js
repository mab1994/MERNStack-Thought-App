import React, { Component } from 'react'
import { Button } from 'reactstrap';
import { connect } from 'react-redux'
import { v1 as uuid } from 'uuid'
import { login } from '../actions/AuthActions'
import { setAlert, removeAlert } from '../actions/AlertActions'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: '',
            password: '',
        };
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    loginOk = () => {
        if ( this.state.mail === '' || this.state.password === '' ) {
            let id = uuid()
            this.props.setAlert('Missing Fields!', "danger", id)
            setTimeout(() => {
            this.props.removeAlert(id)
            }, 3000);
        }
        else {
            this.props.login({
                mail: this.state.mail,
                password: this.state.password,
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/recent')
        }
        if (nextProps.auth.error === 'Inexistent Author! Please Register Free So You Can Use This Service' || nextProps.auth.error === 'Wrong Password ! Try Again') {
            let id = uuid()
            this.props.setAlert( nextProps.auth.error, 'danger', id )
            setTimeout(() => {
                this.props.removeAlert(id)
                this.props.clearError()
                }, 3000);
        }
        
    }

    render() {
        return (
            <form className="userform">
                <input type="email" name="mail" onChange={this.handleChange} placeholder="Email" className="login"></input>
                <input type="password" name="password" onChange={this.handleChange} placeholder="Password" className="login"></input>
                <Button color="warning" className="post" onClick={this.loginOk}>PROCEED</Button>
            </form>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { login, setAlert, removeAlert })(Login);