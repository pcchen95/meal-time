import React from "react";
import PropTypes from "prop-types";
import { Div, Input } from "atomize";
import { useLocation } from "react-router-dom";

const InputField = ({
  name,
  type,
  value,
  handleEvent,
  placeholder,
  remind,
  rule,
  required,
}) => {
  const location = useLocation();
  let titleLength = 5;
  if (location.pathname === "/member_password") {
    titleLength = 9;
  }
  if (location.pathname === "/signup") {
    titleLength = 7;
  }
  const marginLength =
    location.pathname === "/member_password" ? 0 : titleLength + 1;

  return (
    <Div d="flex" flexDir="column" m={{ y: "1rem" }}>
      <Div
        d="flex"
        flexDir={{ xs: "column", md: "row" }}
        align={{ xs: "flex-start", md: "center" }}
        w="100%"
        m={{ b: "0.5rem" }}
      >
        <Div
          textSize="subheader"
          w={`${titleLength}rem`}
          textAlign={{ xs: "left", md: "justify" }}
          style={{ textAlignLast: "justify" }}
        >
          {name}
        </Div>
        <Div
          w={{ xs: "100%", md: `calc(100% - ${titleLength}rem)` }}
          m={{ l: { xs: "0", md: "1rem" } }}
        >
          <Input
            type={type}
            value={value}
            pattern={rule || null}
            onChange={handleEvent}
            placeholder={placeholder}
            m={{ t: "0.5rem" }}
            w={{ xs: "100%", md: "100%" }}
            required={required}
          />
        </Div>
      </Div>
      <Div
        textSize="14px"
        textColor="gray800"
        m={{ l: { xs: "0", md: `${marginLength}rem` } }}
      >
        {remind}
      </Div>
    </Div>
  );
};

InputField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  handleEvent: PropTypes.func,
  placeholder: PropTypes.string,
  remind: PropTypes.string,
  rule: PropTypes.string,
  required: PropTypes.bool,
};

export default InputField;
