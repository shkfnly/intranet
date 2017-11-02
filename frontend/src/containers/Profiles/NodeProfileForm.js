import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveProfile } from '../../actions/profileActions'
import { Badge, Container, Row, Col, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupButton, ListGroupItem, ListGroup } from 'reactstrap'
import ProfileMainQuestion from '../../components/ProfileMainQuestion'
// import { isEqual } from 'lodash'

class NodeProfileForm extends Component {
  constructor (props) {
    super()
    this.state = {
      edited: false,
      user: {
        name: props.profile.name,
        age: props.profile.age,
        location: props.profile.location,
        slack: props.profile.slack,
        roles: props.profile.roles || [],
        teams: props.profile.teams || [],
        projects: props.profile.projects || [],
        story: props.profile.story || [],
        purpose: props.profile.purpose || [],
        skills: props.profile.skills || [],
        accountability: props.profile.accountability || [],
        needs: props.profile.needs || [],
        goals: props.profile.goals || []
      }
    }
    this.onChange = this.onChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  // componentWillUnmount () {
  //   this.setState({user: {}})
  // }
  componentWillReceiveProps (props) {
    console.log(props.profile)
    this.setState({
      user: {
        avatar: props.profile.avatar,
        name: props.profile.name,
        age: props.profile.age,
        location: props.profile.location,
        slack: props.profile.slack,
        roles: props.profile.roles || [],
        teams: props.profile.teams || [],
        projects: props.profile.projects || [],
        story: props.profile.story || [],
        purpose: props.profile.purpose || [],
        skills: props.profile.skills || [],
        accountability: props.profile.accountability || [],
        needs: props.profile.needs || [],
        goals: props.profile.goals || []
      }
    })
  }
  onChange (type, value) {
    let newUserState = Object.assign({}, this.state.user, {[type]: value})
    this.setState({user: newUserState, edited: true})
      // user[type]: newUserState, edited: true})
  }
  handleAdd (type, value) {
    let temp = this.state.user[type]
    temp.push(value)
    this[type].value = ''
    let newUserState = Object.assign({}, this.state.user, {[type]: temp})
    this.setState({user: newUserState, edited: true})
  }
  handleDelete (type, index) {
    let temp = this.state.user[type]
    temp.splice(index, 1)
    let newUserState = Object.assign({}, this.state.user, {[type]: temp})
    this.setState({user: newUserState, edited: true})
  }
  handleSubmit () {
    console.log('State User', this.state.user)
    console.log('Props Profile', this.props.profile)
    this.props.saveProfile(this.props.user.address, this.state.user)
    this.setState({edited: false})
  }
  render () {
    const {avatar, roles, teams, projects, story, purpose, skills, accountability, needs, goals} = this.state.user
    const rolesList = roles ? roles.map((v, i) => (
      <h5 style={{paddingLeft: 3, paddingRight: 3}} key={i}>
        <Badge color='primary' onClick={(i) => this.handleDelete('roles', i)}>
          {v}
        </Badge>
      </h5>
    )) : null
    const teamsList = teams ? teams.map((v, i) => (
      <h5 style={{paddingLeft: 3, paddingRight: 3}} key={i}>
        <Badge color='primary' onClick={(i) => this.handleDelete('teams', i)}>
          {v}
        </Badge>
      </h5>
    )) : null
    const projectsList = projects ? projects.map((v, i) => (
      <h5 style={{paddingLeft: 3, paddingRight: 3}} key={i}>
        <Badge color='primary' onClick={(i) => this.handleDelete('projects', i)}>
          {v}
        </Badge>
      </h5>
    )) : null
    const storyList = story ? story.map((v, i) => (
      <ListGroupItem key={i}>{v}</ListGroupItem>
    )) : null
    const purposeList = purpose ? purpose.map((v, i) => (
      <ListGroupItem key={i}>{v}</ListGroupItem>
    )) : null
    const skillsList = skills ? skills.map((v, i) => (
      <ListGroupItem key={i}>{v}</ListGroupItem>
    )) : null
    const accountabilityList = accountability ? accountability.map((v, i) => (
      <ListGroupItem key={i}>{v}</ListGroupItem>
    )) : null
    const needsList = needs ? needs.map((v, i) => (
      <ListGroupItem key={i}>{v}</ListGroupItem>
    )) : null
    const goalsList = goals ? goals.map((v, i) => (
      <ListGroupItem key={i}>{v}</ListGroupItem>
    )) : null
    return (
      <Container style={{marginTop: 20}}>
        <Row>
          <img src={avatar ? avatar.uri : 'https://images-na.ssl-images-amazon.com/images/I/61EtpWuRHiL._AC_UL200_SR160,200_.jpg'} style={{minHeight: 200, minWidth: 200, maxHeight: 200, maxWidth: 200}} alt='avatar' />
          <Col>
            <Form style={{paddingLeft: 20, paddingRight: 20}}>
              <FormGroup row>
                <Label for='name'>Name: </Label>
                <Input getRef={(input) => (this.name = input)} id='name' name='name' placeholder='Name' onChange={(e) => this.onChange('name', this.name.value)} value={this.state.user.name || ''} />
              </FormGroup>
              <FormGroup row>
                <Label for='age'>Age: </Label>
                <Input getRef={(input) => (this.age = input)} type='number' id='age' name='age' placeholder='100' onChange={(e) => this.onChange('age', parseInt(this.age.value, 10))} value={this.state.user.age || ''} />
              </FormGroup>
              <FormGroup row>
                <Label for='location'>Location: </Label>
                <Input getRef={(input) => (this.location = input)} id='location' name='location' placeholder='Location' onChange={(e) => this.onChange('location', this.location.value)} value={this.state.user.location || ''} />
              </FormGroup>
              <FormGroup row>
                <Label for='slack'>Slack: </Label>
                <Input getRef={(input) => (this.slack = input)} id='slack' name='slack' placeholder='@slackhandle' onChange={(e) => this.onChange('slack', this.slack.value)} value={this.state.user.slack || ''} />
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row style={{marginTop: 30}}>
          <Col>
            <FormGroup>
              <h4>Roles:</h4>
              <div style={{display: 'flex'}}>{rolesList}</div>
              <InputGroup>
                <Input getRef={(input) => (this.roles = input)} />
                <InputGroupButton style={{fontWeight: 'bold'}} onClick={() => this.handleAdd('roles', this.roles.value)}>+</InputGroupButton>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <h4>Teams:</h4>
              <div style={{display: 'flex'}}>{teamsList}</div>
              <InputGroup>
                <Input getRef={(input) => (this.teams = input)} />
                <InputGroupButton style={{fontWeight: 'bold'}} onClick={() => this.handleAdd('teams', this.teams.value)}>+</InputGroupButton>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <h4>Projects:</h4>
              <div style={{display: 'flex'}}>{projectsList}</div>
              <InputGroup>
                <Input getRef={(input) => (this.projects = input)} />
                <InputGroupButton style={{fontWeight: 'bold'}} onClick={() => this.handleAdd('projects', this.projects.value)}>+</InputGroupButton>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        {/* Profile Row */}
        <Row>
          <Col>
            <ProfileMainQuestion title={'Story'} question={'Where have you been?'}>
              <ListGroup>
                {storyList}
              </ListGroup>
              <InputGroup>
                <Input getRef={(input) => (this.story = input)} type='textarea' name='story' id='story' />
                <InputGroupButton style={{fontWeight: 'bold'}} onClick={() => this.handleAdd('story', this.story.value)}>+</InputGroupButton>
              </InputGroup>
            </ProfileMainQuestion>
          </Col>
          <Col>
            <ProfileMainQuestion title={'Purpose'} question={'What do you love?'}>
              <ListGroup>
                {purposeList}
              </ListGroup>
              <InputGroup>
                <Input getRef={(input) => (this.purpose = input)} type='textarea' name='purpose' id='purpose' />
                <InputGroupButton style={{fontWeight: 'bold'}} onClick={() => this.handleAdd('purpose', this.purpose.value)}>+</InputGroupButton>
              </InputGroup>
            </ProfileMainQuestion>
          </Col>
          <Col xs={4}>
            <ProfileMainQuestion title={'Skills'} question={'What gifts do you bring?'}>
              <ListGroup>
                {skillsList}
              </ListGroup>
              <InputGroup>
                <Input getRef={(input) => (this.skills = input)} type='textarea' name='skills' id='skills' />
                <InputGroupButton style={{fontWeight: 'bold'}} onClick={() => this.handleAdd('skills', this.skills.value)}>+</InputGroupButton>
              </InputGroup>
            </ProfileMainQuestion>
          </Col>
        </Row>
        {/* Profile Row */}
        <Row style={{marginBottom: 20, marginTop: 20}}>
          <Col>
            <ProfileMainQuestion title={'Accountability'} question={'Expectations'}>
              <ListGroup>
                {accountabilityList}
              </ListGroup>
              <InputGroup>
                <Input getRef={(input) => (this.accountability = input)} type='textarea' name='accountability' id='accountability' />
                <InputGroupButton style={{fontWeight: 'bold'}} onClick={() => this.handleAdd('accountability', this.accountability.value)}>+</InputGroupButton>
              </InputGroup>
            </ProfileMainQuestion>
          </Col>
          <Col>
            <ProfileMainQuestion title={'Needs'} question={'To meet expectations'}>
              <ListGroup>
                {needsList}
              </ListGroup>
              <InputGroup>
                <Input getRef={(input) => (this.needs = input)} type='textarea' name='needs' id='needs' />
                <InputGroupButton style={{fontWeight: 'bold'}} onClick={() => this.handleAdd('needs', this.needs.value)}>+</InputGroupButton>
              </InputGroup>
            </ProfileMainQuestion>
          </Col>
          <Col>
            <ProfileMainQuestion title={'Growth Goals'} question={'Hopes for the future'}>
              <ListGroup>
                {goalsList}
              </ListGroup>
              <InputGroup>
                <Input getRef={(input) => (this.goals = input)} type='textarea' name='goals' id='goals' />
                <InputGroupButton style={{fontWeight: 'bold'}} onClick={() => this.handleAdd('goals', this.goals.value)}>+</InputGroupButton>
              </InputGroup>
            </ProfileMainQuestion>
          </Col>
        </Row>
        <Row style={{marginBottom: 100, marginTop: 20}}>
          <Button color='danger' onClick={() => this.props.editHandler(false)}>Cancel</Button>
          <Button disabled={this.state.edited === false} style={{marginLeft: 15}} color='primary' onClick={this.handleSubmit}>Save Profile</Button>
        </Row>
      </Container>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveProfile: (address, profile) => dispatch(saveProfile(address, profile))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NodeProfileForm)
