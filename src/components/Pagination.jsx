import React from 'react';

import { Pagination } from 'react-bootstrap';

const PaginationComp = ({ currPage, totalPages, paginate }) => {
  let start = Math.max(1, currPage - 2);
  let end = Math.min(totalPages, currPage + 2);

  if (currPage <= 2) {
    start = 1;
    end = start + 4;
  } else if (currPage >= totalPages - 2) {
    end = totalPages;
    start = totalPages - 4;
  }

  let pageNumbers = [];
  for (let i = start; i <= end; i++) pageNumbers.push(i);

  return (
    <>
      {totalPages > 5 ? (
        <Pagination>
          <Pagination.First onClick={() => paginate(1)} />
          <Pagination.Ellipsis />

          {pageNumbers.map((number) => (
            <Pagination.Item
              onClick={() => paginate(number)}
              active={number === currPage}
              key={number}
            >
              {number}
            </Pagination.Item>
          ))}

          <Pagination.Ellipsis />
          <Pagination.Last onClick={() => paginate(totalPages)} />
        </Pagination>
      ) :  (
        <Pagination>
          {[...Array(totalPages).keys()].map((number) => (
            <Pagination.Item
              onClick={() => paginate(number + 1)}
              active={number + 1 === currPage}
              key={number}
            >
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      ) }
    </>
  );
};

export default PaginationComp;
