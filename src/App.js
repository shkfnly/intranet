import React, { Component } from 'react'
import Main from './containers/Main'
// import logo from './logo.svg';
import './App.css'

class App extends Component {
  render () {
    return (
      <div style={{backgroundColor: '#FCFCFC'}}>
        <header style={{height: 60, alignItems: 'center', display: 'flex'}}>
          <h2 style={{marginLeft: 15}}>
            Node Profiles
          </h2>
        </header>
        <Main />
      </div>
    )
  }
}

export default App
