import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Badge, Container, Row, Col, ListGroupItem, ListGroup } from 'reactstrap'
import ProfileMainQuestion from '../components/ProfileMainQuestion'
import Header from '../components/shared/Header'
import { fetchProfile } from '../actions/profileActions'
import { isEmpty } from 'lodash'

class NodeProfile extends Component {
  componentWillMount () {
    isEmpty(this.props.profile)
      ? this.props.fetchProfile(this.props.match.params.profileID)
      : null
  }
  render () {
    const profile = this.props.profile
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
        <Header />
        <Container style={{marginTop: 20}}>
          <Row>
            <div style={{height: 250, width: 250, backgroundColor: 'blue'}} />
            <Col>
              <div style={{paddingLeft: 20, paddingRight: 20}}>
                <div>
                  <h3>Name: </h3>
                  <text>{profile.name}</text>
                </div>
                <div>
                  <h3>Age: </h3>
                  <text>{profile.age}</text>
                </div>
                <div>
                  <h3>Location: </h3>
                  <text>{profile.location}</text>
                </div>
                <div>
                  <h3>Slack Handle: </h3>
                  <text>{profile.slackhandle}</text>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <h4>Roles:</h4>
                <div style={{display: 'flex'}}>{roles}</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <h4>Teams:</h4>
                <div style={{display: 'flex'}}>{teams}</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <h4>Projects:</h4>
                <div style={{display: 'flex'}}>{projects}</div>
              </div>
            </Col>
          </Row>
          {/* Profile Row */}
          <Row>
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
export default connect(mapStateToProps, mapDispatchToProps)(NodeProfile)
