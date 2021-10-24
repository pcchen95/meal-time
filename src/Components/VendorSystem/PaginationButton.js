import React from "react";
import PropTypes from "prop-types";
import { Div, Button } from "atomize";

const SingleButton = ({ name, handleOnClick }) => {
  return (
    <>
      <Button
        h={{ xs: "1.5rem", sm: "2rem" }}
        p={{ xs: "14px", sm: "1rem" }}
        textSize={{ xs: "tiny", sm: "captain" }}
        textColor="info700"
        hoverTextColor="info900"
        bg="white"
        hoverBg="info200"
        border="1px solid"
        borderColor="info700"
        hoverBorderColor="info900"
        m={{ r: "0.5rem" }}
        hoverShadow="4"
        onClick={handleOnClick}
      >
        {name}
      </Button>
    </>
  );
};

SingleButton.propTypes = {
  name: PropTypes.string,
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
                name="第一頁"
                handleOnClick={() => handlePageClick("first")}
              />
              <SingleButton
                name="<"
                handleOnClick={() => handlePageClick("back")}
              />
            </>
          )}
        </Div>

        <Div
          p={{ x: "1rem" }}
          textSize={{ xs: "tiny", sm: "captain" }}
          textColor="info700"
          m={{ x: "0.5rem" }}
        >
          第 {page} 頁
        </Div>
        <Div d="flex" w={{ xs: "130px", sm: "145px" }}>
          {page !== totalPages && (
            <>
              <SingleButton
                name=">"
                handleOnClick={() => handlePageClick("next")}
              />
              <SingleButton
                name="最末頁"
                handleOnClick={() => handlePageClick("last")}
              />
            </>
          )}
        </Div>
      </Div>
      <Div
        textAlign="center"
        textColor="info700"
        m={{ t: "0.5rem" }}
        textSize={{ xs: "tiny", sm: "captain" }}
      >
        共 {totalPages} 頁
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
