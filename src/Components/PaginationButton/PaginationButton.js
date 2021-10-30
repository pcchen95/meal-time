import React from "react";
import { Div, Button, Icon } from "atomize";
import PropTypes from "prop-types";
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
    <Div
      pos="absolute"
      left="50%"
      bottom="-2rem"
      transform="translate(-50%, -50%)"
    >
      {totalPages !== 0 && (
        <Div d="flex" align="center">
          {page === 1 ? (
            ""
          ) : (
            <>
              <Button
                h={{ xs: "1rem", lg: "2rem" }}
                w={{ xs: "1rem", lg: "2rem" }}
                p={{ xs: { x: "1.5rem" }, lg: { x: "2rem" } }}
                textSize="caption"
                textColor="info700"
                hoverTextColor="info900"
                bg="white"
                hoverBg="info200"
                m={{ x: "0.5rem" }}
                onClick={() => handlePageClick("first")}
              >
                <Icon name="Back" size="20px" color="info700" />
              </Button>
              <Button
                h={{ xs: "1rem", lg: "2rem" }}
                w={{ xs: "1rem", lg: "2rem" }}
                p={{ xs: { x: "1.5rem" }, lg: { x: "2rem" } }}
                textSize="caption"
                textColor="info700"
                hoverTextColor="info900"
                bg="white"
                hoverBg="info200"
                m={{ x: "0.5rem" }}
                onClick={() => handlePageClick("back")}
              >
                <Icon name="LeftArrow" size="20px" color="info700" />
              </Button>
            </>
          )}

          <Div
            p={{ x: "0.5rem" }}
            textSize={{ xs: "caption", lg: "title" }}
            textColor="info700"
            style={{ whiteSpace: "nowrap" }}
          >
            {page} / {totalPages} 頁
          </Div>

          {page === totalPages ? (
            ""
          ) : (
            <>
              <Button
                h={{ xs: "1rem", lg: "2rem" }}
                w={{ xs: "1rem", lg: "2rem" }}
                p={{ xs: { x: "1.5rem" }, lg: { x: "2rem" } }}
                textSize="caption"
                textColor="info700"
                hoverTextColor="info900"
                bg="white"
                hoverBg="info200"
                m={{ x: "0.5rem" }}
                onClick={() => handlePageClick("next")}
              >
                <Icon name="RightArrow" size="20px" color="info700" />
              </Button>
              <Button
                h={{ xs: "1rem", lg: "2rem" }}
                w={{ xs: "1rem", lg: "2rem" }}
                p={{ xs: { x: "1.5rem" }, lg: { x: "2rem" } }}
                textSize="caption"
                textColor="info700"
                hoverTextColor="info900"
                bg="white"
                hoverBg="info200"
                m={{ x: "0.5rem" }}
                onClick={() => handlePageClick("last")}
              >
                <Icon name="Next" size="20px" color="info700" />
              </Button>
            </>
          )}
        </Div>
      )}
    </Div>
  );
};

PaginationButton.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func,
  totalPages: PropTypes.number,
};

export default PaginationButton;
