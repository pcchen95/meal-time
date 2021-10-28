import React from "react";
import { Div, Button } from "atomize";
import PropTypes from "prop-types";

export default function ChangeMemberAuthButton({ id, handleChangeAuth }) {
  return (
    <Div d="flex">
      <Button
        h="2.5rem"
        p={{ x: "1.25rem" }}
        textSize="body"
        bg="white"
        hoverBg="warning300"
        rounded="xl"
        m={{ r: "1rem" }}
        fontFamily="code"
        textColor="black700"
        border="1px solid"
        borderColor="black900"
        textWeight="300"
        onClick={handleChangeAuth(id)}
      >
        使停權
      </Button>
      <Button
        h="2.5rem"
        p={{ x: "1.25rem" }}
        textSize="body"
        bg="white"
        hoverBg="warning300"
        rounded="xl"
        m={{ r: "1rem" }}
        fontFamily="code"
        textColor="black700"
        border="1px solid"
        borderColor="black900"
        textWeight="300"
      >
        使正常
      </Button>
    </Div>
  );
}

ChangeMemberAuthButton.propTypes = {
  handleChangeAuth: PropTypes.func,
  id: PropTypes.number,
};
