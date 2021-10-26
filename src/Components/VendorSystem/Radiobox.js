import React from "react";
import PropTypes from "prop-types";
import { Radiobox, Label, Text } from "atomize";

export default function CustomRaios({ isOpen, handleEvent, isStoreDisabled }) {
  return (
    <>
      <Label
        align="center"
        textWeight="600"
        m={{ b: "0.5rem" }}
        cursor={isStoreDisabled ? "not-allowed" : "pointer"}
      >
        <Radiobox
          value={1}
          onChange={handleEvent}
          checked={isOpen}
          inactiveColor="info400"
          activeColor={!isStoreDisabled ? "info700" : "info400"}
          size="22px"
          disabled={isStoreDisabled}
        />
        <Text textColor={isStoreDisabled && "gray600"}>Open</Text>
      </Label>
      <Label
        align="center"
        textWeight="600"
        m={{ b: "0.5rem" }}
        cursor={isStoreDisabled ? "not-allowed" : "pointer"}
      >
        <Radiobox
          value={0}
          onChange={handleEvent}
          checked={!isOpen}
          inactiveColor="danger400"
          activeColor={!isStoreDisabled ? "danger700" : "danger400"}
          size="22px"
          disabled={isStoreDisabled}
        />
        <Text textColor={isStoreDisabled && "gray600"}>Closed</Text>
      </Label>
    </>
  );
}

CustomRaios.propTypes = {
  isOpen: PropTypes.number,
  handleEvent: PropTypes.func,
  isStoreDisabled: PropTypes.bool,
};
