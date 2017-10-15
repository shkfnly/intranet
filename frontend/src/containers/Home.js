import React from 'react'
import { Container } from 'reactstrap'
import Header from '../components/shared/Header'

const Home = () =>
  <div>
    <Header />
    <Container>
      <h1 style={{marginTop: 30}}>Welcome to NEMO</h1>
      <h4><i>The solution to your decentralization problems</i></h4>
      <h3 style={{marginTop: 40}}>Please Note: This is an Experiment</h3>
      <p style={{marginTop: 15}}>This is a barebones version of what may eventually become the scaffolding for our intranet offering.</p>
      <p>There are things missing. This was literally 3 days of coding by one person.</p>
      <p>With that being said if there is something that you would like to see added,</p>
      <p>please feel free to add a github issue <a href='https://github.com/shkfnly/intranet/issues'>here</a></p>
      <p>If you don't know what a github issue is please look <a href='https://guides.github.com/features/issues/'>here</a></p>

      <h4>Thank you for visiting...now go tell your friends to join</h4>
    </Container>

    {/* <Form>
      <FormGroup>
        <Label for='exampleSearch'>Search</Label>
        <Input type='search' name='search' id='exampleSearch' placeholder='search placeholder' />
      </FormGroup>
    </Form> */}
  </div>

export default Home
