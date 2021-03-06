import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';

const PeopleListScreen = ({ history }) => {
  const [peopleList, setPeopleList] = useState([]);

  const listPeople = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/persons`,
        config
      );

      setPeopleList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listPeople();
  }, []);

  const createPeopleHandler = () => {
    history.push(`/people/createpeople`);
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h3>People</h3>
        </Col>
        <Col className='text-right'>
          <LinkContainer to={`/people/createpeople`}>
            <Button className='my-3' onClick={createPeopleHandler}>
              <i className='fas fa-plus'></i> Add Person
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      <>
        <Table striped bordered hover dataponsive className='table-sm'>
          <thead>
            <tr>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>JOB TITLE</th>
              <th>GROUP</th>
              <th>DATE ADDED</th>
              <th>DATE UPDATED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {peopleList ? (
              Object.values(peopleList).map((person) => (
                <tr key={person.id}>
                  <td>{person.firstName}</td>
                  <td>{person.lastName}</td>
                  <td>{person.jobTitle}</td>
                  <td>{person.groupName}</td>
                  <td>
                    <Moment>{person.createdAt}</Moment>
                  </td>
                  <td>
                    <Moment>{person.updatedAt}</Moment>
                  </td>
                  <td>
                    <LinkContainer to={`/people/${person.id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        Edit
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </tbody>
        </Table>
      </>
    </>
  );
};

export default PeopleListScreen;
