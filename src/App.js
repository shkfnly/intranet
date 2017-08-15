import React, { Component } from 'react'
import UportConnect, { Connect, SimpleSigner } from 'uport-connect'
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
      <div style={{backgroundColor: 'white'}}>
        <div>
          <h2>Welcome to NEMO</h2>
        </div>
        <div onClick={this.getUport}>
          Click Me
        </div>
      </div>
    )
  }
}

export default App
