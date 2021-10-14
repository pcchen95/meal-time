import React from "react";
import { Div, Button, Icon } from "atomize";

const PaginationButton = ({ page, handlePageClick, data, limit }) => {
  return (
    <Div m={{ t: "1rem" }} pos="absolute" right="5rem" bottom="1rem" d="flex">
      {page == 1 ? (
        ""
      ) : (
        <Button
          h="2rem"
          p={{ x: "1rem" }}
          textSize="caption"
          textColor="info700"
          hoverTextColor="info900"
          bg="white"
          hoverBg="info200"
          border="1px solid"
          borderColor="info700"
          hoverBorderColor="info900"
          m={{ r: "0.5rem" }}
          onClick={() => handlePageClick("back")}
        >
          <Icon name="LongLeft" size="20px" color="info700" />
        </Button>
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

      {data.length === limit ? (
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
          <Icon name="LongRight" size="20px" color="info700" />
        </Button>
      ) : (
        ""
      )}
    </Div>
  );
};

export default PaginationButton;
