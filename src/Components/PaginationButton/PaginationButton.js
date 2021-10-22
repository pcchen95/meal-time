import React from "react";
import { Div, Button } from "atomize";

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
    <Div pos="absolute" left="50%" bottom="0" transform="translate(-50%, -50%)">
      <Div d="flex">
        {page === 1 ? (
          ""
        ) : (
          <>
            <Button
              h="2rem"
              p="1rem"
              textSize="subheader"
              textColor="info700"
              hoverTextColor="info900"
              bg="white"
              hoverBg="info200"
              border="1px solid"
              borderColor="info700"
              hoverBorderColor="info900"
              m={{ r: "0.5rem" }}
              hoverShadow="4"
              onClick={() => handlePageClick("first")}
            >
              第一頁
            </Button>
            <Button
              h="2rem"
              p="1rem"
              textSize="caption"
              textColor="info700"
              hoverTextColor="info900"
              bg="white"
              hoverBg="info200"
              border="1px solid"
              borderColor="info700"
              hoverBorderColor="info900"
              m={{ r: "0.5rem" }}
              hoverShadow="4"
              onClick={() => handlePageClick("back")}
            >
              ＜
            </Button>
          </>
        )}

        <Div
          h="2rem"
          p={{ x: "1rem" }}
          textSize="title"
          textColor="info700"
          m={{ r: "0.5rem" }}
        >
          {page}
        </Div>

        {page === totalPages ? (
          ""
        ) : (
          <>
            <Button
              h="2rem"
              p="1rem"
              textSize="caption"
              textColor="info700"
              hoverTextColor="info900"
              bg="white"
              hoverBg="info200"
              border="1px solid"
              borderColor="info700"
              hoverBorderColor="info900"
              m={{ r: "0.5rem" }}
              hoverShadow="4"
              onClick={() => handlePageClick("next")}
            >
              ＞
            </Button>
            <Button
              h="2rem"
              p="1rem"
              textSize="subheader"
              textColor="info700"
              hoverTextColor="info900"
              bg="white"
              hoverBg="info200"
              border="1px solid"
              borderColor="info700"
              hoverBorderColor="info900"
              m={{ r: "0.5rem" }}
              hoverShadow="4"
              onClick={() => handlePageClick("last")}
            >
              最末頁
            </Button>
          </>
        )}
      </Div>
      <Div
        textAlign="center"
        textColor="info700"
        m={{ t: "1rem" }}
        textSize="subheader"
      >
        總共 {totalPages} 頁
      </Div>
    </Div>
  );
};

export default PaginationButton;
