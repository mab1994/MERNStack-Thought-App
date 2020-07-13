import React, { useState } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import FaceIcon from '@material-ui/icons/Face';
import PostAddSharpIcon from '@material-ui/icons/PostAddSharp';
import { connect } from 'react-redux'
import { logout } from '../actions/AuthActions'
import { removeCurrent } from '../actions/ThoughtActions'

const Navigation = props => {

  const logoutOk = () => {
    props.logout()
    props.removeCurrent()
  }

  // ---Navigation Bar Hooks---
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  
  // ---"IsConnected" Function---
  const isConnected = () => (
    <div>

      <Navbar color="warning" dark expand="md">
        <NavbarBrand href="/"><FaceIcon fontSize="large" /> PublicThoughts </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink><Link to="/recent"><Button primary>Most Recent</Button></Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink><Link to="/recentConnected"><Button primary>My Thoughts</Button></Link></NavLink>
            </NavItem>
            
          </Nav>
          <Link to="/new"><Button primary><PostAddSharpIcon /></Button></Link>
          <Link to="/"><Button primary onClick={logoutOk}>Exit</Button></Link>
        </Collapse>
      </Navbar>

      {/* ---Category Dialog--- */}
      
    </div>
  )

  // ---NotConnected Function---
  const notConnected = () => (
    <div>

      <Navbar color="warning" dark expand="md">
        <NavbarBrand href="/"><FaceIcon fontSize="large" /> PrivateThoughts </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            
          </Nav>
          
          <Link to="/login"><Button primary>Login</Button></Link>
        </Collapse>
      </Navbar>

    </div>
  )

  return (
    <div>
      {
        props.auth.isAuthenticated ? isConnected() : notConnected()
      }
    </div>

  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { logout, removeCurrent })(Navigation)
