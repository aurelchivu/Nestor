import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';

const GroupsListScreen = ({ history }) => {

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
    } catch (error) {
      console.log(error);
    }
  };

  const deleteGroup = async (id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios.delete(
        `http://localhost:5000/api/groups/${id}`,
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listGroups();
  }, []);

  const createGroupHandler = () => {
    history.push(`/groups/creategroup`);
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      deleteGroup(id);

    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h3>Groups</h3>
        </Col>
        <Col className='text-right'>
          <LinkContainer to={`/groups/creategroup`}>
            <Button className='my-3' onClick={createGroupHandler}>
              <i className='fas fa-plus'></i> Create Group
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      <>
        <Table striped bordered hover dataponsive className='table-sm'>
          <thead>
            <tr>
              <th>NAME</th>
              <th>DATE CREATED</th>
              <th>DATE UPDATED</th>
              <th>BELONGS TO</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {groupsList ? (
              Object.values(groupsList).map((group) => (
                
                <tr key={group.id}>
                  <td>{group.name}</td>
                  <td>{group.createdAt}</td>
                  <td>{group.updatedAt}</td>
                  <td>{group.reportsTo === null ? 'None' : group.reportsTo}</td>
                  <td>
                    <LinkContainer to={`/groups/${group.id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        Edit
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(group.id)}
                    >
                      Delete
                    </Button>
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

export default GroupsListScreen;

// reload list after a group is deleted???
// link groups to person list

