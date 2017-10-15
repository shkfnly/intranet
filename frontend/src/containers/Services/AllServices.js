import React from 'react'
import Header from '../../components/shared/Header'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

const styles = {
  circle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
    paddingLeft: 30,
    paddingRight: 30
  },
  circleText: {
    color: 'white'
  }
}
class AllServices extends React.Component {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      dropdownOpen: false
    }
  }
  toggle () {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }
  render () {
    return (
      <div>
        <Header />
        <div style={{display: 'flex', justifyContent: 'space-around', marginTop: 30}}>
          <div style={Object.assign({}, styles.circle, {backgroundColor: 'blue'})} onClick={() => this.props.push('/mpi/orgdev')}>
            <p style={styles.circleText}>Org Dev</p>
          </div>
          <div style={Object.assign({}, styles.circle, {backgroundColor: 'teal'})} onClick={() => this.props.push('/mpi/tokenservices')}>
            <p style={styles.circleText}>Token Services</p>
          </div>
          <div style={Object.assign({}, styles.circle, {backgroundColor: 'gold'})} onClick={() => this.props.push('/mpi/productdesign')}>
            <p style={styles.circleText}>Product Design</p>
          </div>
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    push: (dest) => dispatch(push(dest))
  }
}

export default connect(undefined, mapDispatchToProps)(AllServices)
