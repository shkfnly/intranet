import React, { Component } from 'react'
import UportConnect, { Connect, SimpleSigner } from 'uport-connect'
import NodeProfileForm from './containers/NodeProfileForm'
// import logo from './logo.svg';
import './App.css'

const rpcUrl = 'https://rinkeby.infura.io/dgC6Vl5Qvg79AZi8C39h'
const nemoUport = '2odDf3tfWkap1kPqAHYm7ow2B1m2SisVK5M' // clientId from app manager
const nemoPK = {
  privateKey: '93f02803e9de795913463b64285da23629892995e19691fe544ae4680c0ac671' // private key from app manager
}

const nemoSigner = SimpleSigner(nemoPK)
const uport = new Connect('nemo')

class App extends Component {
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
      <div style={{backgroundColor: '#FCFCFC'}}>
        <header style={{height: 60, alignItems: 'center', display: 'flex'}}>
          <h2 style={{marginLeft: 15}}>
            Node Profiles
          </h2>
        </header>
        {/* <div style={{flex: 1, justifyContent: 'space-between', flexDirection: 'horizontal', height: 60, backgroundColor: '#667780'}}>
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
        </div> */}
        <NodeProfileForm />
      </div>
    )
  }
}

export default App
