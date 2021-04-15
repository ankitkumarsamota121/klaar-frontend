import React from 'react';
import { Navbar, Container, Image } from 'react-bootstrap';
import icon from '../assets/icon.png';

const Header = () => {
  return (
    <Navbar bg='light' variant='light'>
      <Container>
        <Navbar.Brand className='font-weight-bold' href='/'>
          BANKSTOP
        </Navbar.Brand>
        <Image src={icon} style={{ height: '40px' }} fluid />
      </Container>
    </Navbar>
  );
};

export default Header;
