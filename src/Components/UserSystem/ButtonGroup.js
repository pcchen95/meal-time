import React from "react";
import PropTypes from "prop-types";
import { Div, Button, Icon } from "atomize";
import { Link } from "react-router-dom";

export function ButtonGroup({ isDisabled, handleEvent, isLoading, nextPath }) {
  return (
    <>
      <Div d="flex" m={{ t: "1rem", b: "1rem" }}>
        <Button
          prefix={
            <Icon name="LongLeft" size="16px" color="white" m={{ r: "1rem" }} />
          }
          type="button"
          bg="gray700"
          shadow="1"
          hoverShadow="2"
          onClick={handleEvent}
        >
          返回
        </Button>
        <Button
          suffix={
            <Icon
              name={isLoading ? "Loading" : "LongRight"}
              size="16px"
              color="white"
              m={{ l: "1rem" }}
            />
          }
          bg="info700"
          shadow="1"
          hoverShadow="2"
          m={{ l: "1rem" }}
          disabled={isDisabled}
        >
          確認修改資料
        </Button>
      </Div>
      <Link to={nextPath} style={{ textDecoration: "none" }}>
        <Button
          suffix={
            <Icon
              name="LongRight"
              size="16px"
              color="white"
              m={{ l: "1rem" }}
            />
          }
          bg="warning700"
          shadow="1"
          hoverShadow="2"
          m={{ t: "3rem", b: "3rem" }}
        >
          修改密碼
        </Button>
      </Link>
    </>
  );
}

ButtonGroup.propTypes = {
  isDisabled: PropTypes.bool,
  handleEvent: PropTypes.func,
  isLoading: PropTypes.bool,
  nextPath: PropTypes.string,
};

export default ButtonGroup;
