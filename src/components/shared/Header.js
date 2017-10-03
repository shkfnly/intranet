import React from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

export default class Example extends React.Component {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }
  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render () {
    return (
      <div>
        <Navbar color='faded' light toggleable>
          <NavbarBrand href='/'>NEMO</NavbarBrand>
          {/* <NavbarToggler onClick={this.toggle} /> */}
          {/* <Collapse isOpen={this.state.isOpen} navbar> */}
            <Nav navbar style={{flexDirection: 'row'}}>
              <NavItem style={{paddingTop: 6, paddingBottom: 6, paddingLeft: 12, paddingRight: 12}}>
                <NavLink href='/profiles'>Profiles</NavLink>
              </NavItem>
              <NavItem style={{paddingTop: 6, paddingBottom: 6, paddingLeft: 12, paddingRight: 12}}>
                <NavLink href='/home'>Home</NavLink>
              </NavItem>
            </Nav>
          {/* </Collapse> */}
        </Navbar>
      </div>
    )
  }
}
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
