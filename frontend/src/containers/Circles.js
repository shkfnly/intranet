import React from 'react'
import Header from '../components/shared/Header'
import { fetchProfiles } from '../actions/profileActions'
import { connect } from 'react-redux'
import * as _ from 'lodash'
import { d3Draw, d3Update } from '../utilities/d3Circles'

const dataParser = (profiles) => {
  let data = {name: 'consensys',
    children: []
  }
  profiles.map((v, i) => {
    if (typeof v.roles !== 'undefined') {
      v.roles.forEach((role) => {
        let index = _.findIndex(data.children, (v) => v.name === role)
        index > 0
        ? data.children[index].children.push({'name': v.name, 'size': 10})
        : data.children.push({'name': role, children: [{'name': v.name, 'size': 10}]})
      })
    }
    if (typeof v.projects !== 'undefined') {
      v.projects.forEach((proj) => {
        let index = _.findIndex(data.children, (v) => v.name === proj)
        index > 0
        ? data.children[index].children.push({'name': v.name, 'size': 10})
        : data.children.push({'name': proj, children: [{'name': v.name, 'size': 10}]})
      })
    }
    if (typeof v.teams !== 'undefined') {
      v.teams.forEach((team) => {
        let index = _.findIndex(data.children, (v) => v.name === team)
        index > 0
        ? data.children[index].children.push({'name': v.name, 'size': 10})
        : data.children.push({'name': team, children: [{'name': v.name, 'size': 10}]})
      })
    }
  })
  return data
}

class Circles extends React.Component {
  // shouldComponentUpdate () { return false }
  // componentWillMount () {
  //
  // }
  componentDidMount () {
    this.props.fetchProfiles()
    const data = dataParser(this.props.profiles)
    d3Draw(data)
  }
  componentWillReceiveProps (props) {
    const data = dataParser(props.profiles)
    d3Update(data)
  }

  render () {
    return (
      <div>
        <Header />
        <div style={{width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
          <svg width={700} height={700} style={{display: 'flex', alignSelf: 'center'}} />
        </div>
      </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    profiles: state.profiles.profiles
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProfiles: () => dispatch(fetchProfiles())
    // selectProfile: (profile) => dispatch(selectProfile(profile)),
    // navigateToProfile: (address) => dispatch(push(`/profiles/${address}`))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Circles)
