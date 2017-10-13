import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import mapboxgl from 'mapbox-gl'
import { Container, Col, Row } from 'reactstrap'
import Header from '../components/shared/Header'
import { fetchProfiles, selectProfile } from '../actions/profileActions'
import MapboxClient from 'mapbox/lib/services/geocoding'
const client = new MapboxClient('pk.eyJ1IjoiY29uc2Vuc3lzIiwiYSI6ImNqOHBmY2w0NjBmcmYyd3F1NHNmOXJwMWgifQ.8-GlTlTTUHLL8bJSnK2xIA')
class MapView extends React.Component {
  constructor () {
    super()
    this.state = {
      map: null
    }
  }
  componentWillMount (np) {
    // throttle(this.props.fetchProfiles, 10000, {leading: true, trailing: false})
    this.props.fetchProfiles()
  }
  componentDidMount () {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY29uc2Vuc3lzIiwiYSI6ImNqOHBmY2w0NjBmcmYyd3F1NHNmOXJwMWgifQ.8-GlTlTTUHLL8bJSnK2xIA'
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9'
    })
    map.addControl(new mapboxgl.NavigationControl())
    this.setState({map: map})
  }
  componentWillReceiveProps (props) {
    this.props.profiles.map((v, i) => (
      client.geocodeForward(v.location, (err, data, res) => {
        if (err) {
          console.error(err)
        }
        // console.log(data.features[0].geometry.coordinates)
        new mapboxgl.Marker()
        .setLngLat(data.features[0].geometry.coordinates)
        .addTo(this.state.map)
      })
    ))
  }
  render () {
    return (
      <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <Header />
        <div id='map' style={{flex: 1}} ref={el => this.mapContainer = el} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profiles: state.profiles.profiles
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProfiles: () => dispatch(fetchProfiles()),
    selectProfile: (profile) => dispatch(selectProfile(profile)),
    navigateToProfile: (address) => dispatch(push(`/profiles/${address}`))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView)
