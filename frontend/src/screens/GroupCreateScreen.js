import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

const GroupCreateScreen = () => {
  const [name, setName] = useState('');
  const [reportsTo, setReportsTo] = useState();

  const createGroup = async (name, reportsTo) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios.post(
        `http://localhost:5000/api/groups`,
        {
          name,
          reportsTo,
        },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createGroup(name, reportsTo);
    setName('');
    setReportsTo(1);
  };

  return (
    <>
      <Link to='/groups' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h3>Create New Group</h3>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='Belongs to'>
            <Form.Label>Belongs to</Form.Label>
            <Form.Control
              type='Belongs to'
              placeholder='Belongs To'
              value={reportsTo}
              onChange={(e) => setReportsTo(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Create Group
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default GroupCreateScreen;

// Redirect back to groups after create new group?
