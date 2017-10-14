import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AllProfiles from './AllProfiles'
import NodeProfile from './NodeProfile'

const Profiles = () =>
  <Switch>
    <Route exact path={'/profiles'} component={AllProfiles} />
    <Route path={'/profiles/:profileID'} component={NodeProfile} />
  </Switch>

export default Profiles
