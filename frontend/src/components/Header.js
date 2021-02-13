import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Nav className='mr-auto'>
            <LinkContainer to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/groups'>
              <Nav.Link>Groups</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/people'>
              <Nav.Link>People</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className='ml-auto'>
            <LinkContainer to='/login'>
              <Nav.Link>LogIn</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/register'>
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
