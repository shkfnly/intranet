import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Landing from './Landing'
import Profiles from './Profiles/index'
import MapView from './MapView'
import Circles from './Circles'
import Services from './Services/index'

const Main = () =>
  <main>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route path='/home' component={Home} />
      <Route path='/profiles' component={Profiles} />
      <Route path='/map' component={MapView} />
      <Route path='/circles' component={Circles} />
      <Route path='/services' component={Services} />
    </Switch>
  </main>

export default Main
