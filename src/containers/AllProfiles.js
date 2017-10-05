import React from 'react'
import { connect } from 'react-redux'
import Header from '../components/shared/Header'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, CardBlock } from 'reactstrap'
import { fetchProfiles } from '../actions/profileActions'

class AllProfiles extends React.Component {
  componentWillMount () {
    this.props.fetchProfiles()
  }
  render () {
    const profiles = this.props.profiles.map((v, i) => (
      <div key={i}>
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
    fetchProfiles: () => dispatch(fetchProfiles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProfiles)
