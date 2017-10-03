import React from 'react'
import { Link } from 'react-router-dom'
import { Connect, SimpleSigner } from 'uport-connect'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { nemoClientID, nemoPK } from '../private'

const uport = new Connect('Nemo', {
  clientId: nemoClientID,
  network: 'rinkeby',
  signer: SimpleSigner(nemoPK)
})
class Home extends React.Component {
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
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{alignSelf: 'center', marginTop: 60}}onClick={this.getUport}>
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
      </div>
    )
  }

}
const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(push('/edit'))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
