import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Header from '../../components/shared/Header'
import { Card, CardImg, CardTitle, CardSubtitle, CardBlock } from 'reactstrap'
import { fetchProfiles, selectProfile } from '../../actions/profileActions'

class AllProfiles extends React.Component {
  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount (np) {
    // throttle(this.props.fetchProfiles, 10000, {leading: true, trailing: false})
    this.props.fetchProfiles()
  }
  handleClick (profile) {
    this.props.selectProfile(profile)
    this.props.navigateToProfile(profile.address)
  }
  render () {
    const profiles = this.props.profiles.map((v, i) => (
      <div key={i} onClick={() => this.handleClick(v)} style={{width: 200, paddingLeft: 15, paddingRight: 15}}>
        <Card>
          <div style={{width: 168, height: 168, overflow: 'hidden', textAlign: 'center'}}>
            <CardImg top width='100%' src={v.avatar ? v.avatar.uri : 'https://images-na.ssl-images-amazon.com/images/I/61EtpWuRHiL._AC_UL200_SR160,200_.jpg'} alt='Card image cap' />
          </div>
          <CardBlock>
            <CardTitle>{v.name}</CardTitle>
            <CardSubtitle>{v.roles ? v.roles[0] : null}</CardSubtitle>
            {/* <CardText>{v.name}</CardText> */}
            {/* <Button>Button</Button> */}
          </CardBlock>
        </Card>
      </div>)
    )
    return (
      <div>
        <Header />
        <div style={{marginTop: 20, marginLeft: 20, marginRight: 20, display: 'flex'}}>
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
