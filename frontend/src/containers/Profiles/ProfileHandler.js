import React from 'react'
import NodeProfile from './NodeProfile'
import NodeProfileForm from './NodeProfileForm'
import Header from '../../components/shared/Header'

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

  render () {
    return (
      <div>
        <Header />
        {this.state.editing
          ? <NodeProfileForm editHandler={this.editHandler} />
          : <NodeProfile editHandler={this.editHandler} profileID={this.props.match.params.profileID} />
        }
      </div>
    )
  }
}

export default ProfileHandler
