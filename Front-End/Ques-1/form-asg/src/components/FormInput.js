import React, { Component } from 'react';
import {
  Container,
  Button,
  Card,
  Form,
  Alert,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import isEmail from 'validator/lib/isEmail';

export default class FormInput extends Component {
  state = {
    Fname: '',
    Lname: '',
    about: '',
    email: '',
    error: '',
    gender: 'Select Gender',
    gender_error: '',
  };

  onChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  onSelect = (e) => {
    const gender = e.split('#')[1];
    this.setState({ ...this.state, gender });
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (!isEmail(this.state.email)) {
      this.setState({ ...this.state, error: 'Invalid Email ' });
      return setTimeout(() => {
        this.setState({ ...this.state, error: '' });
      }, 3000);
    }
    if (this.state.gender === 'Select Gender') {
      this.setState({ ...this.state, gender_error: 'Select Gender ' });
      return setTimeout(() => {
        this.setState({ ...this.state, gender_error: '' });
      }, 3000);
    }

    console.log('Information: ', this.state);
    this.setState({
      Fname: '',
      Lname: '',
      about: '',
      email: '',
      error: '',
      gender: 'Select Gender',
      gender_error: '',
    });
  };
  render() {
    const { error, Fname, Lname, email, about, gender, gender_error } =
      this.state;
    return (
      <Card className='d-flex align-items-center justify-content-center'>
        <Card.Body>
          <Container className='mt-5'>
            <h1>Form Details:</h1>
            <Form onSubmit={this.onSubmit}>
              <Form.Group className='mb-3'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type='text'
                  name='Fname'
                  placeholder='Enter First Name'
                  value={Fname}
                  onChange={this.onChange}
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='text'
                  name='Lname'
                  placeholder='Enter Last Name'
                  value={Lname}
                  onChange={this.onChange}
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type='email'
                  name='email'
                  placeholder='Enter Email'
                  value={email}
                  onChange={this.onChange}
                  required
                />
              </Form.Group>
              {error && <Alert variant='danger'>{error}</Alert>}
              <Form.Group
                controlId='gender'
                className='mt-3 d-flex justify-content-between'
              >
                <Form.Label>Gender</Form.Label>
                <DropdownButton
                  id='gender-select'
                  className='me-3'
                  title={gender}
                >
                  <Dropdown.Item href='#Male' onSelect={this.onSelect}>
                    Male
                  </Dropdown.Item>
                  <Dropdown.Item href='#Female' onSelect={this.onSelect}>
                    Female
                  </Dropdown.Item>
                  <Dropdown.Item href='#Other' onSelect={this.onSelect}>
                    Other
                  </Dropdown.Item>
                </DropdownButton>
              </Form.Group>
              {gender_error && <Alert variant='danger'>{gender_error}</Alert>}

              <Form.Group className='mb-3'>
                <Form.Label>About</Form.Label>
                <Form.Control
                  as='textarea'
                  name='about'
                  placeholder='About'
                  value={about}
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                <Form.Check
                  type='checkbox'
                  label='I Understand and Agree to the Terms And Conditions.'
                  required
                />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}
