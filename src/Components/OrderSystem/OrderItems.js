import React from "react";
import PropTypes from "prop-types";
import { Div, Text, Col } from "atomize";

const FilterButton = ({ orderItems }) => {
  return orderItems.map((orderItem) => (
    <div key={orderItem.id}>
      <Div
        border={{ b: "3px solid" }}
        borderColor="info200"
        fontFamily="code"
        textSize="paragraph"
        d={{ xs: "block", xl: "flex" }}
        p="1rem"
      >
        <Div d={{ xs: "block", xl: "flex" }}>
          <Col>
            <Div
              bgImg={orderItem.Product.pictureUrl}
              bgSize="cover"
              bgPos="center"
              h={{ xs: "14rem", md: "20rem", lg: "16rem" }}
              w={{ xs: "16rem", md: "26rem", lg: "16rem" }}
              m={{ t: "1rem", r: "3rem" }}
            />
          </Col>
          <Div minW="10rem" textSize="subheader">
            <Text m={{ t: "1rem" }}>{orderItem.Product.name}</Text>
            <Text m={{ t: "1rem" }}>單價：{orderItem.Product.price}</Text>
            <Text m={{ t: "1rem" }}>預訂數量：{orderItem.quantity}</Text>
          </Div>
          <Div minW="60rem">
            <Text m={{ t: "1rem" }}>{orderItem.Product.description}</Text>
          </Div>
        </Div>
      </Div>
    </div>
  ));
};

FilterButton.propTypes = {
  orderItems: PropTypes.object,
};

export default FilterButton;
