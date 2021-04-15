import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listBanks } from '../actions/bankActions';
import { addFavourite, removeFavourite } from '../actions/userActions';

import { Form, Row, Col, InputGroup, Table, Button } from 'react-bootstrap';
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
  const [filter, setFilter] = useState();
  const [fav, setFav] = useState(false);

  const dispatch = useDispatch();
  const bankList = useSelector((state) => state.bankList);
  const { loading, error, banks } = bankList;

  const favourites = useSelector((state) => state.favourites);

  useEffect(() => {
    dispatch(listBanks(citiesMap[city]));
    setCurrPage(1);
  }, [dispatch, city]);

  useEffect(() => {
    if (banks) {
      setNumPages(Math.ceil(banks.length / pageSize));
    }
  }, [banks, currPage, pageSize]);

  useEffect(() => {
    setCurrPage(1);
  }, [numPages]);

  useEffect(() => {
    if (banks) {
      let listOfBanks = banks;
      if (fav) {
        listOfBanks = banks.filter((bank) => favourites.includes(bank.ifsc));
      }

      // Use Filter
      if (filter) {
        listOfBanks = listOfBanks.filter((bank) => {
          if (bank.ifsc.toUpperCase().includes(filter.toUpperCase())) return true;
          if (bank.bank_name.toUpperCase().includes(filter.toUpperCase())) return true;
          if (bank.branch.toUpperCase().includes(filter.toUpperCase())) return true;
          if (bank.city.toUpperCase().includes(filter.toUpperCase())) return true;
          return false;
        });
      }

      setNumPages(Math.ceil(listOfBanks.length / pageSize));
      const lastIndex = currPage * pageSize;
      const firstIndex = (currPage - 1) * pageSize;
      setCurrBankList(listOfBanks.slice(firstIndex, lastIndex));
    }
  }, [banks, currPage, pageSize, fav, favourites, filter]);

  const paginate = (pageNumber) => setCurrPage(pageNumber);

  const favMethod = (ifsc) => {
    if (favourites.includes(ifsc)) {
      dispatch(removeFavourite(ifsc));
    } else {
      dispatch(addFavourite(ifsc));
    }
  };

  return (
    <>
      <Row className='align-items-center mb-3'>
        <Col md={4}>
          <Form.Control as='select' value={city} onChange={(e) => setCity(e.target.value)}>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Form.Control>
        </Col>
        <Col md={6}>
          <InputGroup>
            <Form.Control
              placeholder='Search...'
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={2}>
          <Button
            variant={fav ? 'dark' : 'outline-dark'}
            onClick={() => setFav(!fav)}
            className='favourites-btn'
          >
            Favourites{'   '}
            {fav ? <i className='fas fa-star'></i> : <i className='far fa-star'></i>}
          </Button>
        </Col>
      </Row>

      {/* TABLE */}
      <Row style={{ minHeight: '80vh' }}>
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
              <tr>
                <td className='align-items-center' colSpan='5'>
                  <Loader />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td className='align-items-center' colSpan='5'>
                  <Message variant='danger'>{error}</Message>
                </td>
              </tr>
            ) : (
              <>
                {currBankList.map((bank) => {
                  if ((fav && favourites.includes(bank.ifsc)) || !fav) {
                    return (
                      <tr key={bank.ifsc}>
                        <td>{bank.ifsc}</td>
                        <td style={{ cursor: 'pointer' }}>
                          <a href='!#'>{bank.bank_name}</a>
                        </td>
                        <td>{bank.branch}</td>
                        <td>{bank.city}</td>
                        <td style={{ cursor: 'pointer' }} onClick={() => favMethod(bank.ifsc)}>
                          {favourites.indexOf(bank.ifsc) > -1 ? (
                            <i className='fas fa-star'></i>
                          ) : (
                            <i className='far fa-star'></i>
                          )}
                        </td>
                      </tr>
                    );
                  }
                  return <></>;
                })}
              </>
            )}
          </tbody>
        </Table>
      </Row>

      {/* PAGINATION */}
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
    </>
  );
};

export default HomeScreen;
