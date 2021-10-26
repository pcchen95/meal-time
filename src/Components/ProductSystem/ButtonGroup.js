import React from "react";
import PropTypes from "prop-types";
import { Div, Button, Icon } from "atomize";

export function ButtonGroup({
  isDisabled,
  handleEvent,
  isLoading,
  submitString,
}) {
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
          {submitString}
        </Button>
      </Div>
    </>
  );
}

ButtonGroup.propTypes = {
  isDisabled: PropTypes.bool,
  handleEvent: PropTypes.func,
  isLoading: PropTypes.bool,
  submitString: PropTypes.string,
};

export default ButtonGroup;
