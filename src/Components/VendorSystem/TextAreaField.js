import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Textarea } from "atomize";

const TextAreaField = ({ name, value, handleEvent }) => {
  const isVendor = useSelector((store) => store.vendors.vendor || false);
  const isOpen = useSelector(
    (store) => store.vendors.vendor && store.vendors.vendor.isOpen
  );
  const isSuspended = useSelector(
    (store) => store.vendors.vendor && store.vendors.vendor.isSuspended
  );
  const isDisabled = isVendor && (!isOpen || isSuspended);
  return (
    <Textarea
      h="12rem"
      p="1.5rem"
      w={{ xs: "100%", xl: "30rem" }}
      m={{ y: { xs: "1rem", xl: "0.5rem" }, r: { xs: "0", xl: "2rem" } }}
      placeholder={name}
      value={value}
      onChange={handleEvent}
      textSize="subheader"
      disabled={isDisabled}
      textColor={isDisabled && "gray600"}
    />
  );
};

TextAreaField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  handleEvent: PropTypes.func,
};

export default TextAreaField;
