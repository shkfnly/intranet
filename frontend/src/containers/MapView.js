import React from 'react'
import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
import mapboxgl from 'mapbox-gl'
import Header from '../components/shared/Header'
import { fetchProfiles } from '../actions/profileActions'
import * as _ from 'lodash'
// selectProfile
import MapboxClient from 'mapbox/lib/services/geocoding'
const client = new MapboxClient('pk.eyJ1IjoiY29uc2Vuc3lzIiwiYSI6ImNqOHBmY2w0NjBmcmYyd3F1NHNmOXJwMWgifQ.8-GlTlTTUHLL8bJSnK2xIA')
class MapView extends React.Component {
  constructor () {
    super()
    this.state = {
      map: null,
      offices: ['49 Bogart St, Brooklyn, NY', '1049 Market St, San Francisco, CA 94103', '250 University Avenue, Toronto, ON', '23 Featherstone Street, EC1Y 8SL London, UK', 'Dubai, UAE']
    }
  }
  componentWillMount (np) {
    // throttle(this.props.fetchProfiles, 10000, {leading: true, trailing: false})
    this.props.fetchProfiles()
  }
  componentDidMount () {
    this.props.fetchProfiles()
    mapboxgl.accessToken = 'pk.eyJ1IjoiY29uc2Vuc3lzIiwiYSI6ImNqOHBmY2w0NjBmcmYyd3F1NHNmOXJwMWgifQ.8-GlTlTTUHLL8bJSnK2xIA'
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      // style: 'mapbox://styles/mapbox/streets-v10'
      style: 'mapbox://styles/consensys/cj8ppygty9tga2smvqxtu8vqw'
    })
    map.setCenter([0, 0])
    map.setZoom(1)

    map.addControl(new mapboxgl.NavigationControl())
    this.state.offices.map((location) => {
      client.geocodeForward(location, (err, data, res) => {
        if (err) { console.error(err) }
        let el = document.createElement('div')
        el.className = 'mapboxgl-marker-office'
        new mapboxgl.Marker(el)
        .setLngLat(data.features[0].geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 10 }) // add popups
        .setHTML('<h3>Office</h3><p>' + location + '</p>'))
        .addTo(this.state.map)
      })
    })
    this.setState({map: map})
  }
  componentWillUnmount () {
    this.state.map.remove()
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
        .setPopup(new mapboxgl.Popup({ offset: 10 }) // add popups
        .setHTML('<h3>' + v.name + '</h3><p>' + v.roles[0] + '</p>'))
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
    fetchProfiles: () => dispatch(fetchProfiles())
    // selectProfile: (profile) => dispatch(selectProfile(profile)),
    // navigateToProfile: (address) => dispatch(push(`/profiles/${address}`))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView)
