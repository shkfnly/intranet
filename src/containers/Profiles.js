import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AllProfiles from './AllProfiles'
import NodeProfile from './NodeProfile'

const Profiles = () =>
  <Switch>
    <Route exact route={'/profiles'} component={AllProfiles} />
    <Route route={'/profiles/:profileId'} component={NodeProfile} />
  </Switch>

export default Profiles
