import React, { useState, useEffect } from 'react';
import { Form, Row, Col, InputGroup, Table } from 'react-bootstrap';

const cities = ['Bangalore', 'Mumbai', 'Kolkata', 'Jaipur', 'Delhi'];

const HomeScreen = () => {
  const [city, setCity] = useState('');
  return (
    <>
      <Row>
        <Col md={4}>
          <Form.Control
            className='pr-1'
            as='select'
            placeholder='Select City'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Form.Control>
        </Col>
        <Col md={8}>
          <InputGroup className='mb-3'>
            <Form.Control aria-label='Search' placeholder='Search...' />
          </InputGroup>
        </Col>
      </Row>
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Bank Name</th>
            <th>Last Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <i class='far fa-star'></i>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>
              <i class='far fa-star'></i>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default HomeScreen;
