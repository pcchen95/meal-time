import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Radiobox, Label, Text } from "atomize";

export default function CustomRaios({ isOpen, handleEvent }) {
  const isVendor = useSelector((store) => store.vendors.vendor || false);
  const isStoreOpen = useSelector(
    (store) => store.vendors.vendor && store.vendors.vendor.isOpen
  );
  const isSuspended = useSelector(
    (store) => store.vendors.vendor && store.vendors.vendor.isSuspended
  );
  const isDisabled = isVendor && (!isStoreOpen || isSuspended);
  return (
    <>
      <Label align="center" textWeight="600" m={{ b: "0.5rem" }}>
        <Radiobox
          value={1}
          onChange={handleEvent}
          checked={isOpen}
          inactiveColor="info400"
          activeColor={!isDisabled ? "info700" : "info400"}
          size="22px"
          disabled={isDisabled}
        />
        <Text textColor={isDisabled && "gray600"}>Open</Text>
      </Label>
      <Label align="center" textWeight="600" m={{ b: "0.5rem" }}>
        <Radiobox
          value={0}
          onChange={handleEvent}
          checked={!isOpen}
          inactiveColor="danger400"
          activeColor={!isDisabled ? "danger700" : "danger400"}
          size="22px"
          disabled={isDisabled}
        />
        <Text textColor={isDisabled && "gray600"}>Closed</Text>
      </Label>
    </>
  );
}

CustomRaios.propTypes = {
  isOpen: PropTypes.number,
  handleEvent: PropTypes.func,
};
