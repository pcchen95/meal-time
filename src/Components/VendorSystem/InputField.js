import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Input, Div } from "atomize";
import Dropdown from "./Dropdown";

const FieldTitle = styled.div`
  display: flex;
  align-items: center;
  width: 5.5rem;

  ${(props) =>
    props.required &&
    `
    &:after {
      content: "*";
      color: red;
      margin-left: 0.5rem;
    }
  `}
`;

const InputField = ({
  name,
  type,
  value,
  handleEvent,
  setCategoryId,
  remind,
  rule,
  required,
}) => {
  const isVendor = useSelector((store) => store.vendors.vendor || false);
  const isOpen = useSelector(
    (store) => store.vendors.vendor && store.vendors.vendor.isOpen
  );
  const isSuspended = useSelector(
    (store) => store.vendors.vendor && store.vendors.vendor.isSuspended
  );
  const isDisabled = isVendor && (!isOpen || isSuspended);
  return (
    <Div
      d="flex"
      flexDir="row"
      justify="flex-start"
      align="center"
      w="100%"
      m={{ t: "0.5rem" }}
    >
      <FieldTitle required={required}>{name}</FieldTitle>
      <Div w="calc(100% - 5.5rem)">
        {type !== "dropdown" && (
          <Input
            type={type}
            value={value}
            onChange={handleEvent}
            pattern={rule || null}
            placeholder={remind || `請輸入${name}`}
            w="100%"
            textColor={isDisabled && "gray600"}
            required={required}
            disabled={isDisabled}
          />
        )}
        {type === "dropdown" && (
          <Dropdown value={value} setCategoryId={setCategoryId} />
        )}
      </Div>
    </Div>
  );
};

InputField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleEvent: PropTypes.func,
  remind: PropTypes.string,
  setCategoryId: PropTypes.func,
  rule: PropTypes.string,
  required: PropTypes.bool,
};

export default InputField;
