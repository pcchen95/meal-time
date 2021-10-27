import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Icon } from "atomize";

const Button = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  height: 2.5rem;
  width: 2.5rem;
  background: white;
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0.4;
  transition: all 0.3s;

  &:hover {
    opacity: 0.9;
    background: #c7c7c7;
  }
`;

export default function DeleteButton({ handleEvent }) {
  return (
    <Button onClick={handleEvent}>
      <Icon name="Delete" size="20px" color="black700" />
    </Button>
  );
}

DeleteButton.propTypes = {
  handleEvent: PropTypes.func,
};
