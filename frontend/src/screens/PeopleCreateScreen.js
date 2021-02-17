import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

const PeopleCreateScreen = ({ history }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [belongsTo, setBelongsTo] = useState('');

  const createPeople = async (firstName, lastName, jobTitle, belongsTo) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios.post(
        `http://localhost:5000/api/persons`,
        {
          firstName,
          lastName,
          jobTitle,
          belongsTo,
        },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createPeople(firstName, lastName, jobTitle, belongsTo);
    setFirstName('');
    setLastName('');
    setJobTitle('');
    setBelongsTo('');
    history.push(`/people`);
  };

  return (
    <>
      <Link to='/people' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h3>Create Person</h3>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='name'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={firstName}
              onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='name'>
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={firstName}
              onChange={(e) => setJobTitle(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='Belongs to'>
            <Form.Label>Belongs To</Form.Label>
            <Form.Control
              type='Belongs to'
              placeholder='Belongs to'
              value={belongsTo}
              onChange={(e) => setBelongsTo(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Create Person
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PeopleCreateScreen;

// Redirect back to groups after create new group?
