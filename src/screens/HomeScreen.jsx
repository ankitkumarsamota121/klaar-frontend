import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listBanks } from '../actions/bankActions';
import { Form, Row, Col, InputGroup, Table } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
const cities = ['Select City', 'Bangalore', 'Mumbai', 'Kolkata', 'Jaipur', 'Delhi'];

const citiesMap = {
  'Select City': '',
  Bangalore: 'BANGALORE',
  Mumbai: 'MUMBAI',
  Kolkata: 'KOLKATA',
  Jaipur: 'JAIPUR',
  Delhi: 'DELHI',
};

const HomeScreen = () => {
  const [city, setCity] = useState('');

  const dispatch = useDispatch();
  const bankList = useSelector((state) => state.bankList);
  const { loading, error, banks } = bankList;

  useEffect(() => {
    dispatch(listBanks(citiesMap[city]));
  }, [dispatch, city]);

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
            <th>IFSC</th>
            <th>Bank Name</th>
            <th>Branch Name</th>
            <th>City</th>
            <th></th>
          </tr>
        </thead>
        {/* Table Body gets filled here */}
        <tbody>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              {banks.map((bank) => (
                <tr>
                  <td>{bank.ifsc}</td>
                  <td>{bank.bank_name}</td>
                  <td>{bank.branch}</td>
                  <td>{bank.city}</td>
                  <td>
                    <i class='far fa-star'></i>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default HomeScreen;
