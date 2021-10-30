import React from "react";
import { Div, Button } from "atomize";
import PropTypes from "prop-types";

export function MemberFilterButton(props) {
  return (
    <Div d="flex">
      <Button
        h="2.5rem"
        p={{ x: "1.25rem" }}
        textSize="body"
        bg="white"
        hoverBg="warning300"
        rounded="sm"
        m={{ r: "1rem" }}
        fontFamily="code"
        textColor="black700"
        border="2px solid"
        borderColor="black900"
        textWeight="600"
        onClick={props.handleRegularFilter}
      >
        一般用戶
      </Button>
      <Button
        h="2.5rem"
        p={{ x: "1.25rem" }}
        textSize="body"
        bg="white"
        hoverBg="warning300"
        rounded="sm"
        m={{ r: "1rem" }}
        fontFamily="code"
        textColor="black700"
        border="2px solid"
        borderColor="black900"
        textWeight="600"
        onClick={props.handleSuspendedFilter}
      >
        停權用戶
      </Button>
    </Div>
  );
}

export function OrderFilterButton(props) {
  return (
    <Div d="flex">
      <Button
        h="2.5rem"
        p={{ x: "1.25rem" }}
        textSize="body"
        bg="white"
        hoverBg="warning300"
        rounded="sm"
        m={{ r: "1rem" }}
        fontFamily="code"
        textColor="black700"
        border="2px solid"
        borderColor="black900"
        textWeight="600"
        onClick={props.handleAllFilter}
      >
        全部訂單
      </Button>
      <Button
        h="2.5rem"
        p={{ x: "1.25rem" }}
        textSize="body"
        bg="white"
        hoverBg="warning300"
        rounded="sm"
        m={{ r: "1rem" }}
        fontFamily="code"
        textColor="black700"
        border="2px solid"
        borderColor="black900"
        textWeight="600"
        onClick={props.handleTradingFilter}
      >
        交易中
      </Button>
      <Button
        h="2.5rem"
        p={{ x: "1.25rem" }}
        textSize="body"
        bg="white"
        hoverBg="warning300"
        rounded="sm"
        m={{ r: "1rem" }}
        fontFamily="code"
        textColor="black700"
        border="2px solid"
        borderColor="black900"
        textWeight="600"
        onClick={props.handleCompletedFilter}
      >
        已完成
      </Button>
    </Div>
  );
}

MemberFilterButton.propTypes = {
  handleRegularFilter: PropTypes.func,
  handleSuspendedFilter: PropTypes.func,
};

OrderFilterButton.propTypes = {
  handleAllFilter: PropTypes.func,
  handleTradingFilter: PropTypes.func,
  handleCompletedFilter: PropTypes.func,
};
