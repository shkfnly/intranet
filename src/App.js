import React, { Component } from 'react'
import Main from './containers/Main'
// import logo from './logo.svg';
import './App.css'

class App extends Component {
  render () {
    return (
      <div style={{backgroundColor: '#FCFCFC'}}>
        <header style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'horizontal', height: 60, backgroundColor: '#667780', alignItems: 'center'}}>
          <h1 style={{marginLeft: 30}}>NEMO</h1>
          {/* <h3 style={{marginRight: 30}}>Login</h3> */}
        </header>
        <Main />
      </div>
    )
  }
}

export default App
