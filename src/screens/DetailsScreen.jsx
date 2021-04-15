import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Row, Image, Table } from 'react-bootstrap';
import bankImage from '../assets/bank.jpg';

const DetailsScreen = ({ history }) => {
  const bankDetails = useSelector((state) => state.bankDetails);

  useEffect(() => {
    console.log(bankDetails);
    if (!bankDetails.ifsc) {
      history.push('/');
    }
  }, [history, bankDetails]);

  return (
    <>
      <Row className='mb-5'>
        <Image src={bankImage} fluid />
      </Row>
      <Row>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td className='font-weight-bold'>IFSC Code</td>
              <td>{bankDetails.ifsc}</td>
            </tr>
            <tr>
              <td className='font-weight-bold'>Bank Name</td>
              <td>{bankDetails.bank_name}</td>
            </tr>
            <tr>
              <td className='font-weight-bold'>Branch Name</td>
              <td>{bankDetails.branch}</td>
            </tr>
            <tr>
              <td className='font-weight-bold'>Address</td>
              <td>{bankDetails.address}</td>
            </tr>
            <tr>
              <td className='font-weight-bold'>City</td>
              <td>{bankDetails.city}</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </>
  );
};

/* 
{
ifsc: "ALLA0210177",
bank_id: 11,
branch: "JAIPUR MI ROAD",
address: "JAIPURIA MANSION, MI ROAD JAIPUR",
city: "JAIPUR",
district: "JAIPUR",
state: "RAJASTHAN",
bank_name: "ALLAHABAD BANK"
},
*/

export default DetailsScreen;
