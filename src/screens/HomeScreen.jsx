import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listBanks } from '../actions/bankActions';
import { Form, Row, Col, InputGroup, Table } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import PaginationComp from '../components/Pagination';
const cities = ['Select City', 'Bangalore', 'Mumbai', 'Kolkata', 'Jaipur', 'Delhi'];
const sizes = [10, 50, 100, 200, 500];

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
  const [numPages, setNumPages] = useState(1);
  const [currPage, setCurrPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [currBankList, setCurrBankList] = useState([]);

  const dispatch = useDispatch();
  const bankList = useSelector((state) => state.bankList);
  const { loading, error, banks } = bankList;

  useEffect(() => {
    dispatch(listBanks(citiesMap[city]));
    setCurrPage(1);
  }, [dispatch, city]);

  useEffect(() => {
    if (banks) {
      setNumPages(Math.ceil(banks.length / pageSize));
      const lastIndex = currPage * pageSize;
      const firstIndex = (currPage - 1) * pageSize;
      setCurrBankList(banks.slice(firstIndex, lastIndex));
    }
  }, [banks, currPage, pageSize]);

  useEffect(() => {
    setCurrPage(1);
  }, [numPages]);

  const paginate = (pageNumber) => setCurrPage(pageNumber);

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
              {currBankList.map((bank) => (
                <tr key={bank.ifsc}>
                  <td>{bank.ifsc}</td>
                  <td style={{ cursor: 'pointer' }}>
                    <a href='!#'>{bank.bank_name}</a>
                  </td>
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

      {numPages > 1 && (
        <Row>
          <Col sm={9}>
            <PaginationComp currPage={currPage} totalPages={numPages} paginate={paginate} />
          </Col>
          <Col sm={3}>
            <Row className='align-items-center'>
              <Col sm='auto'>Page Size: </Col>
              <Col>
                <Form.Control
                  className='pr-1'
                  as='select'
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value)}
                >
                  {sizes.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
