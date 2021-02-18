import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

const PeopleEditScreen = ({ match, history }) => {
  const personId = match.params.id;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [groupName, setGroupName] = useState('');

  const getPeopleDetails = async (id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/persons/${id}`,
        config
      );
      setFirstName(data.data.firstName);
      setLastName(data.data.lastName);
      setJobTitle(data.data.jobTitle);
      setGroupName(data.data.groupName);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePeople = async (firstName, lastName, jobTitle, groupName, id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios.put(
        `http://localhost:5000/api/persons/${id}`,
        { firstName, lastName, jobTitle, groupName },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPeopleDetails(personId);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    updatePeople(firstName, lastName, jobTitle, groupName, personId);
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
        <h3>Edit Person</h3>
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

          <Form.Group controlId='Group'>
            <Form.Label>Group</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter group'
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          
          <Button type='submit' variant='primary'>
            Update Person
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PeopleEditScreen;
