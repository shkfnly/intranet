import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Header from '../components/shared/Header'
import { Card, CardImg, CardTitle, CardSubtitle, CardBlock } from 'reactstrap'
import { fetchProfiles, selectProfile } from '../actions/profileActions'

class AllProfiles extends React.Component {
  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentWillMount () {
    this.props.fetchProfiles()
  }
  handleClick (profile) {
    this.props.selectProfile(profile)
    this.props.navigateToProfile(profile.address)
  }
  render () {
    const profiles = this.props.profiles.map((v, i) => (
      <div key={i} onClick={() => this.handleClick(v)}>
        <Card style={{width: 200}}>
          <CardImg top width='100%' src='https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180' alt='Card image cap' />
          <CardBlock>
            <CardTitle>{v.name}</CardTitle>
            <CardSubtitle>{`${v.address.slice(0, 20)}...`}</CardSubtitle>
            {/* <CardText></CardText>
            <Button>Button</Button> */}
          </CardBlock>
        </Card>
      </div>
    ))
    return (
      <div>
        <Header />
        <div style={{marginTop: 20, marginLeft: 20, marginRight: 20}}>
          {profiles}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllProfiles)
