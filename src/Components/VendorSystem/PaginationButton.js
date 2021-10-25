import React from "react";
import PropTypes from "prop-types";
import { Div, Button, Icon } from "atomize";

const SingleButton = ({ iconName, handleOnClick }) => {
  return (
    <>
      <Button
        h="2rem"
        textSize="tiny"
        textColor="info700"
        hoverTextColor="info900"
        bg="white"
        hoverBg="info200"
        m={{ r: "0.5rem" }}
        onClick={handleOnClick}
      >
        <Icon name={iconName} size="20px" color="info700" />
      </Button>
    </>
  );
};

SingleButton.propTypes = {
  iconName: PropTypes.string,
  handleOnClick: PropTypes.func,
};

const PaginationButton = ({ setPage, page, totalPages }) => {
  const handlePageClick = (type) => {
    if (type === "first") {
      setPage(1);
    }
    if (type === "back") {
      setPage(page - 1);
    }
    if (type === "next") {
      setPage(page + 1);
    }
    if (type === "last") {
      setPage(totalPages);
    }
  };

  return (
    <>
      <Div d="flex" w="100%" justify="center" align="center" m={{ t: "3rem" }}>
        <Div d="flex" w={{ xs: "130px", sm: "145px" }}>
          {page !== 1 && (
            <>
              <SingleButton
                iconName="Back"
                handleOnClick={() => handlePageClick("first")}
              />
              <SingleButton
                iconName="LeftArrow"
                handleOnClick={() => handlePageClick("back")}
              />
            </>
          )}
        </Div>

        <Div
          p={{ x: "1rem" }}
          textSize="captain"
          textColor="info700"
          m={{ r: "0.5rem" }}
        >
          {page} / {totalPages} 頁
        </Div>
        <Div d="flex" w={{ xs: "130px", sm: "145px" }}>
          {page !== totalPages && (
            <>
              <SingleButton
                iconName="RightArrow"
                handleOnClick={() => handlePageClick("next")}
              />
              <SingleButton
                iconName="Next"
                handleOnClick={() => handlePageClick("last")}
              />
            </>
          )}
        </Div>
      </Div>
    </>
  );
};

PaginationButton.propTypes = {
  setPage: PropTypes.func,
  page: PropTypes.number,
  totalPages: PropTypes.number,
};

export default PaginationButton;
