import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';

const GroupContentScreen = ({ history, match }) => {
  const groupId = match.params.id;

  const [name, setName] = useState('');
  const [reportsTo, setReportsTo] = useState();
  const [groupsList, setGroupsList] = useState([]);
  const [group, setGroup] = useState({});

  const getGroupById = async (id) => {
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
      setGroup(data.data);
    } catch (error) {
      console.log(error);
    }
  };

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroupById(match.params.id);
    listGroups();
  }, []);

  let groups = groupsList.filter((g) => g.reportsTo == match.params.id);
  groups = [group, ...groups];

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h3>{name}</h3>
        </Col>
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
            {groups.map((group) => (
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
                <td>
                  <LinkContainer to={`/groups/${group.id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      Edit
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button onClick={() => history.goBack()} className='btn btn-light my-3'>
          Go Back
        </Button>
      </>
    </>
  );
};

export default GroupContentScreen;
