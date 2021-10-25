import React from "react";
import PropTypes from "prop-types";
import { Textarea } from "atomize";

const TextAreaField = ({ name, value, handleEvent, isDisabled }) => {
  return (
    <Textarea
      h="12rem"
      p="1.5rem"
      w={{ xs: "100%", xl: "25rem" }}
      m={{ y: { xs: "1rem", xl: "0.5rem" }, r: { xs: "0", xl: "2rem" } }}
      placeholder={name}
      value={value}
      onChange={handleEvent}
      textSize="subheader"
      disabled={isDisabled}
      textColor={isDisabled && "gray600"}
      cursor={isDisabled && "not-allowed"}
    />
  );
};

TextAreaField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  handleEvent: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default TextAreaField;
