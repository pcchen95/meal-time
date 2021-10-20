import React from "react";
import { Div, Col, Icon, Text } from "atomize";
import styled from "styled-components";

const DeleteItem = styled.div`
  position: absolute;
  right: 0rem;
  top: 5.3rem;
  cursor: pointer;
`;

const CartItem = ({ handleDeleteClick }) => {
  return (
    <Div d={{ xs: "block", lg: "flex" }} pos="relative">
      <Div d="flex">
        <Div m={{ l: "2rem" }}>
          <Col>
            <Div
              bgImg="https://cdn2.ettoday.net/images/3161/d3161278.jpg"
              bgSize="cover"
              bgPos="center"
              w={{ xs: "10rem", lg: "12rem" }}
              h={{ xs: "10rem", lg: "12rem" }}
              rounded="lg"
              m={{ t: "1rem" }}
            />
          </Col>
        </Div>
      </Div>
      <Div
        d={{ xs: "static", lg: "flex" }}
        justify="space-between"
        m={{ x: "4rem", y: "2rem" }}
      >
        <Div>
          <Text>商品名稱</Text>
          <Text m={{ t: "1rem" }}>數量</Text>
          <Text>$ 0</Text>
        </Div>
      </Div>
      <DeleteItem onClick={handleDeleteClick} title="刪除">
        <Icon name="Close" size="26px" hoverColor="danger700" />
      </DeleteItem>
    </Div>
  );
};

export default CartItem;
