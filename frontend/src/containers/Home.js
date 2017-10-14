import React from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import Header from '../components/shared/Header'

const Home = () =>
  <div>
    <Header />
    <h1>Home</h1>
    <Form>
      <FormGroup>
        <Label for='exampleSearch'>Search</Label>
        <Input type='search' name='search' id='exampleSearch' placeholder='search placeholder' />
      </FormGroup>
    </Form>
  </div>

export default Home
