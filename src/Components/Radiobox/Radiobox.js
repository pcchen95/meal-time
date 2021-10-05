import React, { useState } from "react";
import { Radiobox, Label } from "atomize";

export default function CustomRaios() {
  const [selectedCountValue, setSelectedCountValue] = useState(true);

  function selectedClosed() {
    setSelectedCountValue(true);
  }
  function selectedOpen() {
    setSelectedCountValue(false);
  }

  return (
    <>
      <Label align="center" textWeight="600" m={{ b: "0.5rem" }}>
        <Radiobox
          onChange={selectedClosed}
          checked={selectedCountValue}
          inactiveColor="info400"
          activeColor="info700"
          size="22px"
        />
        Open
      </Label>
      <Label align="center" textWeight="600" m={{ b: "0.5rem" }}>
        <Radiobox
          onChange={selectedOpen}
          checked={!selectedCountValue}
          inactiveColor="danger400"
          activeColor="danger700"
          size="22px"
        />
        Closed
      </Label>
    </>
  );
}
