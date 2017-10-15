import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AllServices from './AllServices'
import Service from './Service'

const Profiles = () =>
  <Switch>
    <Route exact path={'/api'} component={AllServices} />
    <Route path={'/api/:circle'} component={Service} />
  </Switch>

export default Profiles
