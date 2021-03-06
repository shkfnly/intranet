import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AllProfiles from './AllProfiles'
import ProfileHandler from './ProfileHandler'

const Profiles = () =>
  <Switch>
    <Route exact path={'/profiles'} component={AllProfiles} />
    <Route path={'/profiles/:profileID'} component={ProfileHandler} />
  </Switch>

export default Profiles
