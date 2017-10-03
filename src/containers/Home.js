import React from 'react'
import { Connect, SimpleSigner } from 'uport-connect'
const nemoUportID = '2odDf3tfWkap1kPqAHYm7ow2B1m2SisVK5M' // clientId from app manager
const nemoPK = {
  privateKey: '93f02803e9de795913463b64285da23629892995e19691fe544ae4680c0ac671' // private key from app manager
}
const uport = new Connect('nemo', {
  clientId: nemoUportID,
  signer: SimpleSigner(nemoPK)
})
class Home extends React.Component {
  constructor () {
    super()
    this.getUport = this.getUport.bind(this)
  }
  getUport () {
    uport.requestCredentials().then((credentials) => {
      console.log(credentials)
    })
  }
  render () {
    return (
      <div>
        <div style={{flex: 1, justifyContent: 'space-between', flexDirection: 'horizontal', height: 60, backgroundColor: '#667780'}}>
          <h2 style={{width: 60}}>NEMO</h2>
          <h3 style={{width: 60}}>Login</h3>
        </div>
        <div onClick={this.getUport}>
          Click Me
        </div>
        <div>
          Search Bar
        </div>
        <div style={{flex: 1, 'flex-direction': 'horizontal'}}>
          <div style={{width: 120}}>People</div>
          <div style={{width: 120}}>Circles</div>
          <div style={{width: 120}}>Spokes</div>
          <div style={{width: 120}}>Projects</div>
        </div>
      </div>
    )
  }

}

export default Home
