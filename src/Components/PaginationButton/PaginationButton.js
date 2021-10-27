import React from 'react'
import { Div, Button, Icon } from 'atomize'
import PropTypes from 'prop-types'
const PaginationButton = ({ setPage, page, totalPages }) => {
  const handlePageClick = (type) => {
    if (type === 'first') {
      setPage(1)
    }
    if (type === 'back') {
      setPage(page - 1)
    }
    if (type === 'next') {
      setPage(page + 1)
    }
    if (type === 'last') {
      setPage(totalPages)
    }
  }

  return (
    <Div
      pos="absolute"
      left="50%"
      bottom="-2rem"
      transform="translate(-50%, -50%)"
    >
      {totalPages !== 0 && (
        <Div d="flex">
          {page === 1 ? (
            ''
          ) : (
            <>
              <Button
                h="2rem"
                textSize="subheader"
                textColor="info700"
                hoverTextColor="info900"
                bg="white"
                hoverBg="info200"
                m={{ r: '0.5rem' }}
                onClick={() => handlePageClick('first')}
              >
                <Icon name="Back" size="20px" color="info700" />
              </Button>
              <Button
                h="2rem"
                textSize="caption"
                textColor="info700"
                hoverTextColor="info900"
                bg="white"
                hoverBg="info200"
                m={{ r: '0.5rem' }}
                onClick={() => handlePageClick('back')}
              >
                <Icon name="LeftArrow" size="20px" color="info700" />
              </Button>
            </>
          )}

          <Div
            h="2rem"
            p={{ x: '1rem' }}
            textSize="title"
            textColor="info700"
            m={{ r: '0.5rem' }}
          >
            {page} / {totalPages} 頁
          </Div>

          {page === totalPages ? (
            ''
          ) : (
            <>
              <Button
                h="2rem"
                textSize="caption"
                textColor="info700"
                hoverTextColor="info900"
                bg="white"
                hoverBg="info200"
                m={{ r: '0.5rem' }}
                onClick={() => handlePageClick('next')}
              >
                <Icon name="RightArrow" size="20px" color="info700" />
              </Button>
              <Button
                h="2rem"
                textSize="subheader"
                textColor="info700"
                hoverTextColor="info900"
                bg="white"
                hoverBg="info200"
                m={{ r: '0.5rem' }}
                onClick={() => handlePageClick('last')}
              >
                <Icon name="Next" size="20px" color="info700" />
              </Button>
            </>
          )}
        </Div>
      )}
    </Div>
  )
}

PaginationButton.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func,
  totalPages: PropTypes.number,
}

export default PaginationButton
