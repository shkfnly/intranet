import React from 'react'
import { Badge, Button, Container, Row, Col, ListGroupItem, ListGroup } from 'reactstrap'
import ProfileMainQuestion from '../../components/ProfileMainQuestion'

const NodeProfile = (props) => {
  // componentDidMount () {
  //   if (isEmpty(props.profile)) { props.fetchProfile(props.profileID) }
  // }
  // console.log('Node Profile', props.profile)
  const profile = props.profile
  const roles = profile.roles ? profile.roles.map((v, i) => (
    <h5 style={{paddingLeft: 3, paddingRight: 3}} key={i}>
      <Badge color='primary'>
        {v}
      </Badge>
    </h5>
  )) : null
  const teams = profile.teams ? profile.teams.map((v, i) => (
    <h5 style={{paddingLeft: 3, paddingRight: 3}} key={i}>
      <Badge color='primary'>
        {v}
      </Badge>
    </h5>
  )) : null
  const projects = profile.projects ? profile.projects.map((v, i) => (
    <h5 style={{paddingLeft: 3, paddingRight: 3}} key={i}>
      <Badge color='primary'>
        {v}
      </Badge>
    </h5>
  )) : null
  const story = profile.projects ? profile.story.map((v, i) => (
    <ListGroupItem key={i}>{v}</ListGroupItem>
  )) : null
  const purpose = profile.purpose ? profile.purpose.map((v, i) => (
    <ListGroupItem key={i}>{v}</ListGroupItem>
  )) : null
  const skills = profile.skills ? profile.skills.map((v, i) => (
    <ListGroupItem key={i}>{v}</ListGroupItem>
  )) : null
  const accountability = profile.accountability ? profile.accountability.map((v, i) => (
    <ListGroupItem key={i}>{v}</ListGroupItem>
  )) : null
  const needs = profile.needs ? profile.needs.map((v, i) => (
    <ListGroupItem key={i}>{v}</ListGroupItem>
  )) : null
  const goals = profile.goals ? profile.goals.map((v, i) => (
    <ListGroupItem key={i}>{v}</ListGroupItem>
  )) : null
  return (
    <div>
      <Container style={{marginTop: 20}}>
        <Row>
          <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>

            {props.profileID === props.user.address
              ? <Button color='primary' onClick={() => props.editHandler(true)}>Edit</Button>
              : null
            }
          </div>
        </Row>
        <Row>
          <img src={profile.avatar ? profile.avatar.uri : 'https://images-na.ssl-images-amazon.com/images/I/61EtpWuRHiL._AC_UL200_SR160,200_.jpg'} style={{maxHeight: 500, maxWidth: 400}} alt='Profile' />
          <Col style={{paddingLeft: 20, paddingRight: 20}}>
            <div>
              <h3>Name: </h3>
              <text>{profile.name}</text>
            </div>
            <div style={{marginTop: 20}}>
              <h3>Age: </h3>
              <text>{profile.age}</text>
            </div>
            <div style={{marginTop: 20}}>
              <h3>Location: </h3>
              <text>{profile.location}</text>
            </div>
            <div style={{marginTop: 20}}>
              <h3>Slack Handle: </h3>
              <text>{profile.slackhandle}</text>
            </div>
          </Col>
        </Row>
        <Row style={{marginTop: 20}}>
          <Col>
            <div>
              <h4>Roles:</h4>
              <div style={{display: 'flex'}}>{roles}</div>
            </div>
          </Col>
        </Row>
        <Row style={{marginTop: 20}}>
          <Col>
            <div>
              <h4>Teams:</h4>
              <div style={{display: 'flex'}}>{teams}</div>
            </div>
          </Col>
        </Row>
        <Row style={{marginTop: 20}}>
          <Col>
            <div>
              <h4>Projects:</h4>
              <div style={{display: 'flex'}}>{projects}</div>
            </div>
          </Col>
        </Row>
        {/* Profile Row */}
        <Row style={{marginTop: 20}}>
          <Col>
            <ProfileMainQuestion title={'Story'} question={'Where have you been?'}>
              <ListGroup>
                {story}
              </ListGroup>
            </ProfileMainQuestion>
          </Col>
          <Col>
            <ProfileMainQuestion title={'Purpose'} question={'What do you love?'}>
              <ListGroup>
                {purpose}
              </ListGroup>
            </ProfileMainQuestion>
          </Col>
          <Col xs={4}>
            <ProfileMainQuestion title={'Skills'} question={'What gifts do you bring?'}>
              <ListGroup>
                {skills}
              </ListGroup>
            </ProfileMainQuestion>
          </Col>
        </Row>
        {/* Profile Row */}
        <Row style={{marginBottom: 100, marginTop: 20}}>
          <Col>
            <ProfileMainQuestion title={'Accountability'} question={'Expectations'}>
              <ListGroup>
                {accountability}
              </ListGroup>
            </ProfileMainQuestion>
          </Col>
          <Col>
            <ProfileMainQuestion title={'Needs'} question={'To meet expectations'}>
              <ListGroup>
                {needs}
              </ListGroup>
            </ProfileMainQuestion>
          </Col>
          <Col>
            <ProfileMainQuestion title={'Growth Goals'} question={'Hopes for the future'}>
              <ListGroup>
                {goals}
              </ListGroup>
            </ProfileMainQuestion>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default NodeProfile
// const mapStateToProps = (state) => {
//   return {
//     user: state.user.user,
//     profile: state.profiles.profile
//   }
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchProfile: (address) => dispatch(fetchProfile(address))
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(NodeProfile)
