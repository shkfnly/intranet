import React from 'react'
import { connect } from 'react-redux'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
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
    this.props.logoutUser()
    this.props.goHome()
  }
  render () {
    const nav = isEmpty(this.props.user)
      ? (<Nav className='ml-auto' navbar style={{flexDirection: 'row'}}>
        <NavItem style={{paddingTop: 6, paddingBottom: 6, paddingLeft: 12, paddingRight: 12}}>
          <NavLink onClick={this.getUport}>Login</NavLink>
        </NavItem>
      </Nav>)
      : (<Nav className='ml-auto' navbar style={{flexDirection: 'row'}}>
        <NavItem style={{paddingTop: 6, paddingBottom: 6, paddingLeft: 12, paddingRight: 12}}>
          <NavLink href='/edit'>Edit</NavLink>
        </NavItem>
        <NavItem style={{paddingTop: 6, paddingBottom: 6, paddingLeft: 12, paddingRight: 12}}>
          <NavLink href='/profiles'>Profiles</NavLink>
        </NavItem>
        <NavItem style={{paddingTop: 6, paddingBottom: 6, paddingLeft: 12, paddingRight: 12}}>
          <NavLink onClick={this.props.logoutUser}>Logout</NavLink>
        </NavItem>
      </Nav>)
    return (
      <div>
        <Navbar color='faded' light toggleable>
          <NavbarBrand href={isEmpty(this.props.user) ? '/' : '/home'}>NEMO</NavbarBrand>
          {/* <NavbarToggler onClick={this.toggle} /> */}
          {/* <Collapse isOpen={this.state.isOpen} navbar> */}
          {nav}
          {/* </Collapse> */}
        </Navbar>
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
