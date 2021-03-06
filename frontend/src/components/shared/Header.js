import React from 'react'
import { connect } from 'react-redux'
import { Collapse, Row, Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler } from 'reactstrap'
import { loginUser, logoutUser } from '../../actions/userActions'
import { push } from 'react-router-redux'
import uport from '../../utilities/uport'
import { isEmpty } from 'lodash'

class Header extends React.Component {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.getUport = this.getUport.bind(this)
    this.handleLogout = this.handleLogout.bind(this)

    this.state = {
      isOpen: false
    }
  }
  getUport () {
    uport.requestCredentials({
      requested: ['name', 'avatar'],
      notifications: true
    }).then((credentials) => {
      this.props.loginUser(credentials)
    })
  }
  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  handleLogout () {
    this.props.goHome()
    this.props.logoutUser()
  }
  render () {
    const nav = isEmpty(this.props.user)
      ? (<Navbar color='faded' light toggleable>
        <NavbarBrand href={'/'} className='mr-auto'>NEMO</NavbarBrand>
        <Nav className='ml-auto' navbar style={{flexDirection: 'row'}}>
          <NavItem style={{paddingTop: 6, paddingBottom: 6, paddingLeft: 12, paddingRight: 12}}>
            <NavLink onClick={this.getUport}>Login</NavLink>
          </NavItem>
        </Nav>
      </Navbar>)
      : (<Navbar color='faded' light toggleable>
        <NavbarBrand href={'/home'}>NEMO</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem style={{paddingTop: 6, paddingBottom: 6, paddingLeft: 12, paddingRight: 12}}>
              <NavLink href='/mpi'>MPI</NavLink>
            </NavItem>
            <NavItem style={{paddingTop: 6, paddingBottom: 6, paddingLeft: 12, paddingRight: 12}}>
              <NavLink href='https://polar-forest-13728.herokuapp.com/'>Spokes</NavLink>
            </NavItem>
            <NavItem style={{paddingTop: 6, paddingBottom: 6, paddingLeft: 12, paddingRight: 12}}>
              <NavLink href='/circles'>Circles</NavLink>
            </NavItem>
            <NavItem style={{paddingTop: 6, paddingBottom: 6, paddingLeft: 12, paddingRight: 12}}>
              <NavLink href='/map'>Map</NavLink>
            </NavItem>
            <NavItem style={{paddingTop: 6, paddingBottom: 6, paddingLeft: 12, paddingRight: 12}}>
              <NavLink href='/profiles'>Members</NavLink>
            </NavItem>
            <NavItem style={{paddingTop: 6, paddingBottom: 6, paddingLeft: 12, paddingRight: 12}}>
              <NavLink href={`/profiles/${this.props.user.address}`}>Profile</NavLink>
            </NavItem>
            <NavItem style={{paddingTop: 6, paddingBottom: 6, paddingLeft: 12, paddingRight: 12}}>
              <NavLink onClick={this.props.logoutUser}>Logout</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>)
    return (
      <div>
        {nav}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (credentials) => dispatch(loginUser(credentials)),
    logoutUser: () => dispatch(logoutUser()),
    goHome: () => dispatch(push('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
 // style={{marginLeft: 20}}

// const Header = (props) =>
//   <header style={{
//     display: 'flex',
//     justifyContent: 'space-between',
//     flexDirection: 'horizontal',
//     height: 60,
//     backgroundColor: '#667780',
//     alignItems: 'center'
//   }}>
//     <h1 style={{marginLeft: 30}}>NEMO</h1>
//     {/* <h3 style={{marginRight: 30}}>Login</h3> */}
//   </header>
