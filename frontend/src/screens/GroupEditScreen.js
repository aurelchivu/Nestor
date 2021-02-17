import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

const GroupEditScreen = ({ match }) => {
  const groupId = match.params.id;

  const [name, setName] = useState('');
  const [reportsTo, setReportsTo] = useState();

  const getGroupDetails = async (id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/groups/${id}`,
        config
      );

      setName(data.data.name);
      setReportsTo(data.data.reportsTo);
    } catch (error) {
      console.log(error);
    }
  };

  const updateGroup = async (name, reportsTo, id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios.put(
        `http://localhost:5000/api/groups/${id}`,
        { name, reportsTo },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroupDetails(groupId);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    updateGroup(name, reportsTo, groupId);
  };

  return (
    <>
      <Link to='/groups' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h3>Edit Group</h3>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter new name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='Reports to'>
            <Form.Label>Reports to - Group ID</Form.Label>
            <Form.Control
              type='name'
              placeholder='Reports to'
              value={reportsTo}
              onChange={(e) => setReportsTo(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update Group
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default GroupEditScreen;
