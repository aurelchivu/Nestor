import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

const PeopleCreateScreen = ({ history }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [groupName, setGroupName] = useState('');

  const createPeople = async (firstName, lastName, jobTitle, groupName) => {
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
          groupName,
        },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createPeople(firstName, lastName, jobTitle, groupName);
    setFirstName('');
    setLastName('');
    setJobTitle('');
    setGroupName('');
  };

  return (
    <>
      <Link to='/people' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h3>Create Person</h3>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='first name'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter first name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='last name'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter last name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='job title'>
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter job title'
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='Belongs to'>
            <Form.Label>Group</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter group'
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
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
