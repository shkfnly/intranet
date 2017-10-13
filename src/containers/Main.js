import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Landing from './Landing'
import NodeProfileForm from './NodeProfileForm'
import Profiles from './Profiles'
import MapView from './MapView'
import Circles from './Circles'

const Main = () =>
  <main>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route path='/home' component={Home} />
      <Route path='/profiles' component={Profiles} />
      <Route path='/edit' component={NodeProfileForm} />
      <Route path='/map' component={MapView} />
      <Route path='/circles' component={Circles} />
    </Switch>
  </main>

export default Main
