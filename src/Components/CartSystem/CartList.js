import React from "react";
import { Div, Text } from "atomize";
import styled from "styled-components";
import CartItem from "./CartItem";

const CheckItem = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin: 8px 11px;
  align-items: center;
  justify-content: center;
`;

const CartList = ({
  vendorId,
  isChecked,
  isSelect,
  handleCheckedClick,
  handleDeleteClick,
}) => {
  return (
    <Div p={{ x: { xs: "1rem", lg: "5rem" }, t: { xs: "3rem", lg: "2rem" } }}>
      {["賣家A", "賣家B", "賣家C"].map((name, index) => (
        <Div key={index}>
          <Div
            d="flex"
            p="1rem"
            bg="gray400"
            m={{ t: "2rem" }}
            textAlign="center"
            rounded="md"
          >
            <CheckItem
              type="checkbox"
              value={vendorId}
              onClick={handleCheckedClick}
              disabled={isChecked && isSelect !== vendorId}
            />
            <Text p="0.3rem">{name}</Text>
          </Div>
          <CartItem handleDeleteClick={handleDeleteClick} />
          <CartItem handleDeleteClick={handleDeleteClick} />
        </Div>
      ))}
    </Div>
  );
};

export default CartList;
