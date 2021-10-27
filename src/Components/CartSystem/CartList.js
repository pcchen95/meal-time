import React from "react";
import PropTypes from "prop-types";
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
  userId,
  vendorId,
  isChecked,
  handleCheckedClick,
  handleDeleteClick,
  cart,
  cartData,
}) => {
  return (
    <Div p={{ x: { xs: "1rem", lg: "5rem" }, t: { xs: "3rem", lg: "2rem" } }}>
      {cart &&
        Object.values(cart).map((cartItem) => (
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
                disabled={
                  isChecked && vendorId !== cartItem[0].vendorId.toString()
                }
              />
              <Text p="0.3rem">{cartItem[0].Vendor.vendorName}</Text>
            </Div>
            <CartItem
              cartItem={cartItem}
              handleDeleteClick={handleDeleteClick}
              userId={userId}
              cartData={cartData}
            />
          </Div>
        ))}
    </Div>
  );
};

CartList.propTypes = {
  userId: PropTypes.number,
  vendorId: PropTypes.string,
  isChecked: PropTypes.bool,
  handleCheckedClick: PropTypes.func,
  handleDeleteClick: PropTypes.func,
  cart: PropTypes.object,
  cartData: PropTypes.string,
};

export default CartList;
