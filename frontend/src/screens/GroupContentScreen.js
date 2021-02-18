import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';

const GroupContentScreen = ({ match }) => {
  const groupId = match.params.id;

  const [groupsList, setGroupsList] = useState([]);

  const listGroups = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/groups`,
        config
      );

      setGroupsList(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listGroups();
  }, []);

  const groups =
    groupsList.filter((g) => g.reportsTo === match.params.id) || [];
  console.log(groups);

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h3>Groups</h3>
        </Col>
        <Link to='/groups' className='btn btn-light my-3'>
          Go Back
        </Link>
      </Row>
      <>
        <Table striped bordered hover dataponsive className='table-sm'>
          <thead>
            <tr>
              <th>NAME</th>
              <th>ID</th>
              <th>REPORTS TO</th>
              <th>DATE ADDED</th>
              <th>DATE UPDATED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {groupsList ? (
              groups.map((group) => (
                <tr key={group.id}>
                  <LinkContainer to={`/groups/${group.name}/people`}>
                    <td>{group.name}</td>
                  </LinkContainer>
                  <td>{group.id}</td>
                  <td>{group.reportsTo}</td>
                  <td>
                    <Moment>{group.createdAt}</Moment>
                  </td>
                  <td>
                    <Moment>{group.updatedAt}</Moment>
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

export default GroupContentScreen;
