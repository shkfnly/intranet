import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Badge, Container, Row, Col, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupButton, ListGroupItem, ListGroup } from 'reactstrap'
import ProfileMainQuestion from '../components/ProfileMainQuestion'
import Header from '../components/shared/Header'

class NodeProfileForm extends Component {
  constructor () {
    super()
    this.state = {
      roles: [],
      teams: [],
      projects: [],
      story: [],
      purpose: [],
      skills: [],
      accountability: [],
      needs: [],
      goals: []
    }
    this.onChange = this.onChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  onChange (type, value) {
    this.setState({[type]: value})
  }
  handleAdd (type, value) {
    let temp = this.state[type]
    temp.push(value)
    this[type].value = ''
    this.setState({[type]: temp})
  }
  handleDelete (type, index) {
    let temp = this.state[type]
    temp.splice(index, 1)
    this.setState({[type]: temp})
  }
  render () {
    const roles = this.state.roles.map((v, i) => (
      <h5 style={{paddingLeft: 3, paddingRight: 3}} key={i}>
        <Badge color='primary' onClick={(i) => this.handleDelete('roles', i)}>
          {v}
        </Badge>
      </h5>
    ))
    const teams = this.state.teams.map((v, i) => (
      <h5 style={{paddingLeft: 3, paddingRight: 3}} key={i}>
        <Badge color='primary' onClick={(i) => this.handleDelete('teams', i)}>
          {v}
        </Badge>
      </h5>
    ))
    const projects = this.state.projects.map((v, i) => (
      <h5 style={{paddingLeft: 3, paddingRight: 3}} key={i}>
        <Badge color='primary' onClick={(i) => this.handleDelete('projects', i)}>
          {v}
        </Badge>
      </h5>
    ))
    const story = this.state.story.map((v, i) => (
      <ListGroupItem key={i}>{v}</ListGroupItem>
    ))
    const purpose = this.state.purpose.map((v, i) => (
      <ListGroupItem key={i}>{v}</ListGroupItem>
    ))
    const skills = this.state.skills.map((v, i) => (
      <ListGroupItem key={i}>{v}</ListGroupItem>
    ))
    const accountability = this.state.accountability.map((v, i) => (
      <ListGroupItem key={i}>{v}</ListGroupItem>
    ))
    const needs = this.state.needs.map((v, i) => (
      <ListGroupItem key={i}>{v}</ListGroupItem>
    ))
    const goals = this.state.goals.map((v, i) => (
      <ListGroupItem key={i}>{v}</ListGroupItem>
    ))
    return (
      <div>
        <Header name={this.props.user.user.address} />
        <Container style={{marginTop: 20}}>
          <Row>
            <div style={{height: 250, width: 250, backgroundColor: 'blue'}} />
            <Col>
              <Form style={{paddingLeft: 20, paddingRight: 20}}>
                <FormGroup row>
                  <Label for='name'>Name: </Label>
                  <Input getRef={(input) => (this.name = input)} id='name' name='name' placeholder='Name' onChange={(e) => this.onChange('name', this.name.value)} />
                </FormGroup>
                <FormGroup row>
                  <Label for='age'>Age: </Label>
                  <Input getRef={(input) => (this.age = input)} type='number' id='age' name='age' placeholder='100' onChange={(e) => this.onChange('age', parseInt(this.age.value, 10))} />
                </FormGroup>
                <FormGroup row>
                  <Label for='location'>Location: </Label>
                  <Input getRef={(input) => (this.location = input)} id='location' name='location' placeholder='Location' onChange={(e) => this.onChange('location', this.location.value)} />
                </FormGroup>
                <FormGroup row>
                  <Label for='slack'>Slack: </Label>
                  <Input getRef={(input) => (this.slack = input)} id='slack' name='slack' placeholder='@slackhandle' onChange={(e) => this.onChange('slack', this.slack.value)} />
                </FormGroup>
              </Form>
              {/* < */}
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <h4>Roles:</h4>
                <div style={{display: 'flex'}}>{roles}</div>
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
                <div style={{display: 'flex'}}>{teams}</div>
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
                <div style={{display: 'flex'}}>{projects}</div>
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
                  {story}
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
                  {purpose}
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
                  {skills}
                </ListGroup>
                <InputGroup>
                  <Input getRef={(input) => (this.skills = input)} type='textarea' name='skills' id='skills' />
                  <InputGroupButton style={{fontWeight: 'bold'}} onClick={() => this.handleAdd('skills', this.skills.value)}>+</InputGroupButton>
                </InputGroup>
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
                <InputGroup>
                  <Input getRef={(input) => (this.accountability = input)} type='textarea' name='accountability' id='accountability' />
                  <InputGroupButton style={{fontWeight: 'bold'}} onClick={() => this.handleAdd('accountability', this.accountability.value)}>+</InputGroupButton>
                </InputGroup>
              </ProfileMainQuestion>
            </Col>
            <Col>
              <ProfileMainQuestion title={'Needs'} question={'To meet expectations'}>
                <ListGroup>
                  {needs}
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
                  {goals}
                </ListGroup>
                <InputGroup>
                  <Input getRef={(input) => (this.goals = input)} type='textarea' name='goals' id='goals' />
                  <InputGroupButton style={{fontWeight: 'bold'}} onClick={() => this.handleAdd('goals', this.goals.value)}>+</InputGroupButton>
                </InputGroup>
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
    user: state.user
  }
}
export default connect(mapStateToProps, {})(NodeProfileForm)
