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
  isSelect,
  isChecked,
  handleCheckedClick,
  handleDeleteClick,
  cart,
}) => {
  return (
    <Div p={{ x: { xs: "1rem", lg: "5rem" }, t: { xs: "3rem", lg: "2rem" } }}>
      {cart &&
        cart.map((cartItem) => (
          <Div key={cartItem[0].id}>
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
                value={cartItem[0].vendorId}
                onClick={handleCheckedClick}
                disabled={isChecked && isSelect != cartItem[0].vendorId}
              />
              <Text p="0.3rem">{cartItem[0].Vendor.vendorName}</Text>
            </Div>
            <CartItem
              cartItem={cartItem}
              handleDeleteClick={handleDeleteClick}
            />
          </Div>
        ))}
    </Div>
  );
};

export default CartList;
