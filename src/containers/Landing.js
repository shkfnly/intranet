import React from 'react'
// import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import uport from '../utilities/uport'

import { Button, Jumbotron } from 'reactstrap'

class Landing extends React.Component {
  constructor () {
    super()
    this.getUport = this.getUport.bind(this)
  }
  getUport () {
    uport.requestCredentials().then((credentials) => {
      this.props.login()
      console.log(credentials)
    })
  }
  render () {
    return (
      <div className='container-fluid'>
        <header style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'horizontal', height: 60, backgroundColor: '#667780', alignItems: 'center'}}>
          <h1 style={{marginLeft: 30}}>NEMO</h1>
          {/* <h3 style={{marginRight: 30}}>Login</h3> */}
        </header>
        <Jumbotron>
          <h1 className='display-3'>Welcome to Nemo</h1>
          <p className='lead'>Your ConsenSys Concierge</p>
          <hr className='my-2' />
          <p>You'll need a uport to continue. You can download the mobile app with one of the links below.</p>
          <text>
            <a href='https://itunes.apple.com/us/app/uport-identity-wallet-ethereum/id1123434510?mt=8'>uPort iOS</a>
            <text> | </text>
            <a href='https://play.google.com/store/apps/details?id=com.uportMobile'>uPort Android</a>
          </text>

          <p className='lead' style={{marginTop: 30, alignItems: 'center'}}>
            <Button color='primary' onClick={this.getUport}>
              Connect with uPort
            </Button>
          </p>
        </Jumbotron>
      </div>

      /* <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{alignSelf: 'center', marginTop: 60}} onClick={this.getUport}>
          <text>Click Me</text>
        </div>
        <div>
          Search Bar
        </div>
        <div style={{display: 'flex', 'flexDirection': 'horizontal'}}>
          <Link to={'/profiles'}><div style={{width: 120}}>People</div></Link>
          <div style={{width: 120}}>Circles</div>
          <div style={{width: 120}}>Spokes</div>
          <div style={{width: 120}}>Projects</div>
        </div>
      </div> */
    )
  }

}
const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(push('/edit')),
    profiles: () => dispatch(push('/profiles'))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Landing)
