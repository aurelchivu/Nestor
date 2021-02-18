import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';

const PeopleByGroupScreen = ({ match }) => {
  const groupName = match.params.name;

  const [peopleList, setPeopleList] = useState([]);

  const listPeopleByGroup = async (groupName) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/persons/`,
        { groupName },
        config
      );

      setPeopleList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listPeopleByGroup();
  }, []);

  const people =
    peopleList.filter((p) => p.groupName === match.params.name) || [];

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h3>{groupName}</h3>
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
            {people ? (
              people.map((person) => (
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

export default PeopleByGroupScreen;
