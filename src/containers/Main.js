import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import NodeProfileForm from './NodeProfileForm'
import Profiles from './Profiles'
const Main = () =>
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/profiles' component={Profiles} />
      <Route path='/edit' component={NodeProfileForm} />
    </Switch>
  </main>

export default Main
