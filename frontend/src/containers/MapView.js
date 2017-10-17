import React from 'react'
import { connect } from 'react-redux'
import mapboxgl from 'mapbox-gl'
import Header from '../components/shared/Header'
import { fetchProfiles } from '../actions/profileActions'
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
    // FOR GEOJSON OFFICE POINTS
    // let featureSet = {
    //   'type': 'FeatureCollection',
    //   'features': []
    // }
    map.on('load', () => {
      map.addSource('people', {type: 'geojson', data: {type: 'FeatureCollection', features: []}, cluster: true})
      map.addSource('offices', {type: 'geojson', data: {type: 'FeatureCollection', features: []}, cluster: true})
      this.state.offices.map((location) => {
        client.geocodeForward(location, (err, data, res) => {
          if (err) { console.error(err) }
          let el = document.createElement('div')
          el.className = 'mapboxgl-marker-office'
          new mapboxgl.Marker(el)
          .setLngLat(data.features[0].geometry.coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 10 }) // add popups
          .setHTML('<h3>Office</h3><p>' + location + '</p>'))
          .addTo(map)
          // FOR GEOJSON OFFICE POINTS
          // featureSet.features.push(data.features[0])
          // map.getSource('offices').setData(featureSet)
        })
      })
      map.on('mouseenter', 'people-unclustered-point', function (e) {
        map.getCanvas().style.cursor = 'pointer'
      })
      map.on('mouseleave', 'people-unclustered-point', function (e) {
        map.getCanvas().style.cursor = ''
      })

    // FOR GEOJSON OFFICE POINTS
      // map.addLayer({
      //   id: 'clusters',
      //   type: 'circle',
      //   source: 'offices',
      //   filter: ['has', 'point_count'],
      //   paint: {
      //     'circle-color': {
      //       property: 'point_count',
      //       type: 'interval',
      //       stops: [
      //         [0, '#51bbd6'],
      //         [100, '#f1f075'],
      //         [750, '#f28cb1']
      //       ]
      //     },
      //     'circle-radius': {
      //       property: 'point_count',
      //       type: 'interval',
      //       stops: [
      //           [0, 20],
      //           [100, 30],
      //           [750, 40]
      //       ]
      //     }
      //   }
      // })
      //
      // map.addLayer({
      //   id: 'cluster-count',
      //   type: 'symbol',
      //   source: 'offices',
      //   filter: ['has', 'point_count'],
      //   layout: {
      //     'text-field': '{point_count_abbreviated}',
      //     'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      //     'text-size': 12
      //   }
      // })
      //
      // map.addLayer({
      //   id: 'unclustered-point',
      //   type: 'circle',
      //   source: 'offices',
      //   filter: ['!has', 'point_count'],
      //   paint: {
      //     'circle-color': '#11b4da',
      //     'circle-radius': 4,
      //     'circle-stroke-width': 1,
      //     'circle-stroke-color': '#fff'
      //   }
      // })
    })

    this.setState({map: map})
  }
  componentWillUnmount () {
    this.state.map.remove()
  }
  componentWillReceiveProps (props) {
    let people = {
      'type': 'FeatureCollection',
      'features': []
    }
    this.props.profiles.map((v, i) => {
      if (v.location) {
        client.geocodeForward(v.location, (err, data, res) => {
          if (err) {
            console.error(err)
          }
          // console.log(data.features[0].geometry.coordinates)
          let feature = {}
          feature = data.features[0]
          feature.properties = Object.assign({}, feature.properties, {...v})
          people.features.push(feature)
        })
      }
    })
    const map = this.state.map
    this.state.map.on('load', () => {
      typeof this.state.map.getSource('people') !== 'undefined' ? this.state.map.getSource('people').setData(people) : null
      // people.features.forEach(function (marker) {
      //   new mapboxgl.Marker()
      //     .setLngLat(marker.geometry.coordinates)
      //     .setPopup(new mapboxgl.Popup({ offset: 10 }) // add popups
          // .setHTML(`
          //   <div style='width: 168px; height: 168px; overflow: hidden; textAlign: 'center';'>
              // <img style='width: 100%;'src=${
              //   marker.properties.avatar
              //   ? marker.properties.avatar.uri
              //   : 'https://images-na.ssl-images-amazon.com/images/I/61EtpWuRHiL._AC_UL200_SR160,200_.jpg'}
              // />
          //   </div>
          //   <h3>
          //     ${marker.properties.name}
          //   </h3>
          //   <p>
          //     ${typeof marker.properties.roles !== 'undefined' ? marker.properties.roles[0] : null}
          //   </p>`))
      //     .addTo(map)
      // })
      map.on('click', 'people-unclustered-point', function (e) {
        map.flyTo({center: e.features[0].geometry.coordinates})
        var feature = e.features[0].properties
        var avatar = feature.avatar ? JSON.parse(feature.avatar).uri : false
        new mapboxgl.Popup()
          .setLngLat(e.features[0].geometry.coordinates)
          .setHTML(`
            <div style='width: 168px; height: 168px; overflow: hidden; textAlign: 'center';'>
              <img style='width: 100%;'src=${
                avatar || 'https://images-na.ssl-images-amazon.com/images/I/61EtpWuRHiL._AC_UL200_SR160,200_.jpg'}
              />
            </div>
            <h3>
              ${feature.name}
            </h3>
            <p>
              ${typeof feature.roles !== 'undefined' ? JSON.parse(feature.roles)[0] : ''}
            </p>`)
          .addTo(map)
      })
      this.state.map.addLayer({
        id: 'people-clusters',
        type: 'circle',
        source: 'people',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': {
            property: 'point_count',
            type: 'interval',
            stops: [
                [0, '#51bbd6'],
                [100, '#f1f075'],
                [750, '#f28cb1']
            ]
          },
          'circle-radius': {
            property: 'point_count',
            type: 'interval',
            stops: [
                [0, 20],
                [100, 30],
                [750, 40]
            ]
          }
        }
      })

      this.state.map.addLayer({
        id: 'people-cluster-count',
        type: 'symbol',
        source: 'people',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      })

      this.state.map.addLayer({
        id: 'people-unclustered-point',
        type: 'circle',
        source: 'people',
        filter: ['!has', 'point_count'],
        paint: {
          'circle-color': 'red',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff'
        }
      })
    })

    // console.log(people.features)
  }
  render () {
    return (
      <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <Header />
        <div id='map' style={{flex: 1}} ref={el => { this.mapContainer = el; return }} />
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView)
