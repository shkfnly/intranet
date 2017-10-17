import React from 'react'
import NodeProfile from './NodeProfile'
import NodeProfileForm from './NodeProfileForm'
import Header from '../../components/shared/Header'
import { connect } from 'react-redux'
import { fetchProfile } from '../../actions/profileActions'

class ProfileHandler extends React.Component {
  constructor () {
    super()
    this.state = {
      editing: false
    }
    this.editHandler = this.editHandler.bind(this)
  }

  editHandler (status) {
    this.setState({
      editing: status
    })
  }
  // componentWillMount () {
  //   this.props.fetchProfile(this.props.match.params.profileID)
  // }
  componentDidMount () {
    this.props.fetchProfile(this.props.match.params.profileID)
  }

  render () {
    const profile = this.state.editing
              ? <NodeProfileForm profile={this.props.profile} editHandler={this.editHandler} />
              : <NodeProfile profile={this.props.profile} user={this.props.user} editHandler={this.editHandler} profileID={this.props.match.params.profileID} />
    return (
      <div>
        <Header />
        {profile}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    profile: state.profiles.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProfile: (address) => dispatch(fetchProfile(address))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileHandler)
