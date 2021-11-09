import React from "react";
import { Div, Button } from "atomize";

export function EditVendorButton() {
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
      >
        編輯分類
      </Button>
    </Div>
  );
}

export default EditVendorButton;
